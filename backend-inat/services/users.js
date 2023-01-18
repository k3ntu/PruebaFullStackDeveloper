const MongoLib = require('../lib/mongo')

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUsers({ data = '' }) {
    const query = data && { $or:[{dni: data}, { email: data }] };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async doLogin(username, password) {
    const query = { $and: [{ name: username }, { password: password }] };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async getUser({ userId }) {
    const user = await this.mongoDB.get(this.collection, userId);
    return user || {};
  }

  async createUser({ user }) {
    return await this.mongoDB.create(this.collection, user);
  }

  async updateUser({ userId, user }) {
    return await this.mongoDB.update(this.collection, userId, user);
  }

  async deleteUser({ userId }) {
    return await this.mongoDB.delete(this.collection, userId);
  }

}

module.exports = UsersService;
