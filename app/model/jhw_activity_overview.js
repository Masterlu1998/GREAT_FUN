/* indent size: 2 */
const sequelize = require('sequelize');

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_activity_overview', {
    bind_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    activity_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    delete_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    }
  }, {
    tableName: 'jhw_activity_overview',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
