const faker = require('faker');

const createFakeMovies = () => ({
  title: faker.company.companyName(),
  description: faker.lorem.sentence(),
  upload_date: faker.date.past(),
  likes: faker.datatype.number(),
  hates: faker.datatype.number(),
  user_id: faker.datatype.number({ min: 1, max: 50 }),
});

exports.seed = async function (knex) {
  const fakeMovies = [];
  const numOfFakeMovies = 50;

  for (let i = 0; i < numOfFakeMovies; i++) {
    fakeMovies.push(createFakeMovies());
  }

  await knex('movies').insert(fakeMovies);
};
