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
                
            }
        }
    }
});