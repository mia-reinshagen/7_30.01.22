export default (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdminAccount: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isSimpleAccount: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "avatar.png"
        },
         filename: {
          type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB("long"),
        },
    });


    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    };

    return Users;
};