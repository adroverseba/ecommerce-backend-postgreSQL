// const faker = require('faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.log(err)); //esto nos sirve para que podamos escuchar el evento error e imprimirlo por la consola si algo sale mal
  }

  // generate() {
  //   const limit = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.imageUrl(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  //uso el alias creado en el modelo del product - recordar que puedo tener mas de una asociasion dentro del array del find
  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    //obtengo offset y limit de la query necesarios para la paginacion
    const { offset, limit } = query;
    if (offset && limit) {
      options.offset = offset;
      options.limit = limit;
    }
    const { price } = query;
    if (price) {
      options.where.price = price;
    }
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = { [Op.between]: [price_min, price_max] };
    }
    const products = await models.Product.findAll(options);

    //sequelize devuelve la informacion en forma de data y metadata, todo esto dentro de un array.Por eso se coloca data entre llaves.
    // const rta = await this.pool.query(query);
    // return rta.rows;
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findOne(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    // const index = this.products.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound('product not found');
    // }
    // const product = this.products[index];
    // this.products[index] = {
    //   ...product,
    //   ...changes,
    // };
    // return this.products[index];
  }

  async delete(id) {
    // const index = this.products.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound('product not found');
    // }
    // this.products.splice(index, 1);
    // return { id };
  }
}

module.exports = ProductsService;
