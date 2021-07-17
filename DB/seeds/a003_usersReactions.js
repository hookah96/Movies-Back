const faker = require('faker');

const createFakeUsersReactions = () => ({
  vote: faker.random.arrayElement(['Like', 'Hate', '']),
  user_id: faker.datatype.number({ min: 1, max: 50 }),
  movie_id: faker.datatype.number({ min: 1, max: 50 }),
});

exports.seed = async (knex) => {
  const fakeUsersReactions = [];
  const numOfFakeUsersReactions = 50;

  for (let i = 0; i < numOfFakeUsersReactions; i++) {
    fakeUsersReactions.push(createFakeUsersReactions());
  }

  await knex('users_reactions').insert(fakeUsersReactions);
};
