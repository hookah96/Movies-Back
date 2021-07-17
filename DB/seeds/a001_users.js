const faker = require('faker');

const createFakeUsers = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

exports.seed = async (knex) => {
  const fakeUsers = [];
  const numOfFakeUsers = 50;

  for (let i = 0; i < numOfFakeUsers; i++) {
    fakeUsers.push(createFakeUsers());
  }

  await knex('users').insert(fakeUsers);
};
