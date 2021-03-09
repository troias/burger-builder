import classes from './Input.module.css'

const form = (props) => {

    let inputElement = null

    switch (props.elementType) {
        case ("input"):
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
        case ('select'):
            inputElement = (
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(x => {
                        return (
                            <option
                                key={x.value}
                                value={x.value}
                            >  {x.displayValue}
                            </option>
                        )
                    })}
                </select>
            )
            break;
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>
                {props.label}
            </label>
            {inputElement}
        </div>
    )
}

export default form

