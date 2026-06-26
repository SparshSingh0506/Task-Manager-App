// For future purposes if I want to switch from ts types in repo layer to zod.


// import { z } from "zod";

// export const UserDbSchema = z.object({
//   id: z.uuid(),
//   username: z.string(),
//   email: z.email(),
//   password_hash: z.string(),
//   created_at: z.string(),
// });

// // Infer your database types directly from the schemas
// export type User = z.infer<typeof UserDbSchema>;

// // Derive 'CreateUser' by omitting auto-generated database columns
// export const CreateUserSchema = UserDbSchema.omit({
//   id: true,
//   created_at: true,
// });
// export type CreateUser = z.infer<typeof CreateUserSchema>;

// // Derive 'CreatedUser' by picking only returned columns
// export const CreatedUserSchema = UserDbSchema.pick({
//   id: true,
//   username: true,
//   email: true,
//   created_at: true,
// });
// export type CreatedUser = z.infer<typeof CreatedUserSchema>;
