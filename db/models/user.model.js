const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    // allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', //por buenas practicas de DB no se usa camel case sino que _(barrra baja)
    defaultValue: Sequelize.fn('NOW'),
  },
};

class User extends Model {
  static associate() {
    //associate, aca se definen todas las relaciones
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User', //lo dejamos con el mismo nombre que tiene la clase
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
