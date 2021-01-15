import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContactData/ContactData'
import {Route , Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }
    componentDidMount(){
        console.log("/checkout is accessed");
    }
    render(){
        let summary = <Redirect path="/" />
        let purchasedRedirect = this.props.purchased ? <Redirect path="/" /> : null
        if(this.props.ings){

            summary = <div>
                        {purchasedRedirect}
                        <CheckoutSummary ingredients={this.props.ings}
                                        checkoutCancelled={this.checkoutCancelledHandler}
                                        checkoutContinued={this.checkoutContinuedHandler}/>
                        <Route path={this.props.match.path + '/contact-data'} 
                            component={ContactData} />
                    </div>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
