
import "./index.css";

import { WorkoutsSection } from "./components/workouts/WorkoutsSection/WorkoutsSection.jsx";
import {AdminActions} from "./components/admin/AdminActions/AdminActions.jsx";

function App() {
return <>
<AdminActions />
<WorkoutsSection/>
</>

}

export default App;
