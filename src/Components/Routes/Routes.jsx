import { createBrowserRouter } from "react-router-dom";
import SaveLocation from "../Trap/Trap";


const router = createBrowserRouter(
    [

        {
            path: "/",
            element: <SaveLocation/>
        },
    ]
)

export default router;
