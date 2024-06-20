import './Control.css';
import {useRef, useEffect , useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';

import next from './resources/next.svg';
import prev from './resources/prev.svg';

import {AdminContext} from './components/UserWs';

// let dashphp = `http://${window.location.hostname}/php/dashboard.php`
// let logout = `http://${window.location.hostname}/php/logout.php`
// let status = `http://${window.location.hostname}/php/status.php`

var c = false;

// var xhr = new XMLHttpRequest();

// async function s_fetch()
// {
//   xhr.open("POST", `${status}`);
//   xhr.send()
//   let myPromise = new Promise(function(resolve) {
//     xhr.onreadystatechange = () =>
//     {
//       if (xhr.readyState === 4)
//       {
//         if (xhr.response == 1)
//         {
//           resolve(true)
//         }
//         else
//         {
//           resolve(false)
//         }
//       }
//     }
//   });

//   return myPromise;
// }

function Control() {
    const navigate = useNavigate();
    const [count, setCount] = useState([0, 0, 0, 0]);
    const [time, setTime] = useState([15])
    const ref1 = useRef();
    const context = useContext(AdminContext);

    context.on("Msg", (poll, t) => {
        if (!poll)
        {
            ref1.current.checked = false;
        }
        else
        {
            setTime(t);
            ref1.current.checked = true;
        }
    })

    context.on("Count", (c, x) =>
    {
        setCount(c);
    })

    const push = () =>
    {
        ref1.current.checked = !ref1.current.checked;
        context.invoke("Admin", ref1.current.checked, "0");
        if (ref1.current.checked && !c)
        {
            setCount([0, 0, 0, 0])
            let t = 16
            const temp = setInterval(() =>
            {
                c = true
                t -= 1
                setTime(t)
                if (t < 0)
                {
                    setTime(15)
                    clearInterval(temp)
                    c = false
                }
            }, 1000)
        }
    }
    
    return (
        <div id="dash">
            <h1>Poll Control</h1>
            <div id="container">
              <input type="checkbox" ref={ref1}></input>
              <div id="time_info">
                <p id="stopped"><span>Not</span><br></br>Running.</p>
                <p id="running"><span>{time}</span> s<br></br>Running.</p>
              </div>
              <div id="button_container">
                  <div id="push" onClick={push}></div>
              </div>
            </div>
            <div id="team_select">
              <img src={prev} id="prev"></img>
              <h2>Team Name</h2>
              <img src={next} id="next"></img>
            </div>
            <div id="poll_turnout">
                <p><span>{count[0]}</span><br></br>Option 1</p>
                <p><span>{count[1]}</span><br></br>Option 2</p>
                <p><span>{count[2]}</span><br></br>Option 3</p>
                <p><span>{count[3]}</span><br></br>Option 4</p>
            </div>
        </div>
    );
}

export default Control;
