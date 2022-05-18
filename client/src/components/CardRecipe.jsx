import React from 'react';
import { Link } from 'react-router-dom';


export default function CardRecipe ({ name, image, diets, healthy, /*rate*/ id }){
    return (
        <div>
            <div>
                <Link to ={`/recipes/${id}`}>
                    <h2>{name}</h2>
                </Link>
                <img src={image} alt="img not found" width="250px" height="200px"/>
                {/* <h3>Rate: {rate}</h3> */}
                    <h3>HealthyScore: {healthy}</h3>
                    {
                        diets?.map (d => {
                            // console.log(diets)
                            return(
                                <div>
                                    <p key={id}>{d}</p>
                                </div>
                            )
                        })
                    }

            </div>
        </div>
    )
}