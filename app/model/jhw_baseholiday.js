/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_baseholiday', {
    baseholiday_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    holiday_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    holiday_end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    holiday_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'jhw_baseholiday',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
