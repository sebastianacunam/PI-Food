import React from 'react';
import { Link } from 'react-router-dom'; 
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipes } from '../../actions';

//función validadora.
function validate (input){
    let errors = {};
    const onlyNumber = "^[0-9]+$"
    if(!input.name) {
        errors.name = "This field is required"
    }

    if(!input.resume){
        errors.resume = "This field is required"
    }

    // if(!input.rate){
    //     errors.rate = "This field is required"
    // } else if (input.rate <= 100 || input.rate >= 0 ){
    //     errors.rate = "The rate can only be between 1 to 100"
    // }

    if(!input.healthy){
        errors.healthy = "This field is required"
    }else if(input.healthy > 100 || input.healthy <= 0 ){
        errors.healthy = "The healthy points can only be between 1 to 100"
    } else if (!input.healthy.match(onlyNumber)){
        errors.healthy = "Must be numbers"
    }

    if(!input.diets.length){
        errors.diets = "Select at least a type of diet"
    }

    return errors
}

export default function NewRecipe (){

    const dispatch = useDispatch();
    const diets = useSelector ((state) => state.diets)
    // console.log(diets)

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
        // rate: "",
        healthy: "",
        instructions: "",
        image: "",
        diets: []
    })
    // console.log(input)

    //-------------------------------------
        //Funciones manejadoras! 
            //con esta función manejo el estado de todos los inputs y los respectivos errores 
        function handleChange(e){
            setInput({
                ...input, 
                [e.target.name]: e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }
        //------------------------------------
            //con ésta, verifico si INCLUYO el tipo de dieta en el array para el post de las recetas!!! 
            //meaning, que esta función solo sirve para select de tipos de dietas! 
        function handleSelect(e){
            if(!input.diets.includes(e.target.value) && e.target.value !== "-"){
                setInput({
                    ...input,
                    diets: [...input.diets, e.target.value]
                });
                setErrors(validate({
                    ...input,
                    diets: [...input.diets, e.target.value]
                }));
            }
        }

        function handleDelete(diet){
            setInput({
                ...input,
                diets: input.diets.filter((d) => d !== diet),
            });
            setErrors(validate({
                ...input,
                diets: input.diets.filter((d) => d !== diet),
              }));
        }

        function handleSubmit(e){
            e.preventDefault();
            dispatch(postRecipes(input));
            alert("Recipe succesfully created!")
            setInput({
                name: "",
                resume: "",
                // rate: "",
                healthy: "",
                instructions: "",
                image: "",
                diets: []
            })
        }
    //-------------------------------------


    return(
        <div>

            <section>
                <Link to='/home'>
                    <button>Home</button>
                </Link>
            </section>

            <section>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <label>Name: </label>
                        <input type="text" value={input.name} onChange={(e)=>handleChange(e)} name="name"/>
                        {errors.name && (<p>{errors.name}</p>)}
                    </div>

                    <div>
                        <label>Resume: </label>
                        <input type="text" value={input.resume} onChange={(e) => handleChange(e)} name="resume"/>
                        {errors.resume && (<p>{errors.resume}</p>)}
                    </div>

                    {/* <div>
                        <label>Rate: </label>
                        <input type="text" value={input.rate}/>
                    </div> */}

                    <div>
                        <label>Healthy Level: </label>
                        <input type="text" value={input.healthy} onChange={(e) => handleChange(e)} name="healthy"/>
                        {errors.healthy && (<p>{errors.healthy}</p>)}
                    </div>

                    <div>
                        <label>Image: </label>
                        <input type="text" value={input.image} onChange={(e) => handleChange(e)} name="image"/>

                    </div>

                    <div>
                        <label>Paso a paso: </label>
                        <input type="text" value={input.instructions} onChange={(e) => handleChange(e)} name="instructions"/>
                    </div>

                    <div>
                        <label>Tipo de Dieta:</label>
                       <select onChange={(e)=>handleSelect(e)} >
                           <option value="-">-</option>
                           {
                               diets.map((diet) => {
                                   return <option value={diet.name}>{diet.name}</option>
                               })
                           }
                       </select>
                       {errors.diets && (<p>{errors.diets}</p>)}
                    </div>
           { /* input.diets?.map es lo que va saliendo cada vez que selecciono un tipo de dietas */}
                    <div>
                        {input.diets?.map((diet)=>(
                                <div key={diet}>
                                    <button onClick={()=>handleDelete(diet)}>
                                        x            
                                    </button>
                                    <p>{diet}</p>
                                </div>
                            ))}
                    </div>
                    {
                    !input.name || !input.resume || !input.healthy || !input.diets.length ? 
                        <button disabled type="submit">
                            Create Recipe!
                        </button>
                    : 
                        <button type="submit">
                            Create Recipe!
                        </button>
                    }
                </form>
            </section>
        </div>
    )
}