import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage, Main, LogIn, Register } from "./components";
import { createBrowserRouter,
         RouterProvider,
         Route, createRoutesFromElements, } from "react-router-dom";

        const router = createBrowserRouter(createRoutesFromElements(
            <Route path="/" element={<Main/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/login" element={<LogIn/>} />
                <Route path="/register" element={<Register/>} />
            </Route>
        ))

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);

root.render(<RouterProvider router={router}/>);
