import React from 'react'

const Landing = () => {
  return (
    <div>
        <div>
            <div style={{
                width:"100vw",
                height:"25vh",
                position: "relative"
                }}>
                <div style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:"rgba(0,0,0,0.5)",
                    position: "absolute",
                    top:"0",
                    left:"0"
                }}></div>
                <div style={{
                    backgroundImage:'url(/landing.jpg)',
                    backgroundSize:"cover",
                    backgroundRepeat:"no-repeat",
                    width:"100%",
                    height:"100%"
                    }}>
                </div>
                <div style={{
                    textAlign: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "2em",
                    fontFamily: "Roboto",
                    textShadow: "1px 1px 4px #000"
                }}><h2>Inicio</h2>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Landing
