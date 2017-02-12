/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('social_accounts', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		author_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		account_type: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'social_accounts'
	});
};
