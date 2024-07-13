import { graph } from '@grafbase/sdk';

const g = graph.Standalone();

const Project = g.type("Project", {
  title: g.string(),
  description: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string(),
  createdBy: g.ref("User"), // Assuming 'User' is correctly defined in another file
});

export default Project;
