'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Product, {
      foreignKey: 'userId',
      as: 'products',
    });
  };

  return User;
};
