
import { Sequelize } from 'sequelize';
import { dbconfig } from '../config/db.config.js';
import user from './users.js'
// Initialize Sequelize with the imported config
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
  pool: dbconfig.pool
});

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = user(sequelize, Sequelize)
// db.sequelize.sync({force :  false}).then(()=>{
//     console.log('synced..')
// })

export default  db ;