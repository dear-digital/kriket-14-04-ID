const cwd = __dirname + '/sections-template/';
const output = __dirname + '/sections/';
const fs = require('fs');
const instances = require(cwd + 'instances.json');

instances.forEach(template => {
  const origin = [cwd, template.template].join('');
  const filename = template.template.split('/').reverse()[0].replace('.liquid', '');

  template.instances.forEach(instance => {
    const instanceName = instance === '' ? '' : '--' + instance;
    const destination = [output, filename, instanceName, '.liquid'].join('');
    console.log('Generating', destination);
    fs.copyFileSync(origin, destination);
  });
})

