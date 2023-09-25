const { ObjectId } = require("mongodb");

class AppointmentService {
    constructor(client) {
        this.Appointments = client.db().collection("Appointments");
    }

    async createAppointment(payload) {
        // Thêm thông tin lịch hẹn vào bảng Appointments
        const appointment = {
            userId: new ObjectId(payload.userId),
            bloodDonationCenterId: new ObjectId(payload.bloodDonationCenterId),
            appointmentDate: payload.appointmentDate,
            appointmentTime: payload.appointmentTime,
            status: payload.status,
        };
        const result = await this.Appointments.insertOne(appointment);
        return result.ops[0];
    }

    async findAppointmentById(appointmentId) {
        // Tìm thông tin lịch hẹn theo ID
        const appointment = await this.Appointments.findOne({ _id: new ObjectId(appointmentId) });
        return appointment;
    }

    async updateAppointment(appointmentId, payload) {
        // Cập nhật thông tin lịch hẹn
        const filter = { _id: new ObjectId(appointmentId) };
        const update = { $set: payload };
        const result = await this.Appointments.findOneAndUpdate(filter, update, { returnOriginal: false });
        return result.value;
    }

    async deleteAppointment(appointmentId) {
        // Xóa thông tin lịch hẹn
        const filter = { _id: new ObjectId(appointmentId) };
        const result = await this.Appointments.findOneAndDelete(filter);
        return result.value;
    }
    
    // Các phương thức khác
}

module.exports = AppointmentService;
