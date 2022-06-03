import React from 'react';
import { Link } from 'react-router-dom'; 
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipes } from '../../actions';
import style from './NewRecipe.module.css'

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
            if(input.name && input.resume && input.instructions && input.diets){
                alert("Recipe succesfully created!")
                dispatch(postRecipes(input));
                setInput({
                    name: "",
                    resume: "",
                    // rate: "",
                    healthy: "",
                    instructions: "",
                    image: "",
                    diets: []
                })
            
            } else  { 
                alert("there are missing inputs")
            }
        }
    //-------------------------------------


    return(
        <div className={style.background}>
           
           
            <section className={style.top}>
                <Link to='/home'>
                    <button className={style.btn}> let's go back</button>
                </Link>
                <h1 className={style.font}>add a new recipe!</h1>
            </section>

            <section className={style.formContainer}>
                <form onSubmit={(e)=>handleSubmit(e)} className={style.form}>
                    <div>
                        <label>name: </label>
                        <input className={errors.name ? style.labelsErr : style.labels} type="text" value={input.name} onChange={(e)=>handleChange(e)} name="name"/>
                        {errors.name && (<p className={style.errors}>{errors.name}</p>)}
                    </div>

                    <div>
                        <label>resume: </label>
                        <input className={errors.resume ? style.labelsErr : style.labels}  type="text" value={input.resume} onChange={(e) => handleChange(e)} name="resume"/>
                        {errors.resume && (<p className={style.errors}>{errors.resume}</p>)}
                    </div>

                    {/* <div>
                        <label>Rate: </label>
                        <input type="text" value={input.rate}/>
                    </div> */}

                    <div>
                        <label>healthy level: </label>
                        <input className={errors.healthy ? style.labelsErr : style.labels}  type="text" value={input.healthy} onChange={(e) => handleChange(e)} name="healthy"/>
                        {errors.healthy && (<p className={style.errors}>{errors.healthy}</p>)}
                    </div>

                    <div>
                        <label>image: </label>
                        <input className={style.labels} type="text" value={input.image} onChange={(e) => handleChange(e)} name="image"/>

                    </div>

                    <div>
                        <label>instructions: </label>
                        <input className={style.labels} type="text" value={input.instructions} onChange={(e) => handleChange(e)} name="instructions"/>
                    </div>

                    <div>
                        <label>diets</label>
                       <select className={errors.diets ? style.labelsErr : style.labels} onChange={(e)=>handleSelect(e)} >
                           <option value="-">-</option>
                           {
                               diets.map((diet) => {
                                   return <option value={diet.name}>{diet.name}</option>
                               })
                           }
                       </select>
                       {errors.diets && (<p className={style.errors}>{errors.diets}</p>)}
                    </div>
           { /* input.diets?.map es lo que va saliendo cada vez que selecciono un tipo de dietas */}
                    <div>
                        {input.diets?.map((diet)=>(
                            <div className={style.dietBackground}>
                                <div className={style.btnContain} key={diet}>
                                    <button className={style.xBtn} onClick={()=>handleDelete(diet)}>
                                        x            
                                    </button>
                                    <p>{diet}</p>
                                </div>
                            </div>
                            ))}
                    </div>
                    {
                    !input.name || !input.resume || !input.healthy || !input.diets.length ? 
                        <button className={style.btnNo} disabled type="submit">
                            create recipe!
                        </button>
                    : 
                        <button className={style.btn} type="submit">
                            create recipe!
                        </button>
                    }
                </form>
            </section>

            
        </div>
    )
}
