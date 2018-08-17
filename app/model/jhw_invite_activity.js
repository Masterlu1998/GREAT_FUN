/* indent size: 2 */
const sequelize = require('sequelize');

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_invite_activity', {
    add_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    receive_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    add_describe: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    add_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    send_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    delete_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    activity_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'jhw_invite_activity',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
