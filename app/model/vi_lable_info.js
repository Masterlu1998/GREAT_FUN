/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_lable_info', {
    lable_bind_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      defaultValue: '0'
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
    lable_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'vi_lable_info',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
