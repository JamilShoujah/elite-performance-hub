import { createRoot } from "react-dom/client";

import { restoreStaticRouteRedirect } from "@/app/staticRouteRedirect";

import App from "./App";
import "./styles/globals.css";

restoreStaticRouteRedirect();

createRoot(document.getElementById("root")!).render(<App />);
