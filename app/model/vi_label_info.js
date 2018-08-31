/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_label_info', {
    label_bind_id: {
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
    label_id: {
      type: DataTypes.INTEGER(100),
      allowNull: true
    },
    label_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'vi_label_info',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
