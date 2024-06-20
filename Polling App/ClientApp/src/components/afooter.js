import './afooter.css';
import { useContext, useRef } from "react";
import homes from '../resources/home_selected.svg'
import power from '../resources/power.svg'
import { Outlet, useNavigate } from 'react-router';
import { AdminContext } from './UserWs';

var conn = false;

export default function Afooter() {
  const context = useContext(AdminContext)
  const ref1 = useRef()
  const ref2 = useRef()
  const navigate = useNavigate()

  function q()
  {
    if (context.state === "Connected")
    {
      context.invoke("Admin_Connected")
      conn = true
    }
    else
    {
      setTimeout(() =>
      {
        q()
      }, 500)
    }
  }

  if (!conn)
  {
    q()
  }

    return (
        <div className="afoot" style={{position: "relative", height: "100vh", width: "100vw", overflow: "hidden", display: "flex", flexDirection: "column", backgroundColor: "rgb(43, 43, 50)"}}>
          <div style={{position: "relative", height: "calc(100svh - min(80px, 14%))", width: "100%"}}>
            <Outlet/>
          </div>
          <div style={{position: "fixed", bottom: "0", height: "min(80px, 14%)", width: "100%", backgroundColor: "rgb(38, 38, 46)", borderTopLeftRadius: "20px", boxShadow:  "-1px -1px 1px rgb(150, 150, 150)", borderTopRightRadius: "20px", zIndex: 2, display: "flex", padding: "min(10px, 6%) 0"}}>
            <div id="home_button" className='nav_button' style={{position: "relative", display: "flex", flexDirection: "column", marginLeft: "auto"}} onClick={() => {ref1.current.checked = true; ref2.current.checked = false; navigate('/admin/dashboard')}}>
              <input ref={ref1} type={"checkbox"}></input>
              <div></div>
              <p style={{color: "white", fontSize: "15px"}}>Home</p>
            </div>
            <div style={{position: "relative", marginLeft: "auto", width: "1px", borderLeft: "1px white solid"}}>
            </div>
            <div id="poll_button" className='nav_button' style={{position: "relative", display: "flex", flexDirection: "column", marginLeft: "auto", marginRight: "auto"}} onClick={() => {ref2.current.checked = true; ref1.current.checked = false; navigate('/admin/poll')}}>
              <input ref={ref2} type={"checkbox"}></input>
              <div></div>
              <p style={{color: "white", fontSize: "15px", textAlign: "center"}}>Poll</p>
            </div>
          </div>
        </div>
    );
}