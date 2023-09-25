const { ObjectId} = require("mongodb");

class BloodDonationService {
    constructor(client) {
        this.BloodDonations = client.db().collection("BloodDonations");
    }

  async createBloodDonation(payload){
        const bloodDonation = {
           userId: new Object(payload.userId),
           donationDate: payload.donationDate,
           donationTime: payload.donationTime,
           donationAddress: payload.donationAddress,
           status: payload.status,
           addtionalDescription: payload.addtionalDescription,

        };
        // Them nguoi dung vao bang User
        const result = await this.BloodDonations.insertOne(bloodDonation);
        return result.ops[0];

    }

    async findBloodDonationById(bloodDonationId) {
        // Tìm thông tin hiến máu theo ID
        const bloodDonation = await this.BloodDonations.findOne({ _id: new ObjectId(bloodDonationId) });
        return bloodDonation;
    }

    async updateBloodDonation(bloodDonationId, payload) {
        // Cập nhật thông tin hiến máu
        const filter = { _id: new ObjectId(bloodDonationId) };
        const update = { $set: payload };
        const result = await this.BloodDonations.findOneAndUpdate(filter, update, { returnOriginal: false });
        return result.value;
    }

    async deleteBloodDonation(bloodDonationId) {
        // Xóa thông tin hiến máu
        const filter = { _id: new ObjectId(bloodDonationId) };
        const result = await this.BloodDonations.findOneAndDelete(filter);
        return result.value;
    }
}

module.exports = BloodDonationService;