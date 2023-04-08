import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes } from "react-router-dom";
import "./index.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import App from "./pages/App";
import AccountProvider from "./context/Account";

const Root = () => {
	return (
		<BrowserRouter basename={"/"}>
			<PerfectScrollbar>
				<AccountProvider>
					<App />
				</AccountProvider>
			</PerfectScrollbar>
		</BrowserRouter>
	);
};

const container = document.getElementById("root");
const root = createRoot(container)
root.render(<Root />);