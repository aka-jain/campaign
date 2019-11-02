import React from 'react';

import './modal.scss';

function Modal(props) {
  return (
    <React.Fragment>
  	  {
  	  	props.isOpen ?
  	  	<div className="modal">
  	  		<div className="modal-overlay" onClick={props.onClose}></div>
  	  		<div className="modal-wrapper">
  	  			<div className="modal-body">{props.body}</div>
  	  		</div>
  	  	</div> : null
  	  }
    </React.Fragment>
  );
}

export default Modal;
