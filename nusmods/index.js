const axios = require('axios');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let { AY, faculty, department, page } = req.query;
  page = req.query.page || 1;
  AY = req.query.ay || '2022-2023';

  let modules = await axios
    .get(`https://api.nusmods.com/v2/${AY}/moduleInfo.json`)
    .then((res) => res.data);

  let faculties = [...new Set(modules.map((module) => module.faculty))];
  let departments = [...new Set(modules.map((module) => module.department))];

  if (faculty) {
    modules = modules.filter((module) => faculty.includes(module.faculty));
    departments = [...new Set(modules.map(({ department }) => department))];
  }

  if (department) {
    modules = modules.filter((module) =>
      department.includes(module.department)
    );
    faculties = [...new Set(modules.map(({ faculty }) => faculty))];
  }

  const resultsPerPage = 8;
  pages = Math.ceil(modules.length / resultsPerPage);
  modules = modules.splice(resultsPerPage * (page - 1), resultsPerPage * page);

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
