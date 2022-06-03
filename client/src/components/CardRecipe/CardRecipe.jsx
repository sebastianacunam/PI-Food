import React from 'react';
import { Link } from 'react-router-dom';
import style from './CardRecipe.module.css'

export default function CardRecipe ({ name, image, diets, healthy, /*rate*/ id }){
    return (
        <div className={style.recipeCard}>
            <div className={style.border}>
                <Link to ={`/recipes/${id}`}>
                    <h3 className={style.h3}>{name}</h3>
                </Link>
                <div className={style.subcontainer}>
                        <Link to ={`/recipes/${id}`}>
                                <div>
                                    {
                                        image ? 
                                        <img className={style.img} src={image} alt="img not found"/>
                                        :
                                        <img className={style.img} src={"https://us.123rf.com/450wm/belchonock/belchonock1906/belchonock190602030/124303341-mujer-con-plato-vac%C3%ADo-en-la-mesa-de-madera-vista-superior.jpg?ver=6"} alt="img not found"/>
                                    }
                                </div>
                        </Link>
                    <div className={style.subsubcont}> 
                        {/* <h3>Rate: {rate}</h3> */}
                        <h4>HealthyScore {healthy}</h4>
                        {
                            diets?.map (d => {
                                // console.log(diets)
                                return(
                                    <div className={style.diets}>
                                        <h5 key={id}>{d}</h5>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>    
            </div>
        </div>
    )
}