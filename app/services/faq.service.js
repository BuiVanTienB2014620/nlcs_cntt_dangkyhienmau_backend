const { ObjectId } = require("mongodb");

class FaqService {
    constructor(client) {
        this.Faqs = client.db().collection("FAQs");
    }

    async createFaq(payload) {
        // Thêm câu hỏi thường gặp vào bảng FAQs
        const faq = {
            title: payload.title,
            content: payload.content,
            createdAt: new Date(),
        };
        const result = await this.Faqs.insertOne(faq);
        return result.ops[0];
    }

    async findFaqById(faqId) {
        // Tìm câu hỏi thường gặp theo ID
        const faq = await this.Faqs.findOne({ _id: new ObjectId(faqId) });
        return faq;
    }

    async updateFaq(faqId, payload) {
        // Cập nhật câu hỏi thường gặp
        const filter = { _id: new ObjectId(faqId) };
        const update = { $set: payload };
        const result = await this.Faqs.findOneAndUpdate(filter, update, { returnOriginal: false });
        return result.value;
    }

    async deleteFaq(faqId) {
        // Xóa câu hỏi thường gặp
        const filter = { _id: new ObjectId(faqId) };
        const result = await this.Faqs.findOneAndDelete(filter);
        return result.value;
    }
    
    // Các phương thức khác
}

module.exports = FaqService;
