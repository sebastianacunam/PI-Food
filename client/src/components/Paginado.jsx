import React from "react";

export default function Paginado({recipes, allRecipes, paginado}){
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(allRecipes/recipes); i++){
        pageNumbers.push(i)
    }

    return (
        <div>
            <nav>
                <ul>
                
                {/* <button className={estilos.pageButtons} onClick={ ()=> firstPage() }> Primera </button>
                <button className={estilos.pageButtons} onClick={ ()=> prevPage() }> Anterior </button>    */}
                    {pageNumbers &&
                    pageNumbers.map( number => (
                            <li key={number}>
                                <p onClick={()=> paginado(number)}>{number}</p>
                            </li>
                            ))} 
                {/* <button className={estilos.pageButtons} onClick={ ()=> nextPage() }> Siguiente </button>   
                <button className={estilos.pageButtons} onClick={()=> lastPage()}> Última </button> */}
                </ul>
             </nav>
        </div>
    )
}