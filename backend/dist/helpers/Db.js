const mysql = require('mysql2/promise');

const createConnection = async () => {
	return await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});
}

const getReply = async (keyword) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT resposta FROM chatbots WHERE pergunta = ?', [keyword]);
	if (rows.length > 0) return rows[0].resposta;
	return false;
}

const getAgendamento = async (dataEnvio) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM agendamentos WHERE dataEnvio = ? AND statusEnvio != "Enviado"', [dataEnvio]);
	if (rows.length > 0) return rows;
	return false;
}

const setAgendamento = async (id) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE agendamentos SET statusEnvio = "Enviado" WHERE id = ?', [id]);
	if (rows.length > 0) return rows;
	return false;
}

const getChatBot = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT status FROM statuschatbots WHERE msgFrom = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setChatBotOff = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE statuschatbots SET status = "off" WHERE msgFrom = ?', [msgFrom]);
	if (rows.length > 0) return rows;
	return false;
}

const setChatBotOn = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE statuschatbots SET status = "ok" WHERE msgFrom = ?', [msgFrom]);
	if (rows.length > 0) return rows;
	return false;
}

const getDialogFlowAudio = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT status FROM dialogFlowaudios WHERE msgFrom = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setDialogOffAudio = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE dialogFlowaudios SET status = "off" WHERE msgFrom = ?', [msgFrom]);
	if (rows.length > 0) return rows;
	return false;
}

const setDialogOnAudio = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE dialogFlowaudios SET status = "ok" WHERE msgFrom = ?', [msgFrom]);
	if (rows.length > 0) return rows;
	return false;
}

const getDialogFlow = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT status FROM dialogFlows WHERE msgFrom = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setDialogOff = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE dialogFlows SET status = "off" WHERE msgFrom = ?', [msgFrom]);
	if (rows.length > 0) return rows;
	return false;
}

const setDialogOn = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE dialogFlows SET status = "ok" WHERE msgFrom = ?', [msgFrom]);
	if (rows.length > 0) return rows;
	return false;
}

const setContactDialog = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO dialogFlows (`id`, `msgFrom`) VALUES (NULL, ?);', [msgFrom]);
	if (rows.length > 0) return rows;
	return false;
}

const getContactDialog = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM dialogFlows WHERE msgFrom = ?', [msgFrom]);
	if (rows.length > 0) return true;
	return false;
}

const getHorarioInicio = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT inicio FROM horariochatbots');
	if (rows.length > 0) return rows[0].inicio;
	return false;
}

const getHorarioTermino = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT termino FROM horariochatbots');
	if (rows.length > 0) return rows[0].termino;
	return false;
}

const getLimiteUsuario = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM limiteconexoes');
	if (rows.length > 0) return rows[0].user;
	return false;
}

const getLimiteWhatsApp = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT whatsapp FROM limiteconexoes');
	if (rows.length > 0) return rows[0].whatsapp;
	return false;
}

const setProtocolo = async (usuario, protocolo) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO protocolos (`id`, `usuario`, `protocolo`) VALUES (NULL, ?, ?);', [usuario, protocolo]);
	if (rows.length > 0) return rows;
	return false;
}

const getWhatsAppId = async (ticketid) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT whatsappId FROM Tickets WHERE id = ?', [ticketid]);
	if (rows.length > 0) return rows;
	return false;
}

const getActiveWhatsAppId = async (wppid) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM Whatsapps WHERE id = ?', [wppid]);
	if (rows.length > 0) return true;
	return false;
}

module.exports = {
	createConnection,
	getReply,
	getAgendamento,
	setAgendamento,
	getDialogFlow,
	setDialogOff,
	setDialogOn,
	getDialogFlowAudio,
	setDialogOffAudio,
	setDialogOnAudio,
	setContactDialog,
	getContactDialog,
	getChatBot,
	setChatBotOn,
	setChatBotOff,
	getHorarioInicio,
	getHorarioTermino,
	getLimiteUsuario,
	getLimiteWhatsApp,
	setProtocolo,
	getWhatsAppId,
	getActiveWhatsAppId
}