const webpackConfig = require('./build/webpack.prod.conf.js');

module.exports = {
  webpackConfig,
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Installation',
          content: 'docs/installation.md',
        },
        {
          name: 'Configuration',
          content: 'docs/configuration.md',
        },
      ],
    },
    {
      name: 'Components',
      content: 'docs/components.md',
      components: 'src/components/*.vue',
    },
    {
      name: 'Atoms',
      content: 'docs/atoms.md',
      components: 'src/components/atoms/**/*.vue',
    },
  ],
};
