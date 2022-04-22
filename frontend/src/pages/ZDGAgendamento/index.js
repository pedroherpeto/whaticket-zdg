import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import brLocale from 'date-fns/locale/fr';

const http = require('https');

const init2 = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/whatsappzdg'
  };
  
async function GETSender() {
	http.get(init2, function(res) {
		res.on("data", function(wppID) {
		  alert("ID instância ativa: " + wppID) ;
		});
	  }).on('error', function(e) {
		alert("Erro: " + e.message);
	  });
}

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(4)
	},

	paper: {
		padding: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		verticalAlign: "middle",
		marginBottom: 12,
	},

	button: {
		padding: theme.spacing(2),
		display: "inline-flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		verticalAlign: "middle",
		marginBottom: 12,
		marginRight: 12,
	},

	settingOption: {
		marginLeft: "auto",
	},
	margin: {
		margin: theme.spacing(1),
	},
}));

const ZDG = () => {
	const classes = useStyles();
	const [inputs, setInputs] = useState({});
	const [value, setValue] = React.useState(null);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }
	
	const handleSubmit = (event) => {
		event.preventDefault();
		alert('FERRAMENTA DISPONÍVEL NA VERSÃO PRO DO PASSAPORTE ZDG.\n👉 https://zapdasgalaxias.com.br/passaporte-zdg-2');
	}
	
	useEffect(() => {
		const socket = openSocket(process.env.REACT_APP_BACKEND_URL);
		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div className={classes.root}>  
			<Container className={classes.container} maxWidth="sm">
			<Paper className={classes.paper}>
			<h1> Mensagens agendadas</h1>
			</Paper>
			<Paper className={classes.paper}>
			<h3><span role="img" aria-label="warning">⚠️</span> Consulte o controle na opção ChatBOT</h3>
			</Paper>
			<form onSubmit={handleSubmit}>
				<Paper className={classes.paper}>
				<LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
				<DatePicker
					label="Data de Envio"
					name="dataEnvio" 
					value={value}
					onChange={(newValue) => {
					setValue(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
				</LocalizationProvider>
				</Paper>
				<Paper className={classes.paper}>
				<TextField 
					id="outlined-basic" 
					label="ID de Disparo" 
					variant="outlined" 
					name="id" 
					value={inputs.id || ""} 
					onChange={handleChange}
					required="required"
					fullWidth
					margin="dense"
				/>
				</Paper>
				<Button variant="contained" color="primary" className={classes.button} onClick={GETSender}>
				Mostrar ID de Disparo
				</Button>
				<Button variant="contained" color="secondary" className={classes.button} type="submit">
				DISPARAR
				</Button>
			</form>
			</Container>
		</div>
	);
};

export default ZDG;
