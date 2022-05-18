// import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetailById } from "../actions";

export default function DetailRecipe (props){

    const dispatch = useDispatch();
    const recipeDetail = useSelector( (state) => state.detail )

    useEffect(()=>{
        dispatch(getDetailById(props.match.params.id))
    }, [dispatch])


    return (
        <div>
            <section>
                {
                    // console.log(recipeDetail.instructions)
                    console.log(recipeDetail.resume)
                }
                {
                    recipeDetail.name ? 
                    <section>
                            <div>
                                <h2>{recipeDetail.name}</h2>
                                <img src={recipeDetail.image} alt=""/>
                                <h2>Rate: {recipeDetail.rate}</h2>
                                <h2>Healthy Level: {recipeDetail.healthy}</h2>
                            </div>
                            <div>
                                <h2>Resume: </h2>
                                <p>{recipeDetail.resume.replace(/<[^>]*>?/g, "")}</p>
                            </div>
                            <div>
                                <h2>Diets: </h2>
                                <p>{recipeDetail.diet.join(", ")}</p>
                            
                            </div>
                            <div>
                                <h2>Step to step: </h2>
                                <p>{recipeDetail.instructions}</p>
                            </div>
                        </section>
                    :
                    <h1>Loading...</h1>
                }
                
            </section>
        </div>
        
    )
}