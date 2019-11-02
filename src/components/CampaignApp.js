import React, { Component } from "react";

import HeaderContainer from './header/HeaderContainer';
import CampaignContainer from './campaign/CampaignContainer';
import "react-datepicker/dist/react-datepicker.css";

class CampaignApp extends Component {
  state = {
    language: 'en'
  }

  getLanguage(language){
    this.setState((prevState) => ({
      language
    }))
  }
  render() {
    return (
      <React.Fragment>
        <HeaderContainer getLanguage={(language) => this.getLanguage(language)}/>
        <CampaignContainer language={this.state.language}/>
      </React.Fragment>
    );
  }
}

export default CampaignApp;
