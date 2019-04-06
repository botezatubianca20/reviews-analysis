module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reviews', {
        'review': DataTypes.STRING,
        'author': DataTypes.STRING,
        'source': DataTypes.STRING,
        'movie_title': DataTypes.STRING,
        'sentiment': DataTypes.BOOLEAN

    }, {
            underscored: true
        });
}
