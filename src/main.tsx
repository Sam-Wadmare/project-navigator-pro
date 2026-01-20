import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Get the root element and render app
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
