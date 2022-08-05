const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } = graphql;

// model
const Testimonial = mongoose.model('testimonial');

// type
const TestimonialType = require('./types/testimonial_type');

// types for pagination
const InfoType = new GraphQLObjectType({
    name: 'InfoType',
    fields: () => ({
        next: { type: GraphQLInt },
        pages: { type: GraphQLInt },
        count: { type: GraphQLInt },
        prev: { type: GraphQLInt }
    })
});

const TestimonalPageType = new GraphQLObjectType({
    name: 'TestimonalPageType',
    fields: () => ({
        info: { type: InfoType },
        results: { type: new GraphQLList(TestimonialType) }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        testimonials: {
            type: TestimonalPageType,
            args: { page: { type: GraphQLInt } },
            resolve(parentValue, { page }) {
                return Testimonial.findPagination({ page });
            }
        },
        testimonial: {
            type: TestimonialType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Testimonial.findById(id);
            }
        }
    })
});

module.exports = RootQuery;