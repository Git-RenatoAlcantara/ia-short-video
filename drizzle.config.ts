import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./configs/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://AI-Content-Generator_owner:5wWOP2tzxjHp@ep-purple-field-a5lhj6q5.us-east-2.aws.neon.tech/AI-Content-Generator?sslmode=require",
  },
});
