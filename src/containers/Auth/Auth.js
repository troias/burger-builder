import React from 'react';
import Input from '../../components/UI/Forms/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router'
import { updateObject }  from '../../shared/utility'
import { checkValidationHandler} from '../../shared/utility'


class Auth extends React.Component {
    state = {
        orderForm: {
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
        },
        isSignUp: true

    }


    inputChangedHandler = (event, orderForm) => {

        const updatedControls = updateObject(this.state.orderForm, {
            [orderForm]: updateObject(this.state.orderForm[orderForm], {
                value: event.target.value,
                valid: checkValidationHandler(event.target.value, this.state.orderForm[orderForm].validation),
                touched: true
            }) 
        } )
        this.setState({
            orderForm: updatedControls
        })
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(
            this.state.orderForm.email.value,
            this.state.orderForm.password.value,
            this.state.isSignUp
        )
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    render() {

        const formElementsArray = [];
        for (let x in this.state.orderForm) {
            formElementsArray.push({
                id: x,
                config: this.state.orderForm[x],
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
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />


            )
        })

        if (this.props.loading) {
            form = <Spinner />

        }

        let errorMessage = null

        if (this.props.error) {

            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
       


        return (
            <div className={classes.Auth} >
                {errorMessage}
                {authRedirect}
                <form onSubmit={this.onSubmitHandler} >
                    {form}
                    <Button btnType="Success"> SUBMIT </Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger"> SWITCH TO {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
                </Button>
            </div>
        );
    }
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