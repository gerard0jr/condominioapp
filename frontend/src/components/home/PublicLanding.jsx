import React, { Component } from 'react'
import { Button, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default class PublicLanding extends Component {

  render() {
    return (
      <div>
        <div style={{
            width:"100vw",
            height:"calc(100vh - 64px)",
            position: "relative",
            marginBottom:"1em"
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
                backgroundImage:'url(/hero.jpg)',
                backgroundSize:"cover",
                backgroundRepeat:"no-repeat",
                backgroundPosition: "center",
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
            }}>
            <img style={{width: "50vw"}} src="/logo.png" alt="logo"/>
            <small style={{letterSpacing:"3px"}}>Administra tu condominio</small>
            </div>
        </div>
        <div id="tables" className="tables">
            <div className="col1">
                <CardContent>
                    <img src="/badge3.png" alt="badge1"/>
                    <h4>Visualiza los reportes de ingresos/gastos de tu condominio</h4>
                </CardContent>
            </div>
            <div className="col1">
                <CardContent>
                    <img src="/badge1.png" alt="badge1"/>
                    <h4>¿Se rompió una tubería? Repórtala directamente en la app</h4>
                </CardContent>
            </div>
            <div className="col1">
                <CardContent>
                    <img src="/badge2.png" alt="badge1"/>
                    <h4>Comparte tu profesión/oficio a los demás residentes</h4>
                </CardContent>
            </div>
        </div>
        <div className="demos">
            <div className="demo-image">
                <img style={{width:"500px"}} src="/mockup.png" alt=""/>
            </div>
            <div className="demo-text">
                <h2>Visualiza los ingresos/egresos de tu condominio</h2>
                <p>Los residentes siempre tendrán acceso a toda la información financiera del condominio</p>
            </div>
        </div>
        <div className="demos-darker">
            <div className="demo-text-darker">
                <h2>Reporta cualquier tipo de problema</h2>
                <p>Todos cooperan, todos se benefician</p>
            </div>
            <div className="demo-image">
                <img style={{width:"500px"}} src="/reports.png" alt=""/>
            </div>
        </div>
      </div>
    )
  }
}
