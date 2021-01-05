import React from 'react'
import './Modal.css'
import Aux from '../../../hoc/Auxi/Auxilary'
import Backdrop from '../Backdrop/Backdrop'
class Modal extends React.Component {

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!==this.props.show || nextProps.children!==this.props.children;
    }
    componentDidUpdate(){
        console.log("[Modal.js] componentDidUpdate");
    }
    render(){
        return (
            <Aux>
                <Backdrop show={this.props.show} modelClosed={this.props.modelClosed}/>
                <div className="Modal"
                    style={{
                        transform:this.props.show ? 'translateY(0)':'translateY(-100vh)',
                        opacity:this.props.show ? '1':'0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
} 

export default Modal;