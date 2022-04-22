import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import SendIcon from '@material-ui/icons/Send';
import StarsIcon from '@material-ui/icons/Stars';

const http = require('https');

const initGet = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
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
		flexGrow: 1,
		width: '100%',
		alignItems: "center",
	},

	container: {
		padding: theme.spacing(2),
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		verticalAlign: "middle",
		marginBottom: 12,
	},

	paper2: {
		padding: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		verticalAlign: "middle",
		marginBottom: 12,
	},

	paper: {
		padding: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		verticalAlign: "middle",
		marginBottom: 12,
		marginRight: 100,
		marginLeft: 100,
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

	buttonReset: {
		padding: theme.spacing(2),
		display: "inline-flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		verticalAlign: "middle",
		marginBottom: 12,
		marginLeft: 12,
		fontSize: 10,
	},

	settingOption: {
		marginLeft: "auto",
	},
	margin: {
		margin: theme.spacing(1),
	},
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`scrollable-force-tabpanel-${index}`}
		aria-labelledby={`scrollable-force-tab-${index}`}
		{...other}
	  >
		{value === index && (
		  <Box p={3}>
			<Typography>{children}</Typography>
		  </Box>
		)}
	  </div>
	);
  }

  TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
	return {
	  id: `scrollable-force-tab-${index}`,
	  'aria-controls': `scrollable-force-tabpanel-${index}`,
	};
  }


const ZDGGroups = () => {
	const classes = useStyles();
	const [inputs, setInputs] = useState({});
	const [value, setValue] = React.useState(0);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}

	const handleChange2 = (event, newValue) => {
		setValue(newValue);
	  };

	const resetInputField = () => {
		setInputs("");
		alert('Campos resetados.');
	  };
	
	const handleSubmit = (event) => {
		event.preventDefault();
		alert('FERRAMENTA DISPONÍVEL NA VERSÃO PRO DA COMUNIDADE ZDG.\n👉 https://zapdasgalaxias.com.br/');
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
			<Paper className={classes.paper2}>
			<h1> Gestão de Grupos em MASSA</h1>
			</Paper>
			<Paper className={classes.paper2}>
			<h2><span role="img" aria-label="warning">⚠️</span> Gerencie todos os grupos onde você é o admin.</h2>
			</Paper>
			<Paper className={classes.paper2}>
			<h3> Resete os campos antes de cada nova ação</h3>
			<Button variant="contained" color="primary" className={classes.buttonReset} onClick={resetInputField}>
			Resetar campos
			</Button>
			</Paper>
		</Container>
		<AppBar position="static" color="default">
		<Tabs
			value={value}
			onChange={handleChange2}
			variant="scrollable"
			scrollButtons="on"
			indicatorColor="primary"
			textColor="primary"
			aria-label="scrollable force tabs example"
		  	>
			<Tab label="Atualizar Grupo" icon={<SystemUpdateIcon />} {...a11yProps(0)} />
			<Tab label="Criar  Grupo" icon={<AddBoxIcon />} {...a11yProps(1)} />
			<Tab label="Abrir Grupo" icon={<LockOpenIcon />} {...a11yProps(2)} />
			<Tab label="Fechar Grupo" icon={<LockIcon/>} {...a11yProps(3)} />
			<Tab label="Mensagem no Grupo" icon={<SendIcon />} {...a11yProps(4)} />
			<Tab label="Mensagem da NASA" icon={<StarsIcon />} {...a11yProps(5)} />
		</Tabs>
		</AppBar>
		<TabPanel value={value} index={0}>
			<Paper className={classes.paper}>
			<h2> Atualização dos Grupos</h2>
			</Paper>
			<form onSubmit={handleSubmit}>
				<Paper className={classes.paper}>
				<TextField 
					id="outlined-basic" 
					label="Título" 
					variant="outlined" 
					name="titulo" 
					value={inputs.titulo || ""} 
					onChange={handleChange}
					required="required"
					fullWidth
					margin="dense"
					placeholder="Novo título para os grupos"
				/>
				</Paper>
				<Paper className={classes.paper}>
				<TextField 
					id="outlined-basic" 
					label="Descrição" 
					variant="outlined" 
					name="descricao" 
					value={inputs.descricao || ""} 
					onChange={handleChange}
					required="required"
					fullWidth
					margin="dense"
					placeholder="Nova descrição para os grupos"
				/>
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
				ATUALIZAR GRUPOS
				</Button>
			</form>
		</TabPanel>
		<TabPanel value={value} index={1}>
			<Paper className={classes.paper}>
			<h2> Criação de Grupos</h2>
			</Paper>
			<form onSubmit={handleSubmit}>
				<Paper className={classes.paper}>
				<TextField 
					id="outlined-basic" 
					label="Título do Novo Grupo" 
					variant="outlined" 
					name="tituloNovo" 
					value={inputs.tituloNovo || ""} 
					onChange={handleChange}
					required="required"
					fullWidth					
					margin="dense"
					placeholder="Título para o novo grupo"
				/>
				</Paper>
				<Paper className={classes.paper}>
				<TextField 
					id="outlined-basic" 
					label="Contato da agenda a ser adicionado" 
					variant="outlined" 
					name="contatoGrupo" 
					value={inputs.contatoGrupo || ""} 
					onChange={handleChange}
					required="required"
					fullWidth					
					margin="dense"
					placeholder="Título para o novo grupo"
				/>
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
				ATUALIZAR GRUPOS
				</Button>
			</form>
		</TabPanel>
		<TabPanel value={value} index={2}>
			<Paper className={classes.paper}>
			<h2> Abrir Grupos</h2>
			</Paper>
			<form onSubmit={handleSubmit}>
				<Paper className={classes.paper}>
				<TextField 
					id="outlined-basic" 
					label="Abrir os grupos" 
					variant="outlined" 
					name="abrirGrupo" 
					value={inputs.abrirGrupo || ""} 
					onChange={handleChange}
					required="required"
					fullWidth					
					margin="dense"
					placeholder="Escreva ABRIR para abrir seus GRUPOS"
				/>
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
				ABRIR GRUPOS
				</Button>
			</form>
		</TabPanel>
		<TabPanel value={value} index={3}>
			<Paper className={classes.paper}>
			<h2> Fechar Grupos</h2>
			</Paper>
			<form onSubmit={handleSubmit}>
			<Paper className={classes.paper}>
				<TextField 
					id="outlined-basic" 
					label="Fechar os grupos" 
					variant="outlined" 
					name="fecharGrupo" 
					value={inputs.fecharGrupo || ""} 
					onChange={handleChange}
					required="required"
					fullWidth					
					margin="dense"
					placeholder="Escreva FECHAR para abrir seus GRUPOS"
				/>
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
				FECHAR GRUPOS
				</Button>
			</form>
		</TabPanel>
		<TabPanel value={value} index={4}>
			<Paper className={classes.paper}>
			<h2> Enviar Mensagem nos Grupos</h2>
			</Paper>
			<form onSubmit={handleSubmit}>
				<Paper className={classes.paper}>
				<TextField 
					id="outlined-basic" 
					label="Mensagem para os Grupos" 
					variant="outlined" 
					name="mensagemGrupo" 
					value={inputs.mensagemGrupo || ""} 
					onChange={handleChange}
					required="required"
					fullWidth	
					multiline				
					margin="dense"
					placeholder="Oi tudo bem?&#13;&#10;Como vai você!?&#13;&#10;Aqui é o Pedrinho da NASA.&#13;&#10;Já conhece a Comunidade ZDG?"
				/>
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
				ENVIAR MENSAGENS NOS GRUPOS
				</Button>
			</form>
		</TabPanel>
		<TabPanel value={value} index={5}>
			<Paper className={classes.paper}>
			<h2> Enviar Mensagem no Privado</h2>
			</Paper>
			<Paper className={classes.paper}>
			<h3><span role="img" aria-label="warning">⚠️</span> Enviar mensagem individual para cada participante dos grupos onde você é ADMIN</h3>
			</Paper>
			<form onSubmit={handleSubmit}>
			<Paper className={classes.paper}>
				<TextField 
					id="outlined-basic" 
					label="Mensagem individual para os participante dos grupos" 
					variant="outlined" 
					name="mensagemGrupoNASA" 
					value={inputs.mensagemGrupoNASA || ""} 
					onChange={handleChange}
					required="required"
					fullWidth	
					multiline				
					margin="dense"
					placeholder="Oi tudo bem?&#13;&#10;Como vai você!?&#13;&#10;Aqui é o Pedrinho da NASA.&#13;&#10;Já conhece a Comunidade ZDG?"
				/>
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
				DISPARAR MENSAGEM DA NASA
				</Button>
			</form>
		</TabPanel>
	  </div>
	);
};

export default ZDGGroups;