// const Sequelize = require('sequelize');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('foleon', 'root', 'root', {

    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    database: "foleon",
    port: 3306
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

 db.pages = require('../models/pageSchema.js')(sequelize, DataTypes);
 db.rows = require('../models/rows.js')(sequelize, DataTypes);
 db.owner = require('../models/pageOwner.js')(sequelize, DataTypes);
 db.columns = require('../models/columnMondel.js')(sequelize, DataTypes);
 db.contents = require('../models/contentModel.js')(sequelize, DataTypes);
 db.images = require('../models/imageModel.js')(sequelize, DataTypes);

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
    foreignKey: 'pageId'
})


db.rows.belongsTo(db.pages, {
    foreignKey: 'pageId'
})

db.rows.hasMany(db.columns, {
    foreignKey: 'rowId'
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