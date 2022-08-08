import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inspire from "./pages/Inspire";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Groups from "./pages/Groups";
import NotFound from "./pages/NotFound";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import ChatProvider from "./Context/ChatProvider";

export default function App() {
  return (
    <ChakraProvider resetCSS={false}>
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"inspire"} element={<Inspire />} />
            <Route path={"login"} element={<Login />} />
            <Route path={"register"} element={<Register />} />
            <Route path={"chat"} element={<Chat />} />
            <Route path={"groups"} element={<Groups />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
