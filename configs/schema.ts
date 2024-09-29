import { pgTable, serial, varchar, boolean  } from "drizzle-orm/pg-core";

export const Users=pgTable('Users', {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    password: varchar('password').notNull(),
    imageUrl:varchar('imageUrl'),
    subscription:boolean('subscription').default(false)
})