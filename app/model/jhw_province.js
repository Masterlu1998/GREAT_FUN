/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_province', {
    province_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    province_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    province_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    delete_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'jhw_province',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
