import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxillary";

const sideDrawer = (props) => {
  //conditionally set css - opening closing tag

  let attachedClasses = [classes.SideDrawer, classes.Closed];
  let display = props.show

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
    display = true
  }
  

  return (
    <Aux>
      <Backdrop 
        clicked={props.close} 
        show={display}
        />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
