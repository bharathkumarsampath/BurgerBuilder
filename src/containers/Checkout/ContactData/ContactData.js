import React from 'react'
import Button from '../../../components/UI/Button/Button'
import './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends React.Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const orders = {
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'bharath',
                address:{
                    street:'teststreet',
                    zipCode:'23748'
                },
                email:'test@test.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders',orders)
            .then(response=>{
                this.setState({loading:false,purchasing:false});
                console.log(response);
                this.props.history.push('/');
            })
            .catch(error=>{
                this.setState({loading:false,purchasing:false});
                console.log(error);
            })
    }
    render(){
        let form = <form>
        <input type="text" name="name" placeholder="Your Name"></input>
        <input type="email" name="email" placeholder="Your email"></input>
        <input type="text" name="street" placeholder="Street"></input>
        <input type="text" name="postal" placeholder="Postal"></input>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>;
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className="ContactData">
                    <h4>Enter your contact data</h4>
                    {form}
            </div>
        );
    }
}

export default ContactData;
