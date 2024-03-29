import React from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends React.Component {
    componentDidMount(){
        this.props.onFetchedOrders(this.props.token,this.props.userId);
    }
    
    render(){
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = this.props.orders.map(order=>{
                return <Order 
                     ingredients={order.ingredients} 
                     price={order.price}
                     key={order.id}/>
             })
        }
        return(
            <div>
                {
                  orders  
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onFetchedOrders:(token,userId) => dispatch(actionTypes.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));