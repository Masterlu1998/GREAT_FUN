/* indent size: 2 */
const sequelize = require('sequelize');

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_user', {
    user_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    real_name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    user_pwd: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    certificate: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    certificate_type_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    delete_status: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    avatar_url: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    experience: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_intro: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'jhw_user',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
