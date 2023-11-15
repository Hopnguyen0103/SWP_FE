import { CardMedia, Dialog } from "@mui/material"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

//loading 
const Loading = () => {
    const router = useRouter()
  
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      const handleStart = (url: string) =>
        url !== router.asPath && setLoading(true)
      const handleComplete = () => setLoading(false)
  
      router.events.on('routeChangeError', handleComplete)
       router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
  
      return () => {
        router.events.off('routeChangeError', handleComplete)
        router.events.off('routeChangeStart', handleStart)
        router.events.off('routeChangeComplete', handleComplete)
      }
    })
  
    return loading ? (
        <Dialog open={true} sx={{
          "& .MuiPaper-root" : {
            boxShadow: "none",
            backgroundColor: "rgba(0,0,0,0)",
          }
        }}>
            <CardMedia
              component="img"            
              src="/assets/images/loader.gif"
              alt="Fado168"
              sx={{ m: 'auto', background: 'none',}}
            />
        </Dialog>
    ) : null
  }
  
  export default Loading