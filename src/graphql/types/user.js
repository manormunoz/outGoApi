import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

// import PostModel from '../../models/post';
// import { postType } from './post';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    email: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
    // posts: {
    // 		type: new GraphQLList(postType),
    // 		resolve(user) {
    // 			const { _id } = user
    // 			return PostModel.find({ uid: _id }).exec()
    // 		}
    // 	},
  })
});


export const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    email: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  })
});

export const userLoginType = new GraphQLInputObjectType({
  name: 'UserLogin',
  fields: () => ({
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  })
});

export const userTokenType = new GraphQLObjectType({
  name: 'UserToken',
  fields: () => ({
    token: {
      type: GraphQLString
    }
  })
});
