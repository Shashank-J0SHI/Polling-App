import './Dashboard.css';
import {useRef, useEffect , useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import Team from './components/team'
import a from './resources/avatar2.png'
import { AdminContext } from './components/UserWs';

var catchup = false;

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function Dashboard() {
  const context = useContext(AdminContext)
  
  if (getCookie("msg") !== "")
  {
    alert(getCookie("msg"))
    document.cookie = `msg=;expires= ${new Date(0).toUTCString()}`
  }

  function q()
  {
      if (context.state === "Connected")
      {
          context.invoke("CatchUp", context.connectionId);
      }
      else
      {
          setTimeout(() => {q()}, 500);
      }
  }
  
  if (!catchup)
  {
      q();
  }

  context.on("Msg", (poll, time) => {
    if (poll && time > 3)
    {
        document.cookie = `time=${time}`
        document.location.href = "../poll"
    }
    else if (poll && time <= 3)
    {
        alert('Not enough time for current poll.')
    }
  })

  return (
    <div id="firstBox">
          <div style={{position: "relative", backgroundColor: "#fda706", height: "calc(100svh - 6rem)", width: "100%", padding: "0 25px", paddingTop: "25px", overflowY: "scroll"}}>
            <img src={a} style={{position: "relative", flex: "0 0 auto", backgroundColor: "white", height: "3rem", width: "3rem", borderRadius: "5rem"}}></img>
            <p style={{position: "relative", flex: "0 0 auto", color: "#0b0200", marginTop: "1.5rem", fontSize: "1.2rem"}}>#CONTEST NAME</p>
            <h1 style={{position: "relative", flex: "1 0 auto", color: "#0b0200", fontSize: "4rem", marginTop: "0.9rem", fontWeight: "700"}}>Up<br></br>Next</h1>
            
            <Team name="Team One" info="hello"/>
            <Team name="Team One"/>
            <Team name="Team One"/>
            <Team name="Team One"/>
            <Team name="Team One"/>
            <Team name="Team One"/>
            
            <div style={{margin: "1rem 0", display: "flex", flexDirection: "column", alignItems: "center"}}>
              <p>1 out of 30</p>
            </div>
          </div>

          <div style={{position: "fixed", height: "6rem", bottom: 0, flex: "0 0 auto", width: "100%", backgroundColor: "white", transform: "translate(-50%)", left: "50%", marginTop: "0rem", boxShadow: "0 -1px 10px rgba(0, 0, 0, 0.2)"}}>
              <div id="animteam" style={{position: "absolute", height: "100%", flex: "0 0 auto", width: "100%", padding: "0 26px", display: "flex", alignItems: "center", margin: "0 0"}}>
                <Team style={{border: "none"}}/>
              </div>
          </div>
    </div>
  );
}

export default Dashboard;
