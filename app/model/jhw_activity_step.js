/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_activity_step', {
    step_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    step_order: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    step_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delete_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      defaultValue: '0'
    },
    step_detail: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    step_address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    activity_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'jhw_activity_step',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
