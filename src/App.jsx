import { useState } from "react";
import "./index.css";
import { ScheduleCardComp } from "./components/ScheduleCardComp.jsx";

import {WeekScheduleTable} from "./components/WeekScheduleTable.jsx";

function App() {
  const [count, setCount] = useState(0);


  return <><header>
  <nav className="my-nav">
    <a href="#">בית</a>
    <a href="#">אימונים</a>
    <a href="#">מחירים</a>
    <a href="#">צור קשר</a>
    <button className="nav-toggle">☰</button>
   
  </nav>

</header>
 <div className="box">
        <WeekScheduleTable/>
      </div>

</>
}

export default App;
