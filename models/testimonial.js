const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePagination = require('mongoose-paginate-v2');

const TestimonialSchema = new Schema({
    autor: { type: String },
    content: { type: String },
    date: { type: String }
});

TestimonialSchema.plugin(mongoosePagination);

TestimonialSchema.statics.findPagination = async ({ page }) => {
    const response = await this.paginate({}, { page, limit: 10 })
        .then(res => res)
        .catch(err => console.error(err));

    const result = {
        info: {
            next: response.nextPage,
            pages: response.totalPages,
            count: response.totalDocs,
            prev: response.prevPage
        },
        results: response.docs
    };

    return result;
}


TestimonialSchema.statics.updateTestimonial = ({ id, content }) => {
    return this.findByIdAndUpdate({ _id: id }, { content: content }, { new: true })
        .then()
        .catch(err => console.error(err));
}

module.exports = mongoose.model('testimonial', TestimonialSchema);