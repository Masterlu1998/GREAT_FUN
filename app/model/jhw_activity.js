/* indent size: 2 */

const sequelize = require('sequelize');

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_activity', {
    activity_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    activity_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    activity_intro: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    limit_num: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    cost_type: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    delete_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    meeting_place: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    province_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    area_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cost_num: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    activity_type_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    activity_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    }
  }, {
    tableName: 'jhw_activity',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
