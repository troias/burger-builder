import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import instance from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Form from '../../../components/UI/Forms/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 6
                },

                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },

                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                    
                        {
                            value: 'fastest',
                            displayValue: 'fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'cheapest'
                        }
                    ]
                },
                value: 'cheapest',
                validation: {
                    
                },
                valid: true,
            },
        },
        formIsValid: false,
        loading: false,
    }

    orderhandler = (event) => {
        event.preventDefault()

        this.setState({
            loading: true
        })
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        // alert("you continued")
        const obj = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData

        }
        instance.post('/orders.json', obj).then(x => {
            this.setState({
                loading: false,
            })
            this.props.history.push('/')
        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false,

            })
        })
    }
    changedHandler = (event, id) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //copy of nested objs
        const updatedOrderFormEl = {
            ...updatedOrderForm[id]
        }
        updatedOrderFormEl.value = event.target.value;
        updatedOrderFormEl.valid = this.checkValidationHandler(updatedOrderFormEl.value, updatedOrderFormEl.validation)
        updatedOrderFormEl.touched = true
        updatedOrderForm[id] = updatedOrderFormEl;

        let formIsValid = true

        for (let x in updatedOrderForm) {
            formIsValid = updatedOrderForm[x].valid && formIsValid
        }
        console.log(formIsValid)
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    checkValidationHandler(value, validation) {
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        if (validation.maxLength) {
            isValid = value.length <= validation.maxLength && isValid;
        }


        return isValid
    }

    render() {
        const orderFormEl = [];
        for (let x in this.state.orderForm) {
            orderFormEl.push({
                id: x,
                config: this.state.orderForm[x]
            })
        }

        let form = (
            <form onSubmit={this.orderhandler}>
                {orderFormEl.map(x => {
                    return (
                        <Form
                            key={x.id}
                            elementType={x.config.elementType}
                            elementConfig={x.config.elementConfig}
                            value={x.config.value}
                            invalid={!x.config.valid}
                            shouldValidate={x.config.validation}
                            touched={x.config.touched}
                            valueType={x.id}
                            changed={(event) => this.changedHandler(event, x.id)}
                        />
                    )
                })}
                <Button
                    disabled={!this.state.formIsValid}
                    btnType="Success"
                    clicked={this.orderhandler}
                >Order</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact Data </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;