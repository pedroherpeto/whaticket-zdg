import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import { Badge } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import BallotIcon from '@material-ui/icons/Ballot';
import GroupIcon from '@material-ui/icons/Group';
import SendIcon from '@material-ui/icons/Send';
import TextsmsIcon from '@material-ui/icons/Textsms';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import InstagramIcon from '@material-ui/icons/Instagram';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SubjectIcon from '@material-ui/icons/Subject';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PaymentIcon from '@material-ui/icons/Payment';

import { i18n } from "../translate/i18n";
import { WhatsAppsContext } from "../context/WhatsApp/WhatsAppsContext";
import { AuthContext } from "../context/Auth/AuthContext";
import { Can } from "../components/Can";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  listWrap: {
    backgroundColor: "#ABFF03",
    color: '#000000',
    "&:hover": {
      // backgroundColor: "#000000",
      //color: '#000000',
    },
  },
  listTitle: {
    backgroundColor: "#ABFF03",
    color: '#000000',
    marginTop: '1px',

  }
}));

function ListItemLink(props) {
  const { icon, primary, to, className } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} className={className}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const MainListItems = (props) => {
  const classes = useStyles();
  const { drawerClose } = props;
  const { whatsApps } = useContext(WhatsAppsContext);
  const { user } = useContext(AuthContext);
  const [connectionWarning, setConnectionWarning] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (whatsApps.length > 0) {
        const offlineWhats = whatsApps.filter((whats) => {
          return (
            whats.status === "qrcode" ||
            whats.status === "PAIRING" ||
            whats.status === "DISCONNECTED" ||
            whats.status === "TIMEOUT" ||
            whats.status === "OPENING"
          );
        });
        if (offlineWhats.length > 0) {
          setConnectionWarning(true);
        } else {
          setConnectionWarning(false);
        }
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [whatsApps]);

  return (
    <div onClick={drawerClose}>
      <Can
        role={user.profile}
        perform="drawer-admin-items:view"
        yes={() => (
          <>
            <ListSubheader inset>
              {i18n.t("mainDrawer.listItems.administration")}
            </ListSubheader>
            <ListItemLink
              to="/users"
              primary={i18n.t("mainDrawer.listItems.users")}
              icon={<PeopleAltOutlinedIcon />}
            />
            <ListItemLink
              to="/connections"
              primary={i18n.t("mainDrawer.listItems.connections")}
              icon={
                <Badge badgeContent={connectionWarning ? "!" : 0} color="error">
                  <SyncAltIcon />
                </Badge>
              }
            />
            <ListItemLink
              to="/queues"
              primary={i18n.t("mainDrawer.listItems.queues")}
              icon={<AccountTreeOutlinedIcon />}
            />
            <ListItemLink
              to="/settings"
              primary={i18n.t("mainDrawer.listItems.settings")}
              icon={<SettingsOutlinedIcon />}
            />
          </>
        )}
      />
      <Divider />
      <ListSubheader inset>
            {i18n.t("mainDrawer.listItems.Free")}
      </ListSubheader>
      <ListItemLink
        to="/"
        primary="Dashboard"
        icon={<BallotIcon />}
      />
      <ListItemLink
        to="/tickets"
        primary={i18n.t("mainDrawer.listItems.tickets")}
        icon={<WhatsAppIcon />}
      />

      <ListItemLink
        to="/contacts"
        primary={i18n.t("mainDrawer.listItems.contacts")}
        icon={<ContactPhoneOutlinedIcon />}
      />
      <ListItemLink
        to="/quickAnswers"
        primary={i18n.t("mainDrawer.listItems.quickAnswers")}
        icon={<QuestionAnswerOutlinedIcon />}
      />
      <Divider />
      <ListSubheader inset>
            {i18n.t("mainDrawer.listItems.Pay")}
      </ListSubheader>
      <ListItemLink
              to="/ZDGHistorico"
              primary={i18n.t("mainDrawer.listItems.ZDGHistorico")}
              icon={<SubjectIcon />}
      />
      <ListItemLink
              to="/ZDG"
              primary={i18n.t("mainDrawer.listItems.ZDG")}
              icon={<SendIcon />}
      />
      <ListItemLink
              to="/ZDGMedia"
              primary={i18n.t("mainDrawer.listItems.ZDGMedia")}
              icon={<BurstModeIcon />}
      />
      <ListItemLink
              to="/ZDGGroups"
              primary={i18n.t("mainDrawer.listItems.ZDGGroups")}
              icon={<GroupIcon />}
      />
      <ListItemLink
              to="/InstaDirect"
              primary={i18n.t("mainDrawer.listItems.Direct")}
              icon={<InstagramIcon />}
      />
      <ListItemLink
              to="/SMS"
              primary={i18n.t("mainDrawer.listItems.SMS")}
              icon={<TextsmsIcon />}
      />
      <ListItemLink
              to="/VoiceCall"
              primary={i18n.t("mainDrawer.listItems.VoiceCall")}
              icon={<PhoneInTalkIcon />}
      />
      <ListItemLink
              to="/ZDGAgendamento"
              primary={i18n.t("mainDrawer.listItems.ZDGAgendamento")}
              icon={<ScheduleIcon />}
      />
      <ListItemLink
              to="/ZDGChatbot"
              primary={i18n.t("mainDrawer.listItems.ZDGChatbot")}
        icon={<AccountTreeIcon />}
      />
      <Divider />
      <ListSubheader inset className={classes.listTitle} >
            {i18n.t("mainDrawer.listItems.LicenseComprar")}
      </ListSubheader>
      <ListItemLink className={classes.listWrap}
              to="/ZDGComunidade"
              primary={i18n.t("mainDrawer.listItems.LicenseComunidade")}
        icon={<PaymentIcon />}
      />
      <ListItemLink className={classes.listWrap}
              to="/ZDGPassaporte"
              primary={i18n.t("mainDrawer.listItems.LicensePassaporte")}
        icon={<PaymentIcon />}
      />
    </div>
  );
};

export default MainListItems;
