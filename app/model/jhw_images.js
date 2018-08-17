/* indent size: 2 */
const sequelize = require('sequelize');

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_images', {
    images_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    images_path: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    is_first: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    bind_id: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    bind_type: {
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
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    images_url: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'jhw_images',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
