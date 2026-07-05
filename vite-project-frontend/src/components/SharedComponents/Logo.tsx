import { Link } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import BlurOnIcon from '@mui/icons-material/BlurOn';

const Logo = () => {
  return (
    <div style={{
        display:"flex",
        marginRight:"auto",
        alignItems:"center",
        gap:"10px"
    }}>
        <Link to={"/"} style={{ textDecoration: 'none' }}>
            <Box sx={{display:'flex', alignItems:'center'}}>
            <BlurOnIcon sx={{ fontSize: 32, color: "#00C9FF" }} />
            <Typography sx={{
             ml: 1,
             display:{md:"block", sm:"none", xs:"none"},
             fontWeight:"800",
             fontSize:"24px",
             letterSpacing: "1px",
             background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)",
             WebkitBackgroundClip: "text",
             WebkitTextFillColor: "transparent",
             textShadow: "0px 0px 20px rgba(0, 201, 255, 0.4)"
            }}>
                NEXUS
            </Typography>
            </Box>
        </Link>
    </div>
  )
}

export default Logo