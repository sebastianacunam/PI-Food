import React from "react";
import style from './Paginado.module.css'

export default function Paginado({recipes, allRecipes, paginado, firstPage, lastPage, prevPage, nextPage}){
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(allRecipes/recipes); i++){
        pageNumbers.push(i)
    }

    return (
        <div>
            <nav>
                <ul className={style.pagination}> 
                
                <button onClick={()=>firstPage()}>first</button>
                <button onClick={()=>lastPage()}>last</button>
                <button onClick={()=>prevPage()}>prev</button>
                <button onClick={()=>nextPage()}>next</button>


                {/* <button className={estilos.pageButtons} onClick={ ()=> firstPage() }> Primera </button>
                <button className={estilos.pageButtons} onClick={ ()=> prevPage() }> Anterior </button>    */}
                    {pageNumbers &&
                    pageNumbers.map( number => (
                            <li className={style.li} key={number}>
                                <p className={style.a} onClick={()=> paginado(number)}>{number}</p>
                            </li>
                            ))} 
                {/* <button className={estilos.pageButtons} onClick={ ()=> nextPage() }> Siguiente </button>   
                <button className={estilos.pageButtons} onClick={()=> lastPage()}> Última </button> */}
                </ul>
             </nav>
        </div>
    )
}