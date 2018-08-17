/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_friend', {
    bind_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    friend_type_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    friend_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    delete_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    }
  }, {
    tableName: 'jhw_friend',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
