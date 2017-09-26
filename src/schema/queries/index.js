const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type Curso {
    id: ID!
    titulo: String!
  }

  type Query {
    cursos: [Curso]
  }
`;

const resolvers = {
  Query: {
    cursos : () => {
      return [
        {
          id: 23,
          titulo: 'sdsdd'
        }
      ]
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
