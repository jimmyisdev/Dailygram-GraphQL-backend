import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import connectDB from "./db/connect.js";
import pkg from "body-parser";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";

const { json } = pkg;
dotenv.config();
const app = express();
const httpServer = http.createServer(app);

await connectDB(process.env.MONGO_URI).then(() =>
  console.log("MongoDB connected")
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(
  "/graphql",
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
