import React from "react";

import styles from './Header.module.scss'
import logo from '../../images/logo.png'

function HeaderView(props) {
  return (
    <header>
    	<div className="container">
	    	<div className={styles.logo}>
	    		<img src={logo} alt="logo"/>
	    	</div>
	    	
    	
    	<div>
        Language: <select onChange={(e) => props.handleLanguageChange(e)}>
          <option value="en">En- English</option>
          <option value="gm">Gm- German</option>
        </select>
        
      </div>
      </div>
    </header>
  );
}

export default HeaderView;
