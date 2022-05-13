import React from 'react';
import { useEffect, /*useState*/ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets } from '../actions';

import { Link } from 'react-router-dom';

import CardRecipe from './CardRecipe';
import SearchBar from './SearchBar';

export default function Home(){
    //Estos son mis hooks de React-Redux
        const dispatch = useDispatch();
        const allRecipes = useSelector( (state) => state.recipes )
    //-------------------------------------------
        useEffect(()=>{
            dispatch(getRecipes());  
            dispatch(getDiets());
        }, [dispatch])

        return (
            <div>
                <div>
                    <h1>we❤food</h1>
                    <SearchBar/>
                    
                    <Link to='/recipe'>
                        <button>Crear Receta</button>
                    </Link>
                    <Link to='/'>
                        <button>Volver</button>
                    </Link>
                </div>

                {
                    allRecipes && allRecipes.map( recipes => {
                        return (
                            <CardRecipe 
                            name={recipes.name} 
                            image={recipes.image} 
                            diets={recipes.diets} 
                            rate={recipes.rate} 
                            id={recipes.id}
                            key={recipes.id}/>
                        )
                    })
                }
            </div>
        )
} 