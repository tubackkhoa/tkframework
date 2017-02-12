/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('item_images', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		src: {
			type: DataTypes.STRING,
			allowNull: false
		},
		caption: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'item_images'
	});
};
