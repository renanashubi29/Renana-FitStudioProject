
import "./index.css";

import { WorkoutsSection } from "./components/workouts/WorkoutsSection/WorkoutsSection.jsx";
import {AdminActions} from "./components/admin/AdminActions/AdminActions.jsx";
import { Header } from "./components/layout/Header/Header.jsx";

function App() {
return <>
{/* <AdminActions /> */}
<Header/>
<WorkoutsSection/>

</>

}

export default App;
