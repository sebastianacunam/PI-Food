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

    const recipesApibyId = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
    const recipeId = recipesApibyId.data
    
    res.json(recipeId)

    // res.send(recipeId)
    // return res.send(recipeId) 
})

router.get('/types', async (req, res) => {
    try {
        
        const allDiets = await Diet.findAll();
        if(allDiets.length) {
            res.json('los datos ya han sido ingresados')

        } else {
            const apiCall = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=5222`)
            const apiDiets = apiCall.data.results.map( ele => ele.diets )
            // console.log(apiDiets)

            const diets = []
            apiDiets.forEach( ele => {
                ele.forEach( d => {
                    diets.push(d)
                })
            })
            //console.log (diets) acá tengo todas las dietas en un array de strings

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
        const { name, resume, rate, healthy, instructions, image, createdInDB, diet } = req.body 
        
        const newRecipe = await Recipe.create({
            name, 
            resume, 
            rate, 
            healthy, 
            instructions, 
            image, 
            createdInDB,
        })
        // console.log("newRecipe ------ > ", newRecipe, "\n name, resume, rate, healthy, instructions, image, createdInDB", name, resume, rate, healthy, instructions, image, createdInDB)
        const dietDb = await Diet.findAll({
            where: {
                name: diet
            }
        })

        newRecipe.addDiet(dietDb)
        res.json("Receta creada con éxito!")  
    }    catch(error){
        console.log(error)
    }


})

module.exports = router;
