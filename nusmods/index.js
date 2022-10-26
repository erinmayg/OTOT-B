const axios = require('axios');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let { AY, faculty, department, page } = req.query;
  page = req.query.page || 1;
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

  let faculties = [...new Set(modules.map((module) => module.faculty))];
  let departments = [...new Set(modules.map((module) => module.department))];

  pages = Math.ceil(modules.length / 8);
  modules = modules.splice(8 * (page - 1), 8 * page);

  context.res = {
    // status: 200, /* Defaults to 200 */
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: {
      faculties,
      departments,
      pages,
      modules,
    },
  };
};
