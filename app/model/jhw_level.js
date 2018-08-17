/* indent size: 2 */
const sequelize = require('sequelize');

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_level', {
    level_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    level_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    min_experience: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    max_experience: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    delete_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    }
  }, {
    tableName: 'jhw_level',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
