import reducer from './auth'
import * as actionTypes from "../actions/actionTypes";
import * as utilityFunctions from './utilityFunctions/AuthUtilityFunctions'



describe('<auth Reducer />', () => {


    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userID: null,
            error: null,
            loading: false,
            LoggedIn: false,
            authRedirectPath: '/'
        })
    })

    it('should store the token upon authentication', () => {
        expect(reducer({
            token: null,
            userID: null,
            error: null,
            loading: false,
            LoggedIn: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'action.idToken',
            userID: 'action.userId', 
            loading: false, 
            error: null
        }))
    })


})