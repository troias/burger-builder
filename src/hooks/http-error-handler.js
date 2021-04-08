import { useState, useEffect } from 'react'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null)

        useEffect(() => {

        }, [])

        const reqInterceptors = axios.interceptors.request.use(x => {
            setError(null)
            return x
        })
        const resInterceptors = axios.interceptors.response.use(res => res, x => {
        
                setError(x)
        
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptors)
                axios.interceptors.response.eject(resInterceptors)
            }
        }, [reqInterceptors, resInterceptors])

        const errorConfirmedHandler = () => {
            setError(null)
        }

        return (
            <Aux>
                <Modal
                    show={error}
                    remove={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )

    }
}
