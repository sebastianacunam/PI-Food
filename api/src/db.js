require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL, NODE_ENV,
} = process.env;

// Configuración de Sequelize
const sequelize = 
  NODE_ENV === "production"
    ? new Sequelize(DATABASE_URL, {
        dialect: "postgres",
        logging: false, // deshabilitar logs en producción
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, // Desactiva validación estricta del certificado SSL
          },
        },
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
        logging: false,
        native: false, // Permitir usar pg-native
      });

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(([key, value]) => [
  key[0].toUpperCase() + key.slice(1),
  value,
]);
sequelize.models = Object.fromEntries(capsEntries);

// Relacionamos los modelos
const { Recipe, Diet } = sequelize.models;

Recipe.belongsToMany(Diet, { through: 'recipe_diet' });
Diet.belongsToMany(Recipe, { through: 'recipe_diet' });

// Exportamos los modelos y la conexión
module.exports = {
  ...sequelize.models, // para importar los modelos
  conn: sequelize, // para importar la conexión
};
