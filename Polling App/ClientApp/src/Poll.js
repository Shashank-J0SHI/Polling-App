import './Poll.css';
import {useRef, useEffect , useState, useContext} from "react";
import worker_script from './worker';
import { AdminContext } from './components/UserWs';

const worker = new Worker(worker_script);

let bool = true;
let start = true;
let t = 0

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

function animate(to)
{
    bool = false;
    let delta = 6.66666 / 59;
    let move = to + 6.66667;
    let arr = [`translateY(${move}%)`]

    for (let i = 1; i < 60; i++)
    {
        move = move - delta;
        arr[i] = `translateY(${move}%)`
        if (move <= 0)
        {
          break;
        }
    }
    return arr;
}

function Poll() {
  const context = useContext(AdminContext)

  const [time, setTime] = useState([15]);
  const water = useRef();

  function option(num)
  { 
    context.invoke("User", num)
  }

  context.on("Msg", (poll) => {
    if (!poll && t > 0)
    {
        document.cookie = `time=;expires= ${new Date(0).toUTCString()}`
        document.cookie = 'msg=Poll stopped by Admin.'
        document.location.href = "../"
    }})


  if (start)
  {
    worker.postMessage(getCookie("time"))
    start = false;
  }

  useEffect(() =>
  {
    let element = water.current;
    worker.addEventListener('message', event =>
    {
      if (event.data >= 0 && bool) 
      {
        t = event.data;
        setTime(t);
        let arr = animate(((event.data - 1) / 15) * 100);
        let frame = 0
        const temp = setInterval(() =>
        {
          element.style.transform = arr[frame]
          frame++
          if (frame == arr.length - 1)
          {
            clearInterval(temp)
            bool = true;
          }
        }, 16)
      }
      else if (event.data < 0 && bool)
      {
        const temp = setTimeout(() =>
        {
          start = true;
          document.cookie = `time=;expires= ${new Date(0).toUTCString()}`
          document.cookie = 'msg=Poll successful.'
          window.location.href = "../dashboard";
        }, 5000)
      }
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      </header>
        <div id="water" ref={water}>
          <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
            <div id="depth"></div>
          </div>
        </div>

        <div style={{position: 'absolute', top: 0, height: '100%', width: '100%'}}>
          <div className="hd"></div>
          <div className="hd" id='actualHd'>
              <h2>Team One</h2>
          </div>
        
          <div className="timer"></div>
          <div className="timer" id='actualTimer'>{time}</div>

          <div className="mj"></div>
          <div className="mj" id='actualMj'>
              <span onClick={() => option(0)}><div id="i1" ></div></span>
              <span onClick={() => option(1)}><div id="i2" ></div></span>
              <span onClick={() => option(2)}><div id="i3" ></div></span>
              <span onClick={() => option(3)}><div id="i4" ></div></span>
          </div>
        </div>
      </div>
  );
}

export default Poll;
