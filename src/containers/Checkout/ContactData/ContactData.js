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
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        }, 
                        {
                            value: 'Cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]

                },
                value: '',
            },
        },

        loading: false,
    }

    orderhandler = (event) => {
        event.preventDefault()

        this.setState({
            loading: true
        })
        // alert("you continued")
        const obj = {
            ingredients: this.props.ingredients,
            price: this.props.price,

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

    render() {
        let form = (
            <form>
                <Form elementType="..." elementConfig="..."  value="..." />
                
                <Button
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