const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } = graphql;

// model
const Testimonial = mongoose.model('testimonial');

// type
const TestimonialType = require('./types/testimonial_type');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createTestimonial: {
            type: TestimonialType,
            args: {
                content: { type: GraphQLString }
            },
            resolve(parentValue, { id, content }) {
                let date_now = new Date(Date.now());
                return (new Testimonial({ id, content, date: date_now })).save();
            }
        },
        deleteTestimonial: {
            type: TestimonialType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, { id }) {
                return Testimonial.findByIdAndRemove(id);
            }
        },
        updateTestimonial: {
            type: TestimonialType,
            args: {
                id: { type: GraphQLID },
                content: { type: GraphQLString }
            },
            resolve(parentValue, {id, content}) {
                return Testimonial.updateTestimonial({ id, content});
            }
        }
    }
});

module.exports = mutation;