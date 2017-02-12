/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sell_posts', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false
		},
		type: {
			type: DataTypes.ENUM('sell','transport'),
			allowNull: false
		},
		user_type: {
			type: DataTypes.ENUM('admin','user'),
			allowNull: false
		}
	}, {
		tableName: 'sell_posts'
	});
};
