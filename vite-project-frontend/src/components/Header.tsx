import { AppBar, Toolbar, Button } from '@mui/material'
import Logo from './SharedComponents/Logo'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div style={{ display: 'flex', gap: '10px' }}>
          {auth?.isLoggedIn ? (
            <>
              <Button 
                onClick={() => navigate('/chat')}
                sx={{ 
                  color: "white", 
                  textTransform: "none", 
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  ':hover': { background: "rgba(255,255,255,0.05)" }
                }}
              >
                Chat
              </Button>
              <Button 
                onClick={async () => {
                  if (auth.logout) await auth.logout();
                  navigate('/');
                }}
                sx={{ 
                  color: "#ff4d4d", 
                  textTransform: "none", 
                  fontWeight: 500,
                  border: "1px solid rgba(255,0,0,0.2)",
                  borderRadius: "6px",
                  ':hover': { background: "rgba(255,0,0,0.1)" }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={() => navigate('/login')}
                sx={{ 
                  color: "white", 
                  textTransform: "none", 
                  fontWeight: 500,
                  ':hover': { background: "rgba(255,255,255,0.05)" }
                }}
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                sx={{ 
                  color: "black", 
                  bgcolor: "white",
                  textTransform: "none", 
                  fontWeight: 500,
                  borderRadius: "6px",
                  ':hover': { background: "rgba(255,255,255,0.8)" }
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header