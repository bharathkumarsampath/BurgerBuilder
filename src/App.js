import './App.css';
import React from 'react'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import Checkout from '../src/containers/Checkout/Checkout'
import {Route , Switch ,withRouter , Redirect} from 'react-router-dom'
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import *as actionTypes from './store/actions/index'
class App extends React.Component {
  componentDidMount(){
    console.log("ontryautosignup");
    this.props.onTryAutoSignUp();
  }
  render(){
    let routes = (
          <Switch>
              <Route path="/auth" component={Auth}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Redirect to="/"/>
            </Switch>
    )
    if(this.props.isAuthenticated){
      routes = <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
    </Switch>
    }
    return (
      <div className="App">
          <Layout>
            {routes}
          </Layout>
      </div>
    );
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp:()=>dispatch(actionTypes.authCheckState())
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token!==null
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
