// const Sequelize = require('sequelize');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(process.env.DBCONFIG, process.env.USER, process.env.PASSWORD, {

    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    database: "foleon",
    port: process.env.DBPORT
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

 db.pages = require('../models/page.model.js')(sequelize, DataTypes);
 db.rows = require('../models/rows.model.js')(sequelize, DataTypes);
 db.owner = require('../models/pageOwner.js')(sequelize, DataTypes);
 db.columns = require('../models/column.model.js')(sequelize, DataTypes);
 db.contents = require('../models/content.model.js')(sequelize, DataTypes);
 db.images = require('../models/image.model.js')(sequelize, DataTypes);

 db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

db.owner.hasMany(db.pages, {
    foreignKey: 'owner_id'
})

db.pages.belongsTo(db.owner, {
    foreignKey: 'owner_id'
})

db.pages.hasMany(db.rows, {
    foreignKey: 'pageId',
    onDelete: 'cascade'
})


db.rows.belongsTo(db.pages, {
    foreignKey: 'pageId'
})

db.rows.hasMany(db.columns, {
    foreignKey: 'rowId',
    onDelete: 'cascade'
})

db.columns.belongsTo(db.rows, {
    foreignKey: 'rowId'
})

db.columns.hasOne(db.contents, {
    foreignKey: 'columnId'
})

db.contents.belongsTo(db.columns, {
    foreignKey: 'columnId'
})

db.contents.hasOne(db.images, {
    foreignKey: 'contentId'
})

db.images.hasMany(db.contents, {
    foreignKey: 'contentId'
})

db.images.belongsToMany(db.pages, { through: 'PageImage' })

db.pages.belongsToMany(db.images, { through: 'PageImage' })

module.exports = db;