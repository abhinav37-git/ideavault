// import { graph, config } from '@grafbase/sdk'
import {graph, config, connector, auth } from '@grafbase/sdk'
import mongoose, { Schema, model } from "mongoose";


const g = graph.Standalone()

const mongo = connector.MongoDB("MongoDB", {
  apiKey: g.env("MONGODB_API_KEY"),
  url: g.env("MONGODB_API_URL"),
  dataSource: g.env("MONGODB_DATASOURCE"),
  database: g.env("MONGODB_DATABASE"),
});

g.datasource(mongo);

const Project = g
  .type("Project", {
    title: g.string(),
    description: g.string(),
    image: g.url(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    category: g.string(),
    // category: g.string().search(),
    createdBy: g.ref('User'),
  })
  // .collection("addresses");

mongo
  .model("User", {
    name: g.string().length({min: 2, max: 20}),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string(),
    githubUrl: g.url().optional(),
    linkedUrl: g.url().optional(),
    projects: g.ref(Project).list().optional()

  })
  .collection("users");


const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  graph: g,

  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  }

})
