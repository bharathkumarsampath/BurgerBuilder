import React from 'react'
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import './sideDrawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxi/Auxilary'
const sideDrawer = (props) => {
    let attachedClasses = ["SideDrawer","Close"];
    if(props.open){
        attachedClasses = ["SideDrawer","Open"];
    }
    return (
        <Aux>
        <BackDrop show={props.open} modelClosed={props.closed}></BackDrop>
        <div className={attachedClasses.join(' ')}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>
    );
}

export default sideDrawer;