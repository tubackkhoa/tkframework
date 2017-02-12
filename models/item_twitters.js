/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('item_twitters', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		twitter_id: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'item_twitters'
	});
};
