import * as actionCreators from '../../../store/actions/index'


export const mapDispatchToProps = dispatch => {

    return {
        onAddIngredients: (ingName) => dispatch(actionCreators.addIngredients(ingName)),
        onRemoveIngredients: (ingName) => dispatch(actionCreators.removeIngredients(ingName)),
        addInitialIngredients: () => dispatch (actionCreators.addInitialIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()), 
        onSetAuthRedirect: (path) => dispatch(actionCreators.setAuthRedirectPath(path)),
    }
}



  
