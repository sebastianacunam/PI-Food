import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, filterDiet, orderByName, orderByHealthy } from '../actions';

import { Link } from 'react-router-dom';

import CardRecipe from './CardRecipe';
import SearchBar from './SearchBar';
import Paginado from './Paginado';

export default function Home(){
    //Estos son mis hooks de React-Redux
        const dispatch = useDispatch();
        const allRecipes = useSelector( (state) => state.recipes )
        const allDiets = useSelector ( (state) => state.diets)
    //-------------------------------------------
        //estado para el re-renderizado de az-za y el de .............
        const [order, setOrder] = useState("");
    //-------------------------------------------
        //variables para el paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipes] = useState(9)

    const lastRecipe = currentPage * recipes
    const firstRecipe = lastRecipe - recipes 
    const currentRecipes = allRecipes.slice(firstRecipe, lastRecipe)

    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }

    //-------------------------------------------
        useEffect(()=>{
            dispatch(getRecipes());  
            dispatch(getDiets());
        }, [dispatch])

    //-------------------------------------------
        //funciones manejadoras-----


        function handleFilterDiet(e) {
            e.preventDefault();
            dispatch(filterDiet(e.target.value));
            // setCurrentPage(1);
            // setOrder(`Ordenado: ${e.target.value}`);
        }

        function handleOrderByName (e) {
            e.preventDefault();
            dispatch(orderByName(e.target.value));
            setOrder(`Ordenado: ${e.target.value}`)
        }

        function handleOrderByHealthyScore (e) {
            e.preventDefault();
            dispatch(orderByHealthy(e.target.value));
            setOrder(`Ordenado: ${e.target.value}`)
        }
    //-------------------------------------------



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

                <section>
                    <div>
                        <h3>Filtrar por Dieta</h3>
                        <select onChange={(e)=> handleFilterDiet(e)}>
                            <option value="-">- </option>
                            {
                                allDiets?.map(d=>{
                                    return (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <h3>ORDEN ALFABÉTICO</h3>
                        <select onChange={(e)=> handleOrderByName(e)}>
                            <option value="-">-</option>
                            <option value="asc">Ascendent</option>
                            <option value="desc">Descendent</option>
                        </select>
                    </div>
                    
                    <div>
                        <h3>POR PUNTUACIÓN</h3>
                        <select onChange={(e)=> handleOrderByHealthyScore(e)}>
                            <option value="-">-</option>
                            <option value="asc">Ascendent</option>
                            <option value="desc">Descendent</option>
                        </select>
                    </div>
                
                </section>
                <Paginado 
                    recipes={recipes}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
                {
                    currentRecipes && currentRecipes.map( recipes => {
                        return (
                            <CardRecipe 
                            name={recipes.name} 
                            image={recipes.image} 
                            diets={recipes.diets} 
                            healthy={recipes.healthy}
                            // rate={recipes.rate} 
                            id={recipes.id}
                            key={recipes.id}/>
                        )
                    })
                }
            </div>
        )
} 