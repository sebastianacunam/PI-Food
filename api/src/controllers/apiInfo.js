const axios = require ('axios')
const e = require('express')
const { Recipe, Diet } = require ('../db')
const { API_KEY } = process.env

const getRecipeAPI = async () => {
    try {
        const recipesApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const recipes = recipesApi?.data.results.map(r =>{
            return {
                id: r.id,
                name: r.title,
                resume: r.summary,
                // rate: r.spoonacularScore,
                healthy: r.healthScore,
                // instructions: r.analyzedInstructions.map( i => i.steps.map( s => s.step )),
                diets: r.diets.map( d => d),
                image: r.image,
            }
        });
        return recipes ? recipes : []
    } catch (error) {
        return error.response.statusText
    }
}


const getRecipesDbSecondTry = async () => {
    const dbInfo = await Recipe.findAll({include: Diet})
    const finalDbInfo = dbInfo.map( e => {
        const diets = []
        for (let i = 0; i < e.dataValues.diets ; i++){
            diets.push(e.dataValues.diets[i].dataValues.name)
        }
        return {
            id: e.dataValues.id,
            name: e.dataValues.name,
            resume: e.dataValues.resume,
            // rate: e.dataValues.rate,
            healthy: e.dataValues.healthy,
            // instructions: e.dataValues.instructions,
            image: e.dataValues.image,
            diets: diets
        }
    })
    return finalDbInfo
}
//---------------------------------------------------------------

const getAllRecipes = async () => {
    const apiInfo = await getRecipeAPI();
    const dbInfo = await getRecipesDbSecondTry();
    
    if (apiInfo === "Unauthorized") return dbInfo; 
    const allRecipes = apiInfo.concat(dbInfo);
    return allRecipes;
}

module.exports = {
    getRecipeAPI, 
    getRecipesDbSecondTry,
    getAllRecipes
}