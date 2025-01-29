import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, filterDiet, orderByName, orderByHealthy, filterByScore } from '../../actions';

import { Link } from 'react-router-dom';

import CardRecipe from '../CardRecipe/CardRecipe';
import SearchBar from '../SearchBar/SearchBar';
import Paginado from '../Paginado/Paginado';
import { ClipLoader } from 'react-spinners'; // Importar el loader
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
    const [loading, setLoading] = useState(true); // Estado para el loader

    const lastRecipe = currentPage * recipes
    const firstRecipe = lastRecipe - recipes 
    const currentRecipes = allRecipes.slice(firstRecipe, lastRecipe)

    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }

    //-------------------------------------------
    useEffect(() => {
        // Función asíncrona para cargar los datos
        const fetchData = async () => {
            try {
                await dispatch(getRecipes()); // Espera a que se carguen las recetas
                await dispatch(getDiets()); // Espera a que se carguen las dietas
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Desactivar el loader cuando los datos estén listos
            }
        };

        fetchData(); // Llamar a la función asíncrona
    }, [dispatch]);
    //-------------------------------------------
        //funciones manejadoras-----


        function handleFilterDiet(e) {
            e.preventDefault();
            dispatch(filterDiet(e.target.value));
            setCurrentPage(1);
            // setOrder(`Ordenado: ${e.target.value}`);
        }
        function handleByScore(e) {
            e.preventDefault();
            dispatch(filterByScore(e.target.value));
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
                    <div className={style.searchBarContainer}>
                        <h1 className={style.filtersFont}>we❤food</h1>
                        <SearchBar setCurrentPage={setCurrentPage}/>
                    </div>
                    <div className={style.searchBarContainer2}>
                        <Link to='/'>
                            <button className={style.btnMenu1}>go back!</button>
                        </Link>
                        <Link to='/recipe'>
                            <button className={style.btnMenu1}>create recipe</button>
                        </Link>
                    </div>
                    
                </div>
                
                {
                loading ? ( // Mostrar el loader si loading es true
                <div className={style.loaderContainer}>
                    <div className={style.loaderInnerContainer}>
                        <ClipLoader color="#36d7b7" size={100} />
                        <h1 className={style.filtersFont}>Esto puede tardar unos minutos...</h1>
                    </div>
                </div>
            ) : (
                <>
                <section className={style.menu2}>
                {/*------------------------------------------------------------------------------------------------------*/}
                    {/* defensa */}
                    <div>
                        <h3 className={style.filtersFont}>filter by score</h3>
                        <select className={style.each} onChange={(e)=> handleByScore(e)}>
                            <option value="-">- </option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="75">75</option>
                            <option value="100">100</option>
                         
                        </select>
                    </div>
                {/*------------------------------------------------------------------------------------------------------*/}
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
                    {currentRecipes && currentRecipes.map(recipe => (
                        <CardRecipe
                            name={recipe.name}
                            image={recipe.image}
                            diets={recipe.diets}
                            healthy={recipe.healthy}
                            id={recipe.id}
                            key={recipe.id}
                        />
                    ))}
                    <Paginado
                        recipes={recipes}
                        allRecipes={allRecipes.length}
                        paginado={paginado}
                    />
                    <div className={style.containerPageIdentifier}>
                        <h3 className={style.pageIdentifier}>Page: {currentPage}</h3>
                    </div>
                </>
            )}
            </div>
        )
} 