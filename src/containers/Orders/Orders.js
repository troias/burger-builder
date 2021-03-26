import React from 'react';
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import instance from '../../axios-orders'
import * as actionCreators from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorandler'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends React.Component {

    componentDidMount() {
        this.props.onFetchedOrders(this.props.token)
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
            ))
        }

        return (
            <div>
                {orders}
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token, 
       
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchedOrders: (token) => dispatch(actionCreators.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, instance))