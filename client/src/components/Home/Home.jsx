import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, filterDiet, orderByName, orderByHealthy } from '../../actions';

import { Link } from 'react-router-dom';

import CardRecipe from '../CardRecipe/CardRecipe';
import SearchBar from '../SearchBar/SearchBar';
import Paginado from '../Paginado/Paginado';

import style from './Home.module.css'

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
            setCurrentPage(1);
            // setOrder(`Ordenado: ${e.target.value}`);
        }

        function handleOrderByName (e) {
            e.preventDefault();
            dispatch(orderByName(e.target.value));
            setCurrentPage(1);
            setOrder(`Ordenado: ${e.target.value}`);
        }

        function handleOrderByHealthyScore (e) {
            e.preventDefault();
            dispatch(orderByHealthy(e.target.value));
            setCurrentPage(1);
            setOrder(`Ordenado: ${e.target.value}`);
        }
    //-------------------------------------------



        return (
            <div className={style.background}>
                <div className={style.menu1}>
                    <h1 className={style.filtersFont}>we❤food</h1>
                    <SearchBar setCurrentPage={setCurrentPage}/>
                    <Link to='/'>
                        <button className={style.btnMenu1}>go back!</button>
                    </Link>
                    <Link to='/recipe'>
                        <button className={style.btnMenu1}>create recipe</button>
                    </Link>
                </div>

                <section className={style.menu2}>
                    <div>
                        <h3 className={style.filtersFont}>filter by diet</h3>
                        <select className={style.each} onChange={(e)=> handleFilterDiet(e)}>
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
                        <h3 className={style.filtersFont}>by aplhabetic order</h3>
                        <select className={style.each} onChange={(e)=> handleOrderByName(e)}>
                            <option value="-">-</option>
                            <option value="asc">from a to z</option>
                            <option value="desc">from z to a</option>
                        </select>
                    </div>
                    
                    <div>
                        <h3 className={style.filtersFont}>by healthy score</h3>
                        <select className={style.each} onChange={(e)=> handleOrderByHealthyScore(e)}>
                            <option value="-">-</option>
                            <option value="asc">ascendent</option>
                            <option value="desc">descendent</option>
                        </select>
                    </div>
                </section>
                <Paginado 
                    recipes={recipes}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
                <div className={style.containerPageIdentifier}>
                    <h3 className={style.pageIdentifier}>Page: {currentPage}</h3>
                </div>
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