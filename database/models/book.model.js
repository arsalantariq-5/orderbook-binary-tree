const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderBook extends Model {
    static associate(models) {
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      wallet_addr: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      otpUsername: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      token: DataTypes.STRING(1000),
      coin_collected: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      common_silver_shard: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      common_gold_shard: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      powered_silver_shard: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      powered_gold_shard: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      freezeTableName: true,
      indexes: [
        {
          fields: ["wallet_addr"],
        },
      ],
    }
  );
  return User;
};
