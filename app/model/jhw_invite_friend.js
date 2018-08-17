/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_invite_friend', {
    invite_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    receive_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    invite_describe: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    invite_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    activity_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    send_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delete_statu: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'jhw_invite_friend',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
