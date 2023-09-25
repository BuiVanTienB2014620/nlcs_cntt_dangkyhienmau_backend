
const express = require("express");
const cors = require("cors");
// Import các lớp dịch vụ cho các bảng dữ liệu
const DonorRouter = require("./app/routes/donor.route");
const UserRouter = require("./app/routes/user.route");
const BloodDonationRouter = require("./app/routes/blooddonation.route");
const BDCenterRouter = require("./app/routes/bdcenter.route");
const AppointmentRouter = require("./app/routes/appointment.route");
const FAQRouter = require("./app/routes/faq.route");





const ApiError = require("./app/api-error");

const app = express();




app.use(cors());
app.use(express.json());
app.use("/api/donors",  DonorRouter);
app.use("/api/users", UserRouter);
app.use("/api/blooddonations", BloodDonationRouter);
app.use("/api/bdcenters", BDCenterRouter);
app.use("/api/appointments", AppointmentRouter);
app.use("/api/faqs", FAQRouter);



// Xử lý lỗi 404 - Không Tìm thấy tài nguyên
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// Xử lý lỗi chung 

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",

    });

});

app.get("/", (req, res) => {
    res.json({message: "Wellcome to blood donor resgistration application"});

});


module.exports = app;
