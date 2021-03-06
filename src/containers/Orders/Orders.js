import React from 'react';
import Order from '../../components/Order/Order'
import instance from '../../axios-orders'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorandler'

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true
        }
    }

    componentDidMount() {
        instance.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, instance);