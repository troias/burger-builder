import classes from './Backdrop.module.css'

const backDrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.removed}> </div> : null
);

export default backDrop