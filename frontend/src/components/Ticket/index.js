import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import clsx from "clsx";

import { Paper, makeStyles, Switch, FormGroup, FormControlLabel, Grid, Box } from "@material-ui/core";

import ContactDrawer from "../ContactDrawer";
import MessageInput from "../MessageInput/";
import TicketHeader from "../TicketHeader";
import TicketInfo from "../TicketInfo";
import TicketActionButtons from "../TicketActionButtons";
import MessagesList from "../MessagesList";
import api from "../../services/api";
import { ReplyMessageProvider } from "../../context/ReplyingMessage/ReplyingMessageContext";
import toastError from "../../errors/toastError";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },

  ticketInfo: {
    maxWidth: "50%",
    flexBasis: "50%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "80%",
      flexBasis: "80%",
    },
  },
  ticketActionButtons: {
    maxWidth: "50%",
    flexBasis: "50%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      flexBasis: "100%",
      marginBottom: "5px",
    },
  },

  mainWrapper: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeft: "0",
    marginRight: -drawerWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  mainWrapperShift: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  button: {
		position: "relative",
		backgroundColor: "green",
    fontSize: "10px",
    margin: "35px",
    marginLeft: "2px",
    marginRight: "2px",
    color: "#FFF",
    width: "5%",
    '&:hover': {
      backgroundColor: "red",
      color: "#FFF"
    },    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      flexBasis: "100%",
      margin: "5px",
      marginLeft: "50px",
      marginRight: "50px",
      marginBottom: "5px",
    },
	},
  box: {
		position: "relative",
    marginLeft: "2px",
    marginRight: "2px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
	},
}));

const Ticket = () => {

  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

  const { ticketId } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({});
  const [ticket, setTicket] = useState({});

  async function DialogFlowOn() {
    alert('FERRAMENTA DISPONÍVEL NA VERSÃO PRO DO PASSAPORTE ZDG.\n👉 https://zapdasgalaxias.com.br/passaporte-zdg-2');
  }

  async function DialogFlowOff() {
    alert('FERRAMENTA DISPONÍVEL NA VERSÃO PRO DO PASSAPORTE ZDG.\n👉 https://zapdasgalaxias.com.br/passaporte-zdg-2');
  }

  async function DialogFlowOnAudio() {
    alert('FERRAMENTA DISPONÍVEL NA VERSÃO PRO DO PASSAPORTE ZDG.\n👉 https://zapdasgalaxias.com.br/passaporte-zdg-2');
  }

  async function DialogFlowOffAudio() {
    alert('FERRAMENTA DISPONÍVEL NA VERSÃO PRO DO PASSAPORTE ZDG.\n👉 https://zapdasgalaxias.com.br/passaporte-zdg-2');
  }

  async function ChatBotOn() {
    alert('FERRAMENTA DISPONÍVEL NA VERSÃO PRO DO PASSAPORTE ZDG.\n👉 https://zapdasgalaxias.com.br/passaporte-zdg-2');
  }

  async function ChatBotOff() {
    alert('FERRAMENTA DISPONÍVEL NA VERSÃO PRO DA COMUNIDADE ZDG.\n👉 https://zapdasgalaxias.com.br/passaporte-zdg-2');
  }

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const fetchTicket = async () => {
        try {
          const { data } = await api.get("/tickets/" + ticketId);

          setContact(data.contact);
          setTicket(data);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          toastError(err);
        }
      };
      fetchTicket();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [ticketId, history]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

    socket.on("connect", () => socket.emit("joinChatBox", ticketId));

    socket.on("ticket", (data) => {
      if (data.action === "update") {
        setTicket(data.ticket);
      }

      if (data.action === "delete") {
        toast.success("Ticket deleted sucessfully.");
        history.push("/tickets");
      }
    });

    socket.on("contact", (data) => {
      if (data.action === "update") {
        setContact((prevState) => {
          if (prevState.id === data.contact?.id) {
            return { ...prevState, ...data.contact };
          }
          return prevState;
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [ticketId, history]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(checked === false)
    {
      DialogFlowOn();
    }
    else if (checked === true ){
      DialogFlowOff();
    }
  };

  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
    if(checked2 === false)
    {
      ChatBotOn();
    }
    else if (checked2 === true ){
      ChatBotOff();
    }
  };

  const handleChange3 = (event) => {
    setChecked3(event.target.checked);
    if(checked3 === false)
    {
      DialogFlowOnAudio();
    }
    else if (checked3 === true ){
      DialogFlowOffAudio();
    }
  };

  return (
    <div className={classes.root} id="drawer-container">
      <Paper
        variant="outlined"
        elevation={0}
        className={clsx(classes.mainWrapper, {
          [classes.mainWrapperShift]: drawerOpen,
        })}
      >
        <TicketHeader loading={loading}>
          <div className={classes.ticketInfo}>
            <TicketInfo
              contact={contact}
              ticket={ticket}
              onClick={handleDrawerOpen}
            />
          </div>
          <div className={classes.ticketActionButtons}>
            <TicketActionButtons ticket={ticket} />
          </div>
          {/* <Button className={classes.button} onClick={() => {DialogFlowOn();}}>DialogON</Button>
          <Button className={classes.button} onClick={() => {DialogFlowOff();}}>DialogOff</Button>
          <Button className={classes.button} onClick={() => {ChatBotOn();}}>MYSQLOn</Button>
          <Button className={classes.button} onClick={() => {ChatBotOff();}}>MYSQLOff</Button> */}
        </TicketHeader>
        <Box className={classes.box}>
        <Grid container spacing={1} style={{display:'flex', alignItems:'center', textAlign: 'center', backgroundColor:'#ebebeb', padding:'10px'}}>
          <Grid item xs={12} md={4} sm={3}>
          <FormGroup row>
          <FormControlLabel control={
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />}label="DialogFlow" />
          </FormGroup>
          </Grid>
          <Grid item xs={12} md={4} sm={3}>
          <FormGroup row>
          <FormControlLabel control={
          <Switch
            checked={checked3}
            onChange={handleChange3}
            inputProps={{ 'aria-label': 'controlled' }}
          />}label="DialogFlowAudio" />
          </FormGroup>
          </Grid>
          <Grid item xs={12} md={4} sm={3}>
          <FormGroup row>
          <FormControlLabel control={
          <Switch
            checked={checked2}
            onChange={handleChange2}
            inputProps={{ 'aria-label': 'controlled' }}
          />}label="MYSQL" />
          </FormGroup>
          </Grid>
        </Grid>
        </Box>
        <ReplyMessageProvider>
          <MessagesList
            ticketId={ticketId}
            isGroup={ticket.isGroup}
          ></MessagesList>
          <MessageInput ticketStatus={ticket.status} />
        </ReplyMessageProvider>
      </Paper>
      <ContactDrawer
        open={drawerOpen}
        handleDrawerClose={handleDrawerClose}
        contact={contact}
        loading={loading}
      />
    </div>
  );
};

export default Ticket;
