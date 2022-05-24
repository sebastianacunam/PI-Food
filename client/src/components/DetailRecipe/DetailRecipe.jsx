// import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetailById } from "../../actions";
import { Link } from 'react-router-dom';

import style from './DetailRecipe.module.css'

export default function DetailRecipe (props){

    const dispatch = useDispatch();
    const recipeDetail = useSelector( (state) => state.detail )

    useEffect(()=>{
        dispatch(getDetailById(props.match.params.id))
    }, [dispatch])


    return (
        <div className={style.background}>
            <section className={style.top}>
                {
                    console.log(recipeDetail.instructions)
                    // console.log(recipeDetail)
                }
                {
                    recipeDetail.name ? 
                    <section className={style.container}>
                            <div >
                                <h2>{recipeDetail.name}</h2>
                                <div>
                                {
                                    recipeDetail.image? 
                                    <img className={style.img} src={recipeDetail.image} alt=""/>
                                    :
                                    <img className={style.img} src={"https://us.123rf.com/450wm/belchonock/belchonock1906/belchonock190602030/124303341-mujer-con-plato-vac%C3%ADo-en-la-mesa-de-madera-vista-superior.jpg?ver=6"}/>
                                }
                                </div>

                                {/* <h2>Rate: {recipeDetail.rate}</h2> */}
                                <h2>healthy level: {recipeDetail.healthy}</h2>
                            </div>
                            <div className={style.div}>
                                <h2>resume </h2>
                                <p>{recipeDetail.resume.replace(/<[^>]*>?/g, "")}</p>
                            </div>
                            <div className={style.div}>
                                <h2>diets</h2>
                                <p>{recipeDetail.diet ? recipeDetail.diet.length ? recipeDetail.diet.join(", ") : <p>this recipe has not any diets to show</p> : recipeDetail.diets.map(e=>e.name).join(", ")}</p>
                             
                            </div>
                            <div className={style.div}>
                                <h2>instructions to follow </h2>
                                {/* {console.log(recipeDetail.instructions)} */}
                                {recipeDetail.instructions.length ? 
                                <p>{recipeDetail.instructions}</p> :
                                <p>This recipe does not have instructions to follow</p>}
                            </div>
                            <div className={style.divBtn} >
                                <Link to='/home'>
                                    <button className={style.btn}>go home!</button>
                                </Link>
                            </div>
                        </section>
                        
                    :
                    <h1>Loading...</h1>
                }
                
            </section>
        </div>
        
    )
}