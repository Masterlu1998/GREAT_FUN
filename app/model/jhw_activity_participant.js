/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_activity_participant', {
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
    delete_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    }
  }, {
    tableName: 'jhw_activity_participant',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
