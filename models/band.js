// DEPENDENCIES
const { Sequelize, DataTypes,  Model } = require('sequelize')
// SEQUELIZE CONNECTION
const sequelize = new Sequelize({
    storage: process.env.PG_URI,
    dialect: 'postgres',
    username: 'postgres',
    password: process.env.PG_PASSWORD
  })

// MODEL
class Band extends Model{}

Band.init({
    band_id: {
        type: DataTypes.INTEGER,
        primarykey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    available_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Band",
    tableName: "band",
    timestamps: false,

}) 


// EXPORT
module.exports = Band
