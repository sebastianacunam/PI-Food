import { GET_RECIPES, 
    GET_DIETS, 
    GET_SEARCH,
    GET_DETAIL,
    FILTER_DIET, 
    ORDER_BY_NAME,
    ORDER_BY_HEALTHY,
    POST_RECIPE,

} from "../actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    allDiets: [],
    detail: []

}

function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state, 
                recipes: action.payload,
                allRecipes: action.payload
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload,
                allDiets: action.payload
            }
        case GET_SEARCH:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case FILTER_DIET:
           if(action.payload !== '-'){
               const recipesDietsFiltered = state.allRecipes.filter( d => d.diets.includes(action.payload))
               return {
                   ...state,
                   recipes: recipesDietsFiltered
               }
           } else {
               const allRecipes = state.allRecipes
               return{
                   ...state,
                   recipes: allRecipes
               }
           }
        case ORDER_BY_NAME:   
           let orderedArray = action.payload === "asc" ? 
                state.allRecipes.sort(function (a, b){
                  if (a.name > b.name){
                      return 1
                  }
                  if (a.name < b.name){
                      return -1
                  }
                  return 0
                }) 
            : 
                state.allRecipes.sort(function (a, b){
                    if (a.name > b.name){
                        return -1
                    }
                    if (a.name < b.name){
                        return 1
                    }
                    return 0
                })  
            const allRecipes = state.allRecipes
            
            if(action.payload !== '-') {
                return {
                    ...state,
                    recipes: orderedArray
                }
            } else {
                return {
                    ...state,
                    recipes: allRecipes
                }
            }
        case ORDER_BY_HEALTHY:
            let orderedArray2 = action.payload === "desc" ? 
                state.allRecipes.sort(function (a, b){
                  if (a.healthy > b.healthy){
                      return 1
                  }
                  if (a.healthy < b.healthy){
                      return -1
                  }
                  return 0
                }) 
            : 
                state.allRecipes.sort(function (a, b){
                    if (a.healthy > b.healthy){
                        return -1
                    }
                    if (a.healthy < b.healthy){
                        return 1
                    }
                    return 0
                })  
            const allRecipes2 = state.allRecipes
            
            if(action.payload !== '-') {
                return {
                    ...state,
                    recipes: orderedArray2
                }
            } else {
                return {
                    ...state,
                    recipes: allRecipes2
                }
            }
        case POST_RECIPE: 
            return{
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        default: 
            return state;
    }
}

export default rootReducer