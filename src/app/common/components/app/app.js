import React, { useState } from "react";
import Chatbot from '../../../../chatbot/chatbot';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Auth from "../auth/auth";
import "./app.css"

function App() {
  const [state, setState] = useState(false);

  function handleClick() {
    setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  window.onload = function () {
    setTimeout(qestions, 2000);
  };
  function qestions() {
    document.getElementById("qestions").className = "show animation";
  }

  return (
    <div className="container">
      {state.isToggleOn ?
        null :
        <div id="qestions" className="hidden">
          <span className="hide-questions-help">W czym możemy Ci pomóc?</span>
          <div className="arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      }
      {state.isToggleOn ?
        <Grid component={Paper} item xs={12} style={{ boxShadow: 'inset 0 0 5px rgb(224, 224, 224)' }}>
          <AppBar style={{ background: 'var(--primary)', height: '64px'}} position='static'>
            <Toolbar className="d-flex header-wrapper px-5" style={{ height: '64px' }}>
              <Typography variant="h4">
                Czat
              </Typography>
              <button className="navbar-icon d-flex" onClick={handleClick}><ExpandMoreIcon /></button>
              <div className="d-flex flex-grow-1 justify-content-end px-5"><Auth /></div>
            </Toolbar>
          </AppBar>
          <Chatbot />
        </Grid>
        : null}

        <button onClick={handleClick} className="hidden-button">
          {state.isToggleOn ? <div className="click-chat mobile-chat">
              <ArrowDropDownIcon />
            </div>
            : <div className="click-chat" style={{ position: "relative" }}>
              <ChatBubbleOutlineIcon />
              <div className="dots-cont">
                <span className="dot dot-1"></span>
                <span className="dot dot-2"></span>
                <span className="dot dot-3"></span>
              </div>
            </div>
          }
        </button>
      </div>
  )
}

export default App
