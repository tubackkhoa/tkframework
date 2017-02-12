/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('item_texts', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'item_texts'
	});
};
