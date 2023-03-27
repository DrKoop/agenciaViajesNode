import Sequelize  from "sequelize";
import dotenv from 'dotenv/config';

//console.log(process.env.DB_HOST)

const db = new Sequelize (process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS,{
    hot: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect : 'mysql',
    define : {
        timestamps : false
    },
    pool : {
        max: 5,
        min: 0 ,
        require : 30000,
        indle: 10000
    },
    operatorAliases: false
});

export default db;