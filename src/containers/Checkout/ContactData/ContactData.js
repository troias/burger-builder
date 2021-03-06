import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import instance from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: "",
        email: '',
        address: {
            street: '',
            postalCode: '',
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
            customer: {
                name: 'troy flavell',
                address: {
                    street: `4 god place`,
                    zip: 3216,
                    country: 'Germany'

                },
                email: "test@test.com"
            },
            deliveryMethod: "train"
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
            <input className={classes.input} type="text" name="name" placeholder="Your name" />
            <input className={classes.input} type="email" name="name" placeholder="Your email" />
            <input className={classes.input} type="text" name="Street" placeholder="Street" />
            <input className={classes.input} type="text" name="postal" placeholder="Postal Code" />
            <Button
                btnType="Success"
                clicked={this.orderhandler}
            >Order</Button>
        </form>
        )
        if (this.state.loading) {
            form = <Spinner/> 
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