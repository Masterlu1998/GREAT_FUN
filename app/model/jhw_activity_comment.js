/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jhw_activity_comment', {
    comment_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    }
  }, {
    tableName: 'jhw_activity_comment',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
