/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('items', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		post_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		sort_rank: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		target_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		target_type: {
			type: DataTypes.ENUM('ItemText','ItemImage','ItemTwitter'),
			allowNull: false
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'items'
	});
};
