const Mustache = require('mustache');

const fs = require('fs');
/*
const navbar = fs.readFileSync('./src/components/navbar.mustache', 'utf8');
const footer = fs.readFileSync('./src/components/footer.mustache', 'utf8');

const partials = {
  navbar: navbar,
  footer,
}

const partials = {}
partials.navbar = navbar;
partials.footer = footer;

const partials = {};
partials['navbar'] = navbar;
partials['footer'] = navbar;
*/

const partials = {};
fs.readdirSync('./src/components').forEach(file => {
  partials[file.replace('.mustache', '')] = fs.readFileSync(`./src/components/${file}`, 'utf8');
});

const views = {
  index: {
    homeView: true,
  },
  about: {
    aboutView: true,
  },
  contact: {
    contactView: true,
  },
  projects: {
    projectsView: true
  }
}


fs.readdirSync('./src/pages').forEach(file => {
  const template = fs.readFileSync(`./src/pages/${file}`, 'utf8');
  const fileName = file.replace('.mustache', '');
  const output = Mustache.render(template, views[fileName], partials);
  fs.writeFileSync(`./build/${fileName}.html`, output);
});

/*
const index = fs.readFileSync('./src/pages/index.mustache', 'utf8');
const index_output = Mustache.render(index, {}, partials);
fs.writeFileSync('./build/index.html', index_output);

const about = fs.readFileSync('./src/pages/about.mustache', 'utf8');
const about_output = Mustache.render(about, {}, partials);
fs.writeFileSync('./build/about.html', about_output);

const projects = fs.readFileSync('./src/pages/projects.mustache', 'utf8');
const projects_output = Mustache.render(projects, {}, partials);
fs.writeFileSync('./build/projects.html', projects_output);

const contact = fs.readFileSync('./src/pages/contact.mustache', 'utf8');
const contact_output = Mustache.render(contact, {}, partials);
fs.writeFileSync('./build/contact.html', contact_output);
*/