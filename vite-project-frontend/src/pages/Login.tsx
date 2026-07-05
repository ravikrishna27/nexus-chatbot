
import { Box, Typography, Button } from '@mui/material'
import CustomizedInput from '../components/SharedComponents/CustomizedInput'
import { RiLoginBoxLine } from "react-icons/ri";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string//find based on the name
    const password = formData.get("password") as string
    try{
        toast.loading("Signing in...",{id: "login"})
        await auth?.login(email, password)
        navigate("/")
        toast.success("Successfully Signed in...",{id: "login"})
    }
    catch(error){
      console.log(error)
        toast.error("Failed to SignIn!", {id:"login"})
    }
  }
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box display={"flex"} 
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      padding={2}>
        <form 
        onSubmit={handleSubmit}
        style={{
          margin:'auto',
          padding:'40px',
          background: "#111",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius:"12px",
          width: "100%",
          maxWidth: "400px"
        }}>
          <Box sx={{display:"flex",
           flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"}}>
              <Typography variant="h4" 
              textAlign="center"
               padding={2} 
               fontWeight={600}
               sx={{ mb: 2, color: "white" }}>
                Welcome Back
               </Typography>
               <CustomizedInput type="email" name="email" label="Email"/>
               <CustomizedInput type="password" name="password" label="Password"/>
               <Button type="submit" sx={{
                 px:2,
                 py:1.5, 
                 mt:4, 
                 width:"100%", 
                 borderRadius:"6px",
                 background: "white",
                 color: "black",
                 fontWeight: 500,
                 fontSize: "16px",
                 textTransform: "none",
                 ":hover":{
                    background: "#e5e5e5",
                 }}}
                 endIcon={<RiLoginBoxLine color='black'/>}>
                  Sign In
               </Button>
            </Box>
        </form>

      </Box>
    </Box>
  )
}

export default Login