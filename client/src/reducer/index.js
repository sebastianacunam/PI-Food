import { GET_RECIPES, 
    GET_DIETS, 
    GET_SEARCH,
} from "../actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: []
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
                diets: action.payload
            }
        case GET_SEARCH:
            return {
                ...state,
                recipes: action.payload
            }
        default: 
            return state;
    }
}

export default rootReducer