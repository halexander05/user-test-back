"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");
const Database = use("Database");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Login.
   */
  async login({ request, auth }) {
    let token = null;
    try {
      const { email, password } = request.all();
      token = await auth.attempt(email, password);
      if (token) {
        token.user = await Database.select("*")
          .from("users")
          .where("email", email);
      }
    } catch (error) {
      throw new Error();
    }
    return token;
  }

  /**
   * Create/save a new user.
   */
  async store({ request, response }) {
    const { email, username, password } = request.all();

    const user = await User.create({ email, username, password });
    return user;
  }
}

module.exports = UserController;
