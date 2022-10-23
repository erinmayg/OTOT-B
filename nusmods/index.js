const axios = require('axios');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let { AY, faculty, department } = req.query;
  AY = req.query.ay || '2022-2023';

  let modules = await axios
    .get(`https://api.nusmods.com/v2/${AY}/moduleInfo.json`)
    .then((res) => res.data);

  if (faculty) {
    modules = modules.filter((module) => module.faculty == faculty);
  }

  if (department) {
    modules = modules.filter((module) => module.department == department);
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: modules,
  };
};
