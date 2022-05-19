import React from 'react';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBar, getRecipes } from '../../actions';



export default function SearchBar (){

    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState("");

    function handleSearch(e){
        e.preventDefault();
        setRecipe(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchBar(recipe))
        setRecipe('');
    }

    function handleClick (e){
        e.preventDefault();
        dispatch(getRecipes())
    }
    
    return (
        <div>
            <input onChange={ (e) => handleSearch (e) } type="text" placeholder='Search ur recipe!' />
            <button onClick={ (e) => handleSubmit (e) } type="submit">Search</button>
            <button onClick={ (e) => handleClick (e) }>Cargar recetas de nuevo!</button>
        </div>
    )
}