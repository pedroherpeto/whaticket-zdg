import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tabs from "../../components/Tabs";
import './index.css';

const http = require('http');

const init = {
  host: 'localhost',
  path: '/zdgGroups',
  port: 8080,
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
};

const init2 = {
	host: 'localhost',
	path: '/zdgGroupsDescription',
	port: 8080,
	method: 'POST',
	headers: {
	  'content-type': 'application/json; charset=utf-8'
	}
  };

const init3 = {
	host: 'localhost',
	path: '/zdgGroupsCreate',
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

async function ZDGSetGroups (subject, iD) {
	const req = http.request(init, callback);
	const body = '{"subject":"'+ subject + '","ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

async function ZDGSetGroupsDescription (description, iD) {
	const req = http.request(init2, callback);
	const body = '{"description":"'+ description + '","ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

async function zdgGroupsCreate (title, contact, iD) {
	const req = http.request(init3, callback);
	const contactWPP = contact + "@c.us";
	const body = '{"title":"' + title + '","contact":"' + contactWPP + '","ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

const initGet = {
	host: 'localhost',
	port: 8080,
	path: '/whatsappzdg'
  };
  
async function GETSender() {
	http.get(initGet, function(res) {
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
		alignItems: "center",
	},

	settingOption: {
		marginLeft: "auto",
	},
	margin: {
		margin: theme.spacing(1),
	},
}));


const ZDGGroups = () => {
	const classes = useStyles();
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		alert('Os dados estão sendo atualizados! Clique ok para continuar...');
		if (inputs.titulo !== undefined && inputs.descricao === undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Todos os títulos dos grupos que você é admin estão sendo atualizados! Aguarde...');
			setTimeout(function() {
				ZDGSetGroups(inputs.titulo, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.titulo === undefined && inputs.descricao !== undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Todos as descrições dos grupos que você é admin estão sendo atualizados! Aguarde...');
			setTimeout(function() {
				ZDGSetGroupsDescription(inputs.descricao, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.titulo !== undefined && inputs.descricao !== undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Todos as descrições e títulos dos grupos que você é admin estão sendo atualizados! Aguarde...');
			setTimeout(function() {
				ZDGSetGroupsDescription(inputs.descricao, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
			setTimeout(function() {
				ZDGSetGroups(inputs.titulo, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.titulo === undefined && inputs.descricao === undefined && inputs.tituloNovo !== undefined && inputs.contatoGrupo !== undefined) {
			alert('Os grupos estão sendo criados! Aguarde...');
			setTimeout(function() {
				zdgGroupsCreate(inputs.tituloNovo, inputs.contatoGrupo, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.titulo === undefined && inputs.descricao === undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Preencha os campos corretamente, nenhuma ação foi executada.');
			return;
		}
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
			<Tabs>
			<div label="Atualização dos Grupos">
			<h1>Atualização de Grupos</h1>
			<form onSubmit={handleSubmit}>
				<label>Título<br/>
				<input 
					type="text" 
					name="titulo" 
					value={inputs.titulo || ""} 
					onChange={handleChange}
					//required="required"
				/>
				</label><br/><br/>
				<label>Descricao<br/>
				<input 
					type="text" 
					name="descricao" 
					value={inputs.descricao || ""} 
					onChange={handleChange}
					//required="required"
				/>
				</label><br/><br/>
				<label>ID de Disparo<br/>
				<input 
					type="text" 
					name="id" 
					value={inputs.id || ""} 
					onChange={handleChange}
					required="required"
				/>
				</label><br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"#2576d2", borderColor:"#2576d2", borderRadius: "4px", padding: "10px" }}
				type="button" 
				value="Mostrar ID de Disparo"
				onClick={GETSender}
				/>
				<br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"	#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Atualizar Grupos"
				/>
			</form>
			</div>
			<div label="Criação dos Grupos">
			<h1>Criação de Grupos</h1>
			<form onSubmit={handleSubmit}>
				<label>Título do Novo Grupo<br/>
				<input 
					type="text" 
					name="tituloNovo" 
					value={inputs.tituloNovo || ""} 
					onChange={handleChange}
				/>
				</label><br/><br/>
				<label>Contato da agenda a ser adicionado<br/>
				<input 
					type="text" 
					name="contatoGrupo" 
					value={inputs.contatoGrupo || ""} 
					onChange={handleChange}
				/>
				</label><br/><br/>
				<label>ID de Disparo<br/>
				<input 
					type="text" 
					name="id" 
					value={inputs.id || ""} 
					onChange={handleChange}
					required="required"
				/>
				</label><br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"#2576d2", borderColor:"#2576d2", borderRadius: "4px", padding: "10px" }}
				type="button" 
				value="Mostrar ID de Disparo"
				onClick={GETSender}
				/>
				<br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"	#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Atualizar Grupos"
				/>
			</form>
			</div>
			</Tabs>
			</Container>
		</div>
	);
};

export default ZDGGroups;