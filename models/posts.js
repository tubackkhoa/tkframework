/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('posts', {
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
		accepted: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: "0"
		},
		published_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		lead_sentence: {
			type: DataTypes.STRING,
			allowNull: true
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
		tableName: 'posts'
	});
};
