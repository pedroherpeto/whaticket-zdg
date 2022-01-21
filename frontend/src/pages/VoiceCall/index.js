import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const http = require('http');

const init = {
  host: 'localhost',
  path: '/makeVoiceCall',
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

async function ZDGVoice(from, to, text) {
	const req = http.request(init, callback);
	const body = '{"from":"'+ from + '","to":"' + to + '","text":"' + text + '"}';
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

const VoiceCall = () => {
	const classes = useStyles();
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }
	
	const handleSubmit = (event) => {
		event.preventDefault();
		alert('As chamadas estão sendo carregadas! Aguarde...');
		const usersTextArea = inputs.user.split('\n');
		usersTextArea.forEach((user) => {
			setTimeout(function() {
				ZDGVoice(inputs.from, user, inputs.message);
				alert('Chamada realizada para o número: ' + user);
				},5000 + Math.floor(Math.random() * 10))            
		  });
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
			<h1>Realizar chamada telefônica</h1>
			<form onSubmit={handleSubmit}>
				<label>Números:<br/>
				<textarea 
					name="user" 
					cols="40" 
					rows="5"
					value={inputs.user || ""} 
					onChange={handleChange}
					required="required"
					placeholder="553588754197&#13;&#10;553588754197&#13;&#10;553588754197&#13;&#10;553588754197"
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
				<label>Remetente<br/>
				<input 
					type="text" 
					name="from" 
					value={inputs.from || ""} 
					onChange={handleChange}
					required="required"
					placeholder="5535988754197"
				/>
				</label><br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Disparar"
				/>
			</form>
			</Container>
		</div>
	);
};

export default VoiceCall;