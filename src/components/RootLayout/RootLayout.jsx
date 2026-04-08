import { Outlet } from "react-router";
import Navbar from "../home/Navbar/Navbar";


export const RootLayout = () => {
  return (
    <div className="layout-container">
  <header className="main-header">
      <Navbar />
      </header>
      <main className="content-area">
    
        <Outlet /> 
     
      </main>
   </div>
  );
};