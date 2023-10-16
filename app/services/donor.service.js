const { ObjectId } = require("mongodb");

class DonorService {
    constructor(client){
        this.Donor = client.db().collection("Users");
    }

    extractDonorData(payload){
        const donor = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            bloadType: payload.bloadType,
            // Them cac truong du lieu khac tuy theo yeu cau ung dung cua ban

        };

        // Loai bo cac truong khong xac dinh

        Object.keys(donor).forEach(
            (key) => donor[key] === undefined && delete donor[key]

        );

        return donor;
    }
    async create(payload) {
        const donor = this.extractDonorData(payload);
        const result = await this.Donor.findOneAndUpdate(
            donor,
            { $set: {   bloadType: donor. bloadType === true          }},
            { returnDocument: "after", upsert: true}

        );
        return result.value;
    }

    async findByName(name){
        return await this.findByName({
            name: { $regex: new RegExp(name), $options: "i"},

        });
    }

    async find(filter){
        const cursor = await this.Donor.find(filter);
        return await cursor.toArray();
    }

    async findById(id){
        return await this.Donor.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,

        });
       
    
    }

    async update(id, payload) {
        console.log(id);

        const filter = {
            _id: ObjectId.isValid(id)  ? new ObjectId(id) : null,
           
        };
        const update = this.extractDonorData(payload);
        const result = await this.Donor.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}

        );
        return result;
    }

    async delete(id){
        const result = await this.Donor.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;

    }

    async deleteAll() {
        const result = await this.Donor.deleteMany({});
        return result.deletedCount;
    }




}


module.exports = DonorService;
