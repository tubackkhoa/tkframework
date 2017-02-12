/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		encrypted_password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		login_type: {
			type: DataTypes.ENUM('local','facebook','google'),
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: false
		},
		registered_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		block: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		user_type: {
			type: DataTypes.ENUM('1','2'),
			allowNull: false
		}
	}, {
		tableName: 'users'
	});
};
