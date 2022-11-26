import React from "react";
import ReactDOM from "react-dom/client";
import { Context } from "./Context";
import "./index.css";
import { Routes } from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Context>
			<Routes />
		</Context>
	</React.StrictMode>
);
