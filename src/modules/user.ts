import { graph } from '@grafbase/sdk';

const g = graph.Standalone();

const User = g.type("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string(),
  githubUrl: g.url().optional(),
  linkedUrl: g.url().optional(),
  projects: g.ref("Project").list().optional(),
});

export default User;
