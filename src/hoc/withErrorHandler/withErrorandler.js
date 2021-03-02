import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxillary/Auxillary'
import React from 'react'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                error: null
            }
        }
        componentWillMount() {
            axios.interceptors.request.use(x => {
                this.setState({
                    error: null
                })
                return x
            })
            axios.interceptors.response.use(res => res, x => {
                this.setState({
                    error: x
                })
            });
        }
        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }
        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        remove={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler