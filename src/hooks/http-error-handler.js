import { useState, useEffect } from 'react'



export default httpClient => {
    const [error, setError] = useState(null)

    const reqInterceptors = httpClient.interceptors.request.use(x => {
        setError(null)
        return x
    })
    const resInterceptors = httpClient.interceptors.response.use(res => res, x => {
    
            setError(x)
    
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptors)
            httpClient.interceptors.response.eject(resInterceptors)
        }
    }, [reqInterceptors, resInterceptors])

    const errorConfirmedHandler = () => {
        setError(null)
    }

    return  [error, errorConfirmedHandler]


}
