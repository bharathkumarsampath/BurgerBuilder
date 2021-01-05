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
                return res;
            },error=>{
                this.setState({error:error});
            })
            this.resInterceptor = axios.interceptors.response.use(res=>{
                return res;
            },error=>{
                this.setState({error:error});
            })
        }
        componentWillUnmount(){
            // axios.interceptors.eject(this.reqInterceptor);
            // axios.interceptors.eject(this.resInterceptor);
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
