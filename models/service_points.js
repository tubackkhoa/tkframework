/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('service_points', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lat: {
			type: "DOUBLE",
			allowNull: false
		},
		lng: {
			type: "DOUBLE",
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		owner_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		image: {
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
		lat_cos: {
			type: "DOUBLE",
			allowNull: false
		},
		lat_sin: {
			type: "DOUBLE",
			allowNull: false
		},
		lng_cos: {
			type: "DOUBLE",
			allowNull: false
		},
		lng_sin: {
			type: "DOUBLE",
			allowNull: false
		},
		type: {
			type: DataTypes.ENUM('admin','user'),
			allowNull: false
		}
	}, {
		tableName: 'service_points'
	});
};
