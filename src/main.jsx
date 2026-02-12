import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from './App.jsx'





import "./App.css";
import { Router } from "./Router.jsx";
import TanstackProvider from "./QueryClientProvider.jsx";


const root = document.getElementById("root");

createRoot(root).render(<TanstackProvider> <Router/> </TanstackProvider> );


