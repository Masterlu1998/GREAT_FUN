/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_comment_info', {
    comment_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    comment_content: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    comment_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    activity_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    real_name: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    experience: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'vi_comment_info',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
