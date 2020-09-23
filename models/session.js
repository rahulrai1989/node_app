'use strict';
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define('session', 
  {
    sid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    expires: DataTypes.DATE,
    data: DataTypes.STRING,
  }, {});
  session.associate = function(models) {
    session.belongsTo(models.user);
  };
  return session;
};
