import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoggedInLayout from "../layout";
import Dashboard from "../pages/Dashboard/";
import Tickets from "../pages/Tickets/";
import Signup from "../pages/Signup/";
import Login from "../pages/Login/";
import Connections from "../pages/Connections/";
import Settings from "../pages/Settings/";
import Users from "../pages/Users";
import Contacts from "../pages/Contacts/";
import QuickAnswers from "../pages/QuickAnswers/";
import Queues from "../pages/Queues/";
import ZDG from "../pages/ZDG/";
import ZDGMedia from "../pages/ZDGMedia/";
import ZDGGroups from "../pages/ZDGGroups/";
import ZDGComunidade from "../pages/ZDGComunidade/";
import ZDGPassaporte from "../pages/ZDGPassaporte/";
import InstaDirect from "../pages/InstaDirect/";
import SMS from "../pages/SMS/";
import VoiceCall from "../pages/VoiceCall/";
import ZDGChatbot from "../pages/ZDGChatbot";
import ZDGHistorico from "../pages/ZDGHistorico";
import ZDGAgendamento from "../pages/ZDGAgendamento";
import { AuthProvider } from "../context/Auth/AuthContext";
import { WhatsAppsProvider } from "../context/WhatsApp/WhatsAppsContext";
import Route from "./Route";

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <WhatsAppsProvider>
            <LoggedInLayout>
              <Route exact path="/" component={Dashboard} isPrivate />
              <Route
                exact
                path="/tickets/:ticketId?"
                component={Tickets}
                isPrivate
              />
              <Route
                exact
                path="/connections"
                component={Connections}
                isPrivate
              />
              <Route exact path="/contacts" component={Contacts} isPrivate />
              <Route exact path="/users" component={Users} isPrivate />
              <Route
                exact
                path="/quickAnswers"
                component={QuickAnswers}
                isPrivate
              />
              <Route exact path="/Settings" component={Settings} isPrivate />
              <Route exact path="/Queues" component={Queues} isPrivate />
              <Route exact path="/ZDGChatbot" component={ZDGChatbot} isPrivate />
              <Route exact path="/ZDGAgendamento" component={ZDGAgendamento} isPrivate />
              <Route exact path="/ZDG" component={ZDG} isPrivate />
              <Route exact path="/ZDGMedia" component={ZDGMedia} isPrivate />
              <Route exact path="/ZDGGroups" component={ZDGGroups} isPrivate />
              <Route exact path="/InstaDirect" component={InstaDirect} isPrivate />
              <Route exact path="/SMS" component={SMS} isPrivate />
              <Route exact path="/VoiceCall" component={VoiceCall} isPrivate />
              <Route exact path="/ZDGHistorico" component={ZDGHistorico} isPrivate />
              <Route exact path="/ZDGComunidade" component={ZDGComunidade} isPrivate />
              <Route exact path="/ZDGPassaporte" component={ZDGPassaporte} isPrivate />
            </LoggedInLayout>
          </WhatsAppsProvider>
        </Switch>
        <ToastContainer autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
