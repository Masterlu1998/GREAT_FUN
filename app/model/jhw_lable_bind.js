/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_lable_bind', {
    lable_bind_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bind_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    bind_type: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    lable_id: {
      type: DataTypes.INTEGER(100),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    }
  }, {
    tableName: 'jhw_lable_bind',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
