import axios from 'axios';

export function getRecipes(){
    return async function (dispatch){
        const json = await axios('/recipes')
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

export function getDiets(){
    return async function (dispatch){
        const json = await axios('/types')
        return dispatch({
            type: GET_DIETS,
            payload: json.data
        })
    }
}

export function searchBar(name){
    return async function (dispatch){
        try {
            const json = await axios (`/recipes/?name=${name}`)
            return dispatch({
                type: GET_SEARCH,
                payload: json.data
            })            
        } catch (error) {
            alert('This recipe does not exist!')
        }
    }
}

export function getDetailById (id){
    return async function (dispatch){
        try {
            const json = await axios(`/recipes/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function filterDiet(payload){
    return {
        type: FILTER_DIET,
        payload
    }
}

export function orderByName (payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByHealthy(payload){
    return {
        type: ORDER_BY_HEALTHY,
        payload
    }
}

export function postRecipes(payload){
    return async function (dispatch){
        const json = await axios.post('/newRecipe', payload)
        return json
    }
}
//--------------------------------------------------------------------
    //defensa
export function filterByScore(payload){
    return {
        type: FILTER_BY_SCORE,
        payload
    }
}
//--------------------------------------------------------------------
export const GET_RECIPES = 'GET_RECIPES'; 
export const GET_DIETS = 'GET_DIETS'; 
export const GET_SEARCH = 'GET_SEARCH';
export const GET_DETAIL = 'GET_DETAIL';
export const FILTER_DIET = 'FILTER_DIET'; 
export const ORDER_BY_NAME = 'ORDER_BY_NAME'; 
export const ORDER_BY_HEALTHY = 'ORDER_BY_HEALTHY'; 
export const POST_RECIPE = 'POST_RECIPE';
export const FILTER_BY_SCORE = 'FILTER_BY_SCORE'; 