import { useAuth } from "../context/AuthContext"
import { Box, Typography, Button } from "@mui/material"
import TypewriterComponent from "typewriter-effect"
import { Link } from "react-router-dom"

const Home = () => {
  const auth = useAuth()
  const fName = auth?.user?.name.split(" ")[0]
  
  let homestring = 'Experience the future of AI conversation.'
  if(fName){
    homestring = `Welcome back, ${fName}. Let's create something amazing.`
  }

  return (
    <Box sx={{ display: 'flex', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background: "#111",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "12px",
        maxWidth: "800px",
        textAlign: "center"
      }}>
        <Typography sx={{
          fontWeight: '800',
          fontSize: { xs: '40px', md: '70px' },
          color: "white",
          letterSpacing: "-1px",
          mb: 2
        }}>
          NEXUS AI
        </Typography>

        <Typography sx={{ fontWeight: '400', fontSize: { xs: '20px', md: '28px' }, color: "#a1a1aa", mb: 5, minHeight: "80px" }}>
          <TypewriterComponent
            options={{
              strings: [homestring, "Fast. Intelligent. Minimal."],
              autoStart: true,
              loop: true,
              delay: 50
            }}
          />
        </Typography>

        {!auth?.isLoggedIn ? (
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button sx={{
                background: "white",
                color: "black",
                px: 4, py: 1.5,
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "16px",
                textTransform: "none",
                ':hover': { background: "#e5e5e5" }
              }}>
                Get Started
              </Button>
            </Link>
          </Box>
        ) : (
          <Link to="/chat" style={{ textDecoration: 'none' }}>
            <Button sx={{
              background: "white",
              color: "black",
              px: 4, py: 1.5,
              borderRadius: "6px",
              fontWeight: 500,
              fontSize: "16px",
              textTransform: "none",
              ':hover': { background: "#e5e5e5" }
            }}>
              Launch Chat
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  )
}

export default Home