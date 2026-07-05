import { Box, Avatar, Typography } from "@mui/material"
import { useAuth } from "../../context/AuthContext"
import ReactMarkdown from "react-markdown"

export const ChatItem = ({content, role}:{content:string, role: "user" | "assistant"}) => {
    const auth = useAuth()
    const isAssistant = role === "assistant";

    return (
        <Box sx={{
            display: "flex",
            justifyContent: isAssistant ? "flex-start" : "flex-end",
            my: 2,
            gap: 2,
            width: "100%"
        }} className="chat-message-animated">
            
            {/* Assistant Avatar on the left */}
            {isAssistant && (
                <Avatar sx={{ bgcolor: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}>
                    🤖
                </Avatar>
            )}

            {/* Chat Bubble */}
            <Box sx={{
                maxWidth: "75%",
                p: 2,
                borderRadius: isAssistant ? "12px 12px 12px 2px" : "12px 12px 2px 12px",
                background: isAssistant 
                    ? "#111"
                    : "#ededed",
                border: "1px solid rgba(255, 255, 255, 0.08)"
            }}>
                {isAssistant ? (
                    <Box className="markdown-body" sx={{ color: "white", fontSize: "15px" }}>
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </Box>
                ) : (
                    <Typography sx={{ color: "black", fontSize: "15px", lineHeight: 1.5, fontWeight: 500 }}>
                        {content}
                    </Typography>
                )}
            </Box>

            {/* User Avatar on the right */}
            {!isAssistant && (
                <Avatar sx={{ bgcolor: "white", color: "black", fontWeight: 600 }}>
                    {auth?.user?.name[0]?.toUpperCase()}
                </Avatar>
            )}
            
        </Box>
    )
}

export default ChatItem