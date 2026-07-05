import { NextFunction, Request, Response } from "express"
import "express-async-errors"
import {config} from "dotenv"
import User from "../models/user.js"
import { GoogleGenAI } from "@google/genai"
config()

export const generateResponse = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const { message } = req.body
        const user = await User.findById(res.locals.jwtData.id)

        if(!user){
            return res.status(400).json({msg:'user not found!'})
        }

        // Limit the context window to the last 10 messages
        const recentChats = user.chats.slice(-10);

        // Map chats from our DB schema (user/assistant) to Gemini schema (user/model)
        // Gemini strictly requires alternating roles and the first role must be 'user'
        const mappedChats: {role: string, parts: {text: string}[]}[] = [];
        for (const chat of recentChats) {
            const mappedRole = chat.role === 'assistant' ? 'model' : 'user';
            if (mappedChats.length > 0 && mappedChats[mappedChats.length - 1].role === mappedRole) {
                mappedChats[mappedChats.length - 1].parts[0].text += "\n" + chat.content;
            } else {
                mappedChats.push({
                    role: mappedRole,
                    parts: [{ text: chat.content }]
                });
            }
        }

        // Ensure the first message is from the user
        if (mappedChats.length > 0 && mappedChats[0].role === 'model') {
            mappedChats.shift();
        }

        // Add the current message (squashing if the last message was also from the user)
        if (mappedChats.length > 0 && mappedChats[mappedChats.length - 1].role === 'user') {
            mappedChats[mappedChats.length - 1].parts[0].text += "\n" + message;
        } else {
            mappedChats.push({ role: "user", parts: [{ text: message }] });
        }
        
        // Push the user's message to the database
        user.chats.push({role:"user", content: message})

        // Initialize Gemini client
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        // Call the Gemini API
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: mappedChats,
        });

        // Push the assistant's message to the database
        user.chats.push({ role: "assistant", content: response.text });
        await user.save();
        
        return res.status(200).json({chats: user.chats});
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({msg: "Something went wrong with the AI service. Please try again later."});
    }
}

export const deleteChats = async( req:Request, res:Response, next:NextFunction) => {
    const user = await User.findById(res.locals.jwtData.id)
    if(!user){
        return res.status(400).json({msg:'could not delete chats... try again later'})
    }

    if(user._id.toString()  !== res.locals.jwtData.id){
        return res.status(401).send("permissions dont match...")
    }
    //@ts-ignore
    user.chats = []
    await user.save()
    return res.status(200).json({msg:'OK'})
}