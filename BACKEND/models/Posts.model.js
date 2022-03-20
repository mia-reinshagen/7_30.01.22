module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      filename: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.BLOB("long"),
      },
    });

    Posts.associate = (models) => {
      Posts.hasMany(models.Comments, {
        onDelete: "cascade",
      });
  
      Posts.hasMany(models.Likes, {
        onDelete: "cascade",
      });
    };
  
    return Posts;
  };