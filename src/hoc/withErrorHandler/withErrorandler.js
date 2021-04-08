import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxillary/Auxillary'
import React from 'react'
import usehttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clear] = usehttpErrorHandler(axios)
        return (
            <Aux>
                <Modal
                    show={error}
                    remove={clear}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )

    }
}

export default withErrorHandler