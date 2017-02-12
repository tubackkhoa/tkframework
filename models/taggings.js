/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('taggings', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		tag_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		subject_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		subject_type: {
			type: DataTypes.ENUM('Post','Project'),
			allowNull: false
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'taggings'
	});
};
