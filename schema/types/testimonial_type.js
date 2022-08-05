const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const TestimonialType = GraphQLObjectType({
    name: 'TestimonialType',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        date: { type: GraphQLString }
    })
})

module.exports = TestimonialType;