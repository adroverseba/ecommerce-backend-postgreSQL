// const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(userId) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': userId,
      },
      include: ['user'],
    });
    // console.log(userId);
    const newOrder = await models.Order.create({
      customerId: customer.dataValues.id,
    });
    return newOrder;
  }

  async addItem(data) {
    const newItem = models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  //resuelvo un anidamiento trayendo la association incluyendome la association user
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return order;
  }

  async findByUser(userId) {
    const order = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
