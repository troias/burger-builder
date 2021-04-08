import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Forms/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router'
import { updateObject } from '../../shared/utility'
import { checkValidationHandler } from '../../shared/utility'

const initFormState = {
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Your Email",
            },
            value: "",
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: "",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
}

const Auth = props => {

    const { onSetAuthRedirectPath, buildingBurger, authRedirectPath } = props

    const [orderForm, setOrderform] = useState(initFormState)
    const [isSignUp, setSignUp] = useState(true)

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath()
        }
    }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath])

    const inputChangedHandler = (event, controlName) => {

        const updatedControls = updateObject(orderForm, {
            [controlName]: updateObject(orderForm[controlName], {
                value: event.target.value,
                valid: checkValidationHandler(event.target.value, orderForm[controlName].validation),
                touched: true
            })
        })
        setOrderform(updatedControls)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        props.onAuth(
            orderForm.email.value,
            orderForm.password.value,
            isSignUp
        )
    }

    const switchAuthModeHandler = () => {
        setSignUp(!isSignUp)
    }
    const formElementsArray = [];
    for (let x in orderForm) {
        formElementsArray.push({
            id: x,
            config: orderForm[x],
        });
    }

    let form = formElementsArray.map(formElement => {
        return (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.id}
                changed={(event) => inputChangedHandler(event, formElement.id)}
            />
        )
    })

    if (props.loading) {
        form = <Spinner />

    }

    let errorMessage = null

    if (props.error) {

        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null

    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth} >
            {errorMessage}
            {authRedirect}
            <form onSubmit={onSubmitHandler} >
                {form}
                <Button btnType="Success"> SUBMIT </Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger"> SWITCH TO {isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
            </Button>
        </div>
    );

}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath('/'))

    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.ing.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth)