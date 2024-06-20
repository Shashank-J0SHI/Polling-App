import './team.css';
import { useRef } from "react";
import avtar from '../resources/avatar1.png'
import heart from '../resources/heartchecked.svg'

export default function Team({name="Team Name", info="", style={}, img=avtar, hndlr}) {
    const ref1 = useRef()
    const act = () =>
    {
      ref1.current.checked = !ref1.current.checked
    }

    return (
        <div class="team" style={style}>
            <img id="img" src={img}></img>
            <div>
              <h3>{name}</h3>
              {
                (info) ? <p>{info}</p> : null
              }
              <input type={"checkbox"} ref={ref1}></input>
              <div id="heart" onClick={act}></div>
            </div>
        </div>
    );
}