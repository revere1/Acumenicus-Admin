var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var IndustryModel = require('../models/Industry');

var industryType = new GraphQLObjectType({
  name: 'industry',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      industryname: {
        type: GraphQLString
      },
      status: {
        type: GraphQLString
      }
    }
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      industries: {
        type: new GraphQLList(industryType),
        resolve: function () {
          const industries = IndustryModel.find().exec()
          if (!industries) {
            throw new Error('Error')
          }
          return industries
        }
      },
      industry: {
        type: industryType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const industryDetails = IndustryModel.findById(params.id).exec()
          console.log('asdassdfsfsdf', industryDetails)
          if (!industryDetails) {
            throw new Error('Error')
          }
          return industryDetails
        }
      }
    }
  }
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addIndustry: {
        type: industryType,
        args: {
          industryname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          status: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function (root, params) {
          const industryModel = new IndustryModel(params);
          const newIndustry = industryModel.save();
          if (!newIndustry) {
            throw new Error('Error');
          }
          return newIndustry
        }
      },
      updateIndustry: {
        type: industryType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          industryname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          status: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          return IndustryModel.findByIdAndUpdate(params.id, { industryname: params.industryname, status: params.status, updated_date: new Date() }, function (err) {
            if (err) return next(err);
          });
        }
      },
      removeIndustry: {
        type: industryType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const remIndustry = IndustryModel.findByIdAndRemove(params.id).exec();
          if (!remIndustry) {
            throw new Error('Error')
          }
          return remIndustry;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });