const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

// const getConnection = require('../libs/postgres'); esto no es la mejor opcion
// const pool = require('../libs/postgres.pool');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });

    // console.log(newUser);
    // console.log(newUser.dataValues);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer'],
    });
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({ where: { email } });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    // const user = await models.User.findByPk(id); //*ahorramos codigo y  lo reutilizamos por eso pongo la siguiente linea
    const user = await this.findOne(id);
    if (changes.role) {
      throw boom.badRequest('"role" is not allowed');
    }
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    // const user = await models.User.findByPk(id);
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
