import React from 'react';
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {

    //Life cycle events 
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show  || nextProps.children !== this.props.children
    }
    componentWillUpdate() {
        console.log('[Modal] Will update')
    }

    

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.remove} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opactity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
