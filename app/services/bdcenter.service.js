const { ObjectId } = require("mongodb");

class BDCenterService {
    constructor(client) {
        this.BDCenters = client.db().collection("BDCenters");
    }

    async createBDCenter(payload) {
        // Thêm thông tin trạm hiến máu vào bảng BDCenters
        const bDCenter = {
            name: payload.name,
            address: payload.address,
            latitude: payload.latitude,
            longitude: payload.longitude,
            phoneNumber: payload.phoneNumber,
            workingHours: payload.workingHours,
        };
        const result = await thisBDCenters.insertOne(bDCenter);
        return result.ops[0];
    }

    async findBDCenterById(id) {
        // Tìm thông tin trạm hiến máu theo ID
        const bDCenter = await this.BDCenters.findOne({ _id: new ObjectId(centerId) });
        return bDCenter;
    }

    async updateBDCenter(centerId, payload) {
        // Cập nhật thông tin trạm hiến máu
        const filter = { _id: new ObjectId(centerId) };
        const update = { $set: payload };
        const result = await this.BDCenters.findOneAndUpdate(filter, update, { returnOriginal: false });
        return result.value;
    }

    async deleteBDCenter(centerId) {
        // Xóa thông tin trạm hiến máu
        const filter = { _id: new ObjectId(centerId) };
        const result = await this.BDCenters.findOneAndDelete(filter);
        return result.value;
    }
    
    // Các phương thức khác
}

module.exports = BDCenterService;
