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
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 60 * 30 });

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
      from: `"e-commerce 🛍️" <${config.smtpEmail}>`, // sender address
      to: `lonzo.cassin32@ethereal.email, ${email}`, // list of receivers
      subject: 'Restablecimiento de contraseña', // Subject line
      text: `Hello ${user.name}`, // plain text body
      html: `<b>Para restablecer tu contraseña ingresa a este link: ${link}</b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
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
