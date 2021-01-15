import React,{Component} from 'react'
import Aux from '../../hoc/Auxi/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'
class BurgerBuilder extends Component{
    state = {
        purchasing:false,
    }
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
                    .map(igkey=>{
                        return ingredients[igkey];
                    }).reduce((sum,el)=>{
                        return sum+el;
                    },0);
        return sum>0;
    }
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }
    componentDidMount(){
        this.props.onInitIngredients();
    }
    render(){
        const disabledInfo = {
            ...this.props.ing
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.props.error?<p style={{textAlign:'center'}}>Unable to Load ingredients</p>:<Spinner/>;
        let orderSummary = null;
        if(this.props.ing){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing}/>
                    <BuildControls ingredientAdded={this.props.onIngredientAdded}
                                    ingredientRemoved={this.props.onIngredientRemoved}
                                    disabled={disabledInfo}
                                    price={this.props.price}
                                    purchasable={this.updatePurchaseState(this.props.ing)}
                                    ordered = {this.purchaseHandler}
                                    isAuthenticated={this.props.isAuthenticated}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ing}
                      purchaseCancelled={this.purchaseCancelHandler}
                      purchaseContinued={this.purchaseContinueHandler}
                      price={this.props.price}></OrderSummary>   ;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onPurchaseInit:() => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath:(path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));