import React from 'react'
import Aux from '../../../hoc/Auxi/Auxilary'
import Button from "../../UI/Button/Button";
class OrderSummary extends React.Component {

    componentWillUpdate(){
        console.log("[OrderSUmmary.js] componentWillUpdate");
    }
    
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igkey=>{
                return <li key={igkey}><span style={{textTransform:'capitalize'}}>
                        {igkey} :
                        </span>
                        {this.props.ingredients[igkey]}
                        </li>
            });
        return <Aux>
                <h3>Order Summary</h3>
                <p>A delicious burger with the following ingredients :</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout?</p>
                <p><strong>Price : {this.props.price.toFixed(2)}</strong></p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
    }
    
}

export default OrderSummary;