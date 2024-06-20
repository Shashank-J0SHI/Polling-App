import './Edit.css';
import {useRef, useEffect , useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import Team from './components/team'
import a from './resources/avatar2.png'
import { AdminContext } from './components/UserWs';


function Edit() {
  let context = useContext(AdminContext)
  let [vCount, setV] = useState(0)

  context.on("Count", (c, x) =>
  {
    setV(x)
  })

  return (
    <div id="editBox">
        <h1>Admin Dashboard</h1>
        <div id="h">

        </div>
        <div id="controlGrid">
          <div>
            <p><span>00</span><br></br>Participants</p>
          </div>
          <div>
            <p><span>00</span><br></br>Poll Results</p>
          </div>
          <div>
            <p><span>{(vCount > 10) ? vCount : "0" + vCount}</span><br></br>Voters</p>
          </div>
          <div></div>
        </div>
    </div>
  );
}

export default Edit;
