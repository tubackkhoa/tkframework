/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('projects', {
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
			allowNull: true
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		caption: {
			type: DataTypes.STRING,
			allowNull: true
		},
		source_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		accepted: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: "0"
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
		tableName: 'projects'
	});
};
