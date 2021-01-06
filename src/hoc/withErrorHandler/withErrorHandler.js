import React from 'react'
import Aux from "../Auxi/Auxilary";
import Modal from "../../components/UI/Modal/Modal";
const withErrorHandler = (WrapperComponent,axios) => {
    return class extends React.Component {
        state = {
            error:null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(res=>{
                console.log( "req => " ,res);
                return res;
            },error=>{
                console.log("req error => " ,error);
                this.setState({error:error});
            })
            this.resInterceptor = axios.interceptors.response.use(res=>{
                console.log("res => " ,res);
                return res;
            },error=>{
                console.log("res error => " ,error);
                this.setState({error:error});
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({error:false});
        }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} modelClosed={this.errorConfirmedHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrapperComponent {...this.props}></WrapperComponent>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;
