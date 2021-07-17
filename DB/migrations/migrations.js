require('dotenv').config();

exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.varchar('first_name', 255).notNullable();
      table.varchar('last_name', 255).notNullable();
      table.varchar('email', 255).notNullable();
      table.varchar('password', 255).notNullable();
    })
    .createTable('movies', (table) => {
      table.increments('id');
      table.varchar('title', 255).notNullable();
      table.varchar('description', 255).notNullable();
      table.date('upload_date').notNullable();
      table.integer('likes').notNullable();
      table.integer('hates').notNullable();
      table.integer('user_id').unsigned().nullable();
      table.foreign('user_id').references('users');
    })
    .createTable('users_reactions', (table) => {
      table.increments('id');
      table.varchar('vote', 10).nullable();
      table.integer('user_id').unsigned().nullable();
      table.foreign('user_id').references('users');
      table.integer('movie_id').unsigned().nullable();
      table.foreign('movie_id').references('movies');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('users_reactions')
    .dropTable('users')
    .dropTable('movies');
};
