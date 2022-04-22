import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(1)
	},

	paper: {
		padding: theme.spacing(2),
		display: "flex",
		alignItems: "center",
	},

	settingOption: {
		marginLeft: "auto",
	},
	margin: {
		margin: theme.spacing(1),
	},
}));


const ZDGDashboard = () => {
	const classes = useStyles();

	useEffect(() => {
		const socket = openSocket(process.env.REACT_APP_BACKEND_URL);
		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div className={classes.root}> 
		<iframe title="ZDGChatbot" src='http://localhost:3000/public/dashboard/a6be20fb-fedb-42a5-90be-207293b30314' height='800' width='100%' frameBorder="0"/>  
		</div>
	);
};

export default ZDGDashboard;