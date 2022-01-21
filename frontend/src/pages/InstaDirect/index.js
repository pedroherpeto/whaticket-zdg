import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const http = require('http');

const init = {
  host: 'localhost',
  path: '/sendDirect',
  port: 8080,
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
};

const callback = function(response) {
  let result = Buffer.alloc(0);
  response.on('data', function(chunk) {
    result = Buffer.concat([result, chunk]);
  });
  
  response.on('end', function() {
    console.log(result.toString());
  });
};

async function ZDGSender(userIg, message) {
	const req = http.request(init, callback);
	const body = '{"userIg":"' + userIg + '","message":"' + message + '"}';
	await req.write(body);
	req.end();
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
		alignItems: "center",
	},

	settingOption: {
		marginLeft: "auto",
	},
	margin: {
		margin: theme.spacing(1),
	},
}));

const DirectInsta = () => {
	const classes = useStyles();
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }
	
	const handleSubmit = (event) => {
		event.preventDefault();
		alert('As mensagens estão sendo carregadas! Aguarde...');
			setTimeout(function() {
				ZDGSender(inputs.userIg, inputs.message);
				alert('Mensagem enviada para o instagram de: ' + inputs.userIg);
				},5000 + Math.floor(Math.random() * 10000))            
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
			<form onSubmit={handleSubmit}>
				<h1>Envio de Directs</h1>
				<label>Destinatários IG:<br/>
				<textarea 
					name="userIg" 
					cols="40" 
					rows="5"
					value={inputs.userIg || ""} 
					onChange={handleChange}
					required="required"
				></textarea>
				</label><br/><br/>
				<label>Mensagem<br/>
				<textarea 
					name="message" 
					cols="40" 
					rows="5"
					value={inputs.message || ""} 
					onChange={handleChange}
					required="required"
					placeholder="Olá, tudo bem?&#13;&#10;Como posso te ajudar?&#13;&#10;Abraços, a gente se vê!"
				></textarea>
				</label><br/><br/>
				<input 
				style={{ color:"white", backgroundColor:"	#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Disparar"
				/>
			</form>
			</Container>
		</div>
	);
};

export default DirectInsta;