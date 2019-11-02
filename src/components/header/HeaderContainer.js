import React, { Component } from "react";

import HeaderView from './HeaderView'

class HeaderContainer extends Component {
  state = {
    language: 'en'
  }
  handleLanguageChange(e) {
    e.preventDefault();
    let lang = e.target.value;
    this.setState(prevState => ({
      language: lang
    }), () => {
      this.props.getLanguage(lang);
    })
  }
  render() {
    return (
      <HeaderView 
      handleLanguageChange={(e) => this.handleLanguageChange(e)}
    />
    );
  }
}

export default HeaderContainer;
