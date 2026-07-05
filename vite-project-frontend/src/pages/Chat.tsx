import { Box, Typography, Button, IconButton } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import ChatItem from "../components/Chats/ChatItem"
import { IoMdSend } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md"
import { useRef, useState } from "react"
import { delChatReq, sendChatReq } from "../helpers/ApiCom"
import toast from "react-hot-toast"

const Chat = () => {

  type message = {
    role: "user" | "assistant",
    content: string
  }

  const auth = useAuth()
  const [chatHistory, setChatHistory] = useState<message[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string
    if (inputRef && inputRef.current) {
      inputRef.current.value = ""
    }
    if (!content.trim()) return;

    const newMessage: message = { role: 'user', content: content }
    setChatHistory((prev) => [...prev, newMessage])
    
    const chatData = await sendChatReq(content)
    setChatHistory([...chatData.chats])
  }

  const handleClear = async () => {
    try {
      toast.loading("Clearing conversation...", { id: "deleteChats" })
      await delChatReq()
      setChatHistory([])
      toast.success("Conversation cleared", { id: "deleteChats" })
    }
    catch (error) {
      toast.error("Failed to clear conversation", { id: "deleteChats" })
    }
  }

  return (
    <Box sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "calc(100vh - 80px)",
      justifyContent: "center",
      alignItems: "center",
      pt: 2
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: { md: "60%", xs: "100%", sm: "90%" },
        height: "95%",
        px: 3,
        position: "relative"
      }}>
        
        {/* Header Area */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography sx={{ 
            fontSize: "24px", 
            fontWeight: 600,
            color: "white"
          }}>
            Nexus AI
          </Typography>
          <Button 
            onClick={handleClear}
            startIcon={<MdDeleteOutline />}
            sx={{
              color: '#a1a1aa',
              textTransform: 'none',
              ':hover': { color: '#ff4d4d', bgcolor: 'rgba(255,0,0,0.05)' }
            }}
          >
            Clear Chat
          </Button>
        </Box>

        {/* Chat History Container */}
        <Box sx={{
          width: "100%",
          flex: 1,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          px: 2,
          pb: 2
        }}>
          {chatHistory.length === 0 && (
            <Box sx={{ m: 'auto', textAlign: 'center', opacity: 0.5 }}>
              <Typography variant="h5" sx={{ color: "#a1a1aa" }}>How can I help you today, {auth?.user?.name.split(" ")[0]}?</Typography>
            </Box>
          )}
          {chatHistory.map((chat, index) => {
            return <ChatItem content={chat.content} role={chat.role} key={index} />
          })}
        </Box>

        {/* Input Area */}
        <Box sx={{
          display: "flex",
          width: "100%",
          mt: 2,
          mb: 2,
          p: "4px 12px",
          background: "#111",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          alignItems: "center",
        }}>
          <input 
            type='text'
            ref={inputRef}
            placeholder="Send a message..."
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              padding: "14px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "15px",
              fontFamily: "Outfit"
            }}
          />
          <IconButton onClick={handleSubmit} sx={{
            color: 'black',
            background: "white",
            p: 1,
            borderRadius: "6px",
            ':hover': { background: "#e5e5e5" }
          }}>
            <IoMdSend size={18} />
          </IconButton>
        </Box>

      </Box>
    </Box>
  )
}

export default Chat