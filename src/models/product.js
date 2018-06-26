'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    content: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Product;
};
