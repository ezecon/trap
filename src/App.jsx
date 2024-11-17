import { RouterProvider } from "react-router-dom";
import router from "./Components/Routes/Routes";


export default function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}