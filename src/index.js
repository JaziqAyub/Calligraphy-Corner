import reactDom from "react-dom/client"
// import App from "./App"
import "react-toastify/dist/ReactToastify.css"
import Actions from "./context/Actions"


const root = reactDom.createRoot(document.getElementById("root"))

root.render(
<Actions/>

)