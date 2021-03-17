import * as actionTypes from '../../../store/actions/actions'

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



  
  // componentDidMount() {
  
  //   instance.get('/ingrediens.json').then(x => {
  //     this.setState({
  //       ingredients: x.data
  //     })
  //   }).catch(err => {
  //     this.setState({
  //       error: true
  //     })
  //   })
  // }