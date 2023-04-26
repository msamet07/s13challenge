// DO NOT CHANGE THIS FILE
exports.seed = function (knex) {
  return knex('actions').insert([
    {
      project_id: 1,
      description: 'Fork and Clone Repository',
      notes: 'Repo URL: https://github.com/Workintech/node-api-challenge',
    },
    {
      project_id: 1,
      description: 'Install Dependencies',
      notes: 'Remember to cd into the folder where the Project was cloned',
    },
    {
      project_id: 1,
      description: 'Design and Build API Endpoints',
      notes: 'This is where the magic happens!',
    },
  ]);
};
