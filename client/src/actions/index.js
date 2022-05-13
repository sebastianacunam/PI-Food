import axios from 'axios';

export function getRecipes(){
    return async function (dispatch){
        const json = await axios('http://localhost:3001/recipes')
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

export function getDiets(){
    return async function (dispatch){
        const json = await axios('http://localhost:3001/types')
        return dispatch({
            type: GET_DIETS,
            payload: json.data
        })
    }
}

export function searchBar(name){
    return async function (dispatch){
        try {
            const json = await axios (`http://localhost:3001/recipes/?name=${name}`)
            return dispatch({
                type: GET_SEARCH,
                payload: json.data
            })            
        } catch (error) {
            alert('No existe tal receta!')
        }
    }
}

export const GET_RECIPES = 'GET_RECIPES'; 
export const GET_DIETS = 'GET_DIETS'; 
export const GET_SEARCH = 'GET_SEARCH';