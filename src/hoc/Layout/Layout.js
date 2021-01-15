import React from 'react';
import Aux from '../Auxi/Auxilary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import './Layout.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
class Layout  extends React.Component {
    state={
        showSideBar:false
    }
    closeSideBarHandler= () =>{
        this.setState({showSideBar:false});
    }
    
    openSideBarHandler= () =>{
        this.setState({showSideBar:true});
    }
    sideBarToggleHandler = () => {
        this.setState((prevState)=>{
            return ({showSideBar:!prevState.showSideBar});
        })
    }
    render(){
        return(
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} openSideBar={this.openSideBarHandler} drawerToggleClicked={this.sideBarToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideBar} closed={this.closeSideBarHandler}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);