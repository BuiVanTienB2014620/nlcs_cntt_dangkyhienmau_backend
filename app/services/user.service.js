const  { ObjectId } = require("mongodb");

class UserService {
    constructor(client){
        this.Users = client.db().collection("Users");
    }

    async createUser(payload){
        const user = {
            name: payload.name,
            age: payload.age,
            bloodGroup: payload.bloodGroup,
            address: payload.address,
            phone: payload.phone,
            email: payload.email,
            password: payload.password,
            registrationDate: new Date(),
            accountStatus: payload.accountStatus,

        };
        // Them nguoi dung vao bang User
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]

        );

        return user;

    }

    async findUserById(id){
        // Tim nguoi dung  theo id
        const user = await this.Users.findOne({_id: new ObjectId(id)});
        return user;

    }
    async findAllUsers() {
        try {
          // Sử dụng phương thức find để lấy tất cả người dùng
          const users = await this.Users.find({}).toArray();
          return users;
        } catch (error) {
          throw error;
        }
      }
      
    async updateUser(id, payload) {
        // Cap nhat thong tin nguoi dung
        const filter = { _id: new ObjectId(id)};
        const update = {$set: payload};
        const result = await this.Users.findOneAndUpdate(filter, update, { returnOriginal: false});
        return result.value;

    }

    async deleteUser(id){
        // xoa nguoi dung
        const filter = { _id: new ObjectId(id)};
        const result = await this.Users.findOneAndDelete(filter);
        return result.value;

    }

}

module.exports = UserService;