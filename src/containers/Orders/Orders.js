import React from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
class Orders extends React.Component {
    state={
        orders:[],
        loading:false
    }
    componentDidMount(){
        axios.get('/orders.json')
            .then(res=>{
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }
                console.log(fetchedOrders);
                this.setState({orders:fetchedOrders,loading:false});
            })
            .catch(err=>{
                this.setState({loading:false});
            })
    }
    render(){
        return(
            <div>
                {
                    this.state.orders.map(order=>{
                       return <Order 
                            ingredients={order.ingredients} 
                            price={order.price}
                            key={order.id}/>
                    })
                }
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios);