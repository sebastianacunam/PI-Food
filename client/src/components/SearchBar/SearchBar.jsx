import React from 'react';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBar, getRecipes } from '../../actions';

import style from './SearchBar.module.css'

export default function SearchBar ({setCurrentPage}){

    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState("");

    function handleSearch(e){
        e.preventDefault();
        setRecipe(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        
        if(recipe.length){
            if(!recipe.replace(/ /g, "").match(/[^A-Za-z0-9]/)){
                dispatch(searchBar(recipe))
                setCurrentPage(1)
                setRecipe(" ");
            } else {
                alert('search cannot contain symbols')
            }
        }else {
            alert('search cannot be empty')
        }
        
    }

    function handleClick (e){
        e.preventDefault();
        dispatch(getRecipes())
    }
    
    return (
        <div className={style.container}>
            <div >
                <input className={style.input} onChange={ (e) => handleSearch (e) } type="text" placeholder='find a recipe!' />
                <button className={style.btns} onClick={ (e) => handleSubmit (e) } type="submit">search</button>
            </div>
            <div className={style.reloadContainer}>
                <button className={style.btns} onClick={ (e) => handleClick (e) }>reload your recipes!</button>
            </div>
        </div>
    )
}