export const ADD_INGREDIENTS = "ADD_INGREDIENTS"
export const REMOVE_INGREDIENTS = "REMOVE_INGREDIENTS" 

export const PURCHASEABLE = 'PURCHASEABLE'
export const LOADING = 'LOADING'
export const ERROR = 'ERROR'

// updatePurchaseState = (ingredients) => {
//     //0 if no ingredients
//     const sum = Object.keys(ingredients)
//         .map((x) => {
//             return ingredients[x];

//             //returns an array of value
//         })
//         .reduce((sum, el) => {
//             return sum + el;
//         }, 0)
//          return sum > 0
//     };


// purchaseHandler = () => {
//     this.setState({
//       purchasing: true,
//     });
   
//   };


//   closeHandler = () => {
//     this.setState({
//       purchasing: false,
//     });
//   }