import { ApolloServer, gql } from 'apollo-server';
import { db } from './firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';

const typeDefs = gql`
  type Mutation {
    createUser(
      email: String!,
      password: String!,
      nickname: String!,
      color: String!,
      userRole: String!
    ): User
  }

  type User {
    id: ID!
    email: String!
    password: String!
    nickname: String!
    color: String!
    uuid: String!
    userRole: String!
    createdAt: String!
    updatedAt: String!
  }
`;

interface CreateUserArgs {
  email: string;
  password: string;
  nickname: string;
  color: string;
  userRole: string;
}

const resolvers = {
  Mutation: {
    createUser: async (_: any, { email, password, nickname, color, userRole }: CreateUserArgs) => {
      const id = uuidv4();
      const timestamp = new Date().toISOString();
      const userDoc = {
        email,
        password,  // 실제로는 해시 처리된 비밀번호를 저장해야 합니다.
        nickname,
        color,
        uuid: id,
        userRole,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      try {
        await db.collection('users').doc(id).set(userDoc);
        console.log('User created with ID:', id);
      } catch (error) {
        console.error('Error adding user to Firestore:', error);
      }

      return { id, ...userDoc };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});