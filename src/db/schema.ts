import { mysqlTable, varchar, boolean, timestamp } from 'drizzle-orm/mysql-core';

// On défini le schéma ici. C'est ce qui sera utilisé pour créer la table dans la base de données.
// On utilise les types de Drizzle pour définir les colonnes de la table.
// Chaque colonne est définie avec un type, une longueur (si applicable) et des contraintes
export const todos = mysqlTable('todos', {
  id: varchar('id', { length: 36 }).primaryKey(),
  text: varchar('text', { length: 500 }).notNull(),
  isCompleted: boolean('is_completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  firstName: varchar('first_name', { length: 100}).notNull(),
  lastName: varchar('last_name', { length: 100}).notNull(),
  email: varchar('email', { length: 100}).notNull(),
  password: varchar('password', { length: 200}).notNull(),
  role: varchar('role', { length: 20}).default('client').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})