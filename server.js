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
const port = process.env.PORT || 5000;

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
  cors({ origin:  ["https://dailygram-admin2023.onrender.com"] }),
  // cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

await new Promise((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at ${port}`);
