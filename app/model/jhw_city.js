/* indent size: 2 */
const sequelize = require('sequelize');

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_city', {
    city_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    city_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    city_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    delete_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    province_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'jhw_city',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
