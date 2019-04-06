let sequelize = require('./db.js');

let Reviews = sequelize.import('./reviews');
let Users = sequelize.import('./users');


module.exports = {
    sequelize,
    Users,
    Reviews,
}