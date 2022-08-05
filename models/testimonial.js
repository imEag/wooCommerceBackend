const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePagination = require('mongoose-paginate-v2');

const TestimonialSchema = new Schema({
    content: { type: String },
    date: { type: String }
});

TestimonialSchema.plugin(mongoosePagination);

TestimonialSchema.statics.findPagination = async ({ page }) => {
    const testimonial = mongoose.model('testimonial');

    const response = await testimonial.paginate({}, { page, limit: 10 });
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
    const testimonial = mongoose.model('testimonial');
    return testimonial.findByIdAndUpdate({ _id: id }, { _id: id, content: content }, { new: true })
        .then()
        .catch(err => console.error(err));
}

module.exports = mongoose.model('testimonial', TestimonialSchema);