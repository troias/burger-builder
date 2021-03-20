import * as actionTypes from '../../../store/actions/actionTypes'

export const mapDispatchToProps = dispatch => {

    return {
        onAddIngredients: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENTS,
            ingredientName: ingName, 
            
        }),
        onRemoveIngredients: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENTS,
            ingredientName: ingName
        }),
        updatePurcaseState: (ing = 0) => ({
            type: actionTypes.PURCHASEABLE, 
            ingredients: ing

        }), 
        onLoading: (ing) => ({
            type: actionTypes.LOADING, 
            
        }),
        onERROR: (ing) => ({
            type: actionTypes.ERROR, 
            
        })

    }
}



  
