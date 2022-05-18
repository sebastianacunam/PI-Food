const { default: axios } = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getRecipeAPI, getAllRecipes } = require('../controllers/apiInfo');
const {Recipe, Diet} = require('../db');
const { API_KEY } = process.env


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//

router.get('/recipes', async (req, res) => {
    const { name } = req.query
    
    try {
    const allRecipes = await getAllRecipes();
        if (!name) res.send (allRecipes)
        else {
            let recipeName = await allRecipes.filter( r => r.name.toLowerCase().includes(name.toLowerCase()))
            res.send (recipeName)
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/recipes/:id', async (req, res) => {
    const {id} = req.params
    let idRecipe 

    if(id.includes("-")){
        try {
            idRecipe = await Recipe.findOne({
                where:{id: id},
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            })
            res.json(idRecipe)
        } catch (error) {
            res.json("No existe tal receta")
        }        
    }else {
        try {
            const recipesApibyId = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
            const recipeId = recipesApibyId.data
            idRecipe = {
                id: recipeId.id,
                name: recipeId.title,
                resume: recipeId.summary,
                rate: recipeId.spoonacularScore,
                healthy: recipeId.healthScore,
                instructions: recipeId.analyzedInstructions.map( i => i.steps.map( s => s.step )),
                diet: recipeId.diets,
                image: recipeId.image,
            }
            res.json(idRecipe)
        } catch (error) {
            res.json("No existe tal receta")
        }
        
    }
    // res.send(recipeId)
    // return res.send(recipeId) 
})

router.get('/types', async (req, res) => {
    try {
        
        const allDiets = await Diet.findAll();
        if(allDiets.length) {
            res.json(allDiets)
            //ojo acá con lo que llega luego al estado de dietas en el frontend!!!!

        } else {
            const apiCall = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
            const apiDiets = apiCall.data.results.map( ele => ele.diets )
            // console.log(apiDiets)

            const mixDiets = []

            apiDiets.forEach( ele => {
                ele.forEach( d => {
                    mixDiets.push(d)
                })
            })
            //console.log (diets) acá tengo todas las dietas en un array de strings

           
            console.log(mixDiets)

            const diets = new Set(mixDiets)

            diets.forEach( typeOfDiet => {
                Diet.findOrCreate({
                    where:{
                        name: typeOfDiet
                    }
                })
            })


            const allDiets2 = await Diet.findAll();
            res.json(allDiets2)
        }

    } catch (error) {
        res.status(404).json({msg: `dietTypes esta entrando al error, Seguro caduco la apiKey`, error: error})
    }
})

router.post('/newRecipe', async (req, res) => {
    try {  
        const { name, resume, rate, healthy, instructions, image, createdInDB, diets } = req.body 
        
        const newRecipe = await Recipe.create({
            name, 
            resume, 
            rate, 
            healthy, 
            instructions, 
            image, 
            createdInDB,
            //cuando haga el post en el json y en el front tengo que colocar los tipos de dietas posibles!!
        })
        // console.log("newRecipe ------ > ", newRecipe, "\n name, resume, rate, healthy, instructions, image, createdInDB", name, resume, rate, healthy, instructions, image, createdInDB)
        const dietDb = await Diet.findAll({
            where: {
                name: diets
            }
        })

        newRecipe.addDiet(dietDb)
        res.json("Receta creada con éxito!")  
    }    catch(error){
        console.log(error)
    }


})

module.exports = router;
