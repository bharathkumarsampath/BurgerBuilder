import React , {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actionCreators from '../../store/actions/index'
class Auth extends Component {
    state = {
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                value:'',
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'password'
                },
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                value:'',
                touched:false
            },
        },
        isSignUp:false
    }
    checkValidity(value,rules){
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim()!=='' && isValid;
        }

        if(rules.minLength){
            isValid = value.length>=rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length<=rules.maxLength && isValid;
        }

        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event,controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName]),
                touched:true
            }
        };
        this.setState({controls:updatedControls});

    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }
    switchAuthModeHandler = () => {
        this.setState(prevState=>{
            return {
                ...prevState,
                isSignUp:!prevState.isSignUp
            }
        })
    }
    componentDidMount(){
        if(!this.props.burgerBuilding && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }
    render(){
        let formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement=>{
                    return <Input
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        key={formElement.id}
                        touched={formElement.config.touched}
                    />
                })
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect path={this.props.authRedirectPath}/>
        }
            
        return (
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={this.onSubmitHandler}>
                    {errorMessage}
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    
                </form>
                <Button 
                        btnType="Danger"
                        clicked={this.switchAuthModeHandler}
                        >SWITCH TO {this.state.isSignUp?"SIGNIN":"SIGNUP"}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        authRedirectPath:state.auth.authRedirectPath,
        burgerBuilding:state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth:(email,password,isSignUp) => dispatch(actionCreators.auth(email,password,isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(actionCreators.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);