import reactDom from "react-dom/client";
// import App from "./App"
import "react-toastify/dist/ReactToastify.css";
import Store from "./context/Store";
import { BrowserRouter } from "react-router-dom";

const root = reactDom.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Store />
  </BrowserRouter>
);
