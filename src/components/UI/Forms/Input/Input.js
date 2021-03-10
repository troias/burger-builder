import classes from './Input.module.css'


const form = (props) => {
    
    let inputElement = null
    const inputClasses = [classes.inputElement]
    let validationError = null

    if (props.invalid && props.touched) {
        validationError= <p> Please enter a valid {props.valueType}</p>
    }

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ("input"):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
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
            {validationError}
            {inputElement}
        </div>
    )
}

export default form

