/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_area', {
    area_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    area_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    area_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    delete_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'jhw_area',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
