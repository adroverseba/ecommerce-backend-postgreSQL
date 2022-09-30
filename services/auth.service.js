const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }

    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 60 * 15 });

    return { user, token };
  }

  async recovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;

    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: `"Fred Foo 👻" <${config.smtpEmail}>`, // sender address
      to: `lonzo.cassin32@ethereal.email, ${email}`, // list of receivers
      subject: 'Este es un nuevo correo', // Subject line
      text: `Hello ${user.name}`, // plain text body
      html: `<b>Ingresa a este link: ${link}</b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      secure: false, // true for 465, false for other ports
      port: 587,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }

  async changePassword(token, newPassword) {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await service.findOne(payload.sub);

    if (!user || user.recoveryToken !== token) {
      throw boom.unauthorized();
    }

    //* genero hash + salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(newPassword, salt);

    await service.update(user.id, { recoveryToken: null, password: hash });
    return { message: 'password changed' };
  }
}

module.exports = AuthService;
