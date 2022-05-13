const axios = require ('axios')
const { Recipe, Diet } = require ('../db')
const { API_KEY } = process.env

const getRecipeAPI = async () => {
    const recipesApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const recipes = recipesApi.data.results.map(r =>{
        return {
            id: r.id,
            name: r.title,
            resume: r.summary,
            rate: r.spoonacularScore,
            healthy: r.healthScore,
            instructions: r.analyzedInstructions.map( i => i.steps.map( s => s.step )),
            diets: r.diets.map( d => d),
            image: r.image,
        }
    });
    return recipes
}


const getRecipesDb = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}
//---------------------------------------------------------------

const getAllRecipes = async () => {
    const apiInfo = await getRecipeAPI();
    const dbInfo = await getRecipesDb();

    const allRecipes = apiInfo.concat(dbInfo);
    return allRecipes;
}

module.exports = {
    getRecipeAPI, 
    getRecipesDb, 
    getAllRecipes
}