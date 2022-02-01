import { ApolloServer } from "apollo-server";

//import { db } from "./db";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  //context: () => {
  //  return {
  //    prisma: db,
  //  };
  //},
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});