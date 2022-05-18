const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // rate:{
    //   type: DataTypes.INTEGER,
    //   validate:{
    //     min:0,
    //     max:100
    //   },
    // },
    healthy:{
      type: DataTypes.INTEGER,
      validate:{
        min:0,
        max:100
      },
    },
    instructions:{
      type: DataTypes.TEXT
    },
    image:{
      type: DataTypes.STRING
    },
    createdInDB:{
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
      allowNull: false
    }
  },
  {createdAt: false,
    updatedAt: false}
  );
};
