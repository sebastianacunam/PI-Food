import React from 'react';
import { Link } from 'react-router-dom'; 
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDiets } from '../actions';

function validate (input){
    let errors = {};
    
    if(!input.name) {
        errors.name = "This field is required"
    }

    if(!input.resume){
        errors.resume = "This field is required"
    }

    if(!input.rate){
        errors.rate = "This field is required"
    } else if (input.rate <= 100 || input.rate >= 0 ){
        errors.rate = "The rate can only be between 1 to 100"
    }

    if(!input.healthy){
        errors.healthy = "This field is required"
    }else if(input.healthy <= 100 || input.healthy >= 0 ){
        errors.healthy = "The healthy points can only be between 1 to 100"
    }

    if(!input.diets.length){
        errors.diets = "Select at least a type of diet"
    }
}

export default function NewRecipe (){

    const dispatch = useDispatch();
    const diets = useSelector ((state) => state.diets)
    console.log(diets)

    useEffect(()=>{
        dispatch(getDiets());
    }, [dispatch])

    //Estados..
        //Éste sería mi estado manejador de errores para el formulario.
    const [errors, setErrors] = useState({})
        //Éste sería mi estado para los inputs del form. 
    const [input, setInput] = useState({
        name: "",
        resume: "",
        rate: "",
        healthy: "",
        instructions: "",
        diets: []
    })



    return(
        <div>

            <section>
                <Link to='/home'>
                    <button>Home</button>
                </Link>
            </section>

            <section>
                <form>
                    <div>
                        <label>Name: </label>
                        <input type="text" value={input.name}/>
                    </div>

                    <div>
                        <label>Resume: </label>
                        <input type="text" value={input.resume}/>
                    </div>

                    <div>
                        <label>Rate: </label>
                        <input type="text" value={input.rate}/>
                    </div>

                    <div>
                        <label>Healthy Level: </label>
                        <input type="text" value={input.healthy}/>
                    </div>

                    <div>
                        <label>Image: </label>
                        <input type="text" value={input.image}/>
                    </div>

                    <div>
                        <label>Paso a paso: </label>
                        <input type="text" value={input.instructions}/>
                    </div>

                    <div>
                        <label>Tipo de Dieta:</label>
                       <select name="">
                           <option value="-">-</option>
                           {
                               diets.map((diet) => {
                                   return <option value={diet.name}>{diet.name}</option>
                               })
                           }
                       </select>
                    </div>

           { /* input.diets?.map es lo que va saliendo cada vez que selecciono un tipo de dietas */}
                    <div>
                        {
                            input.diets?.map((diet)=>{
                                return(
                                <div>
                                    <button>
                                        x            
                                    </button>
                                    <p>{diet}</p>
                                </div>)
                            })
                        }
                    </div>

                <button type="submit">Crear Receta!</button>
                </form>
            </section>
        </div>
    )
}