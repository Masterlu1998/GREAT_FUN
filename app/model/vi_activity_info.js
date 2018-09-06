/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_activity_info', {
    activity_id: {
      type: DataTypes.STRING(200),
      allowNull: false
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
      defaultValue: '0000-00-00 00:00:00'
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
    },
    join_user_num: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    user_attention_num: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    images_path: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    real_name: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    user_intro: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    experience: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'vi_activity_info',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  };

  return Model;
};
