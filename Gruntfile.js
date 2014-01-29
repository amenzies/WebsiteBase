'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    site: grunt.file.readYAML('src/data/site.yml'),

    assemble: {
      // Task-level options
      options: {
        prettify: {indent: 2},
        marked: {sanitize: false},
        production: true,
        data: 'src/**/*.{json,yml}',
        assets: '<%= site.destination %>/assets',
        helpers: 'src/helpers/helper-*.js',
        layoutdir: 'src/templates/layouts',
        partials: ['src/templates/includes/**/*.hbs'],
      },
      site: {
        // Target-level options
        options: {layout: 'default.hbs'},
        files: [
          { expand: true, cwd: 'src/templates/pages', src: ['*.hbs'], dest: '<%= site.destination %>/' }
        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 80,
          base: '<%= site.destination %>'
        }
      }
    },
    watch: {
      files: ['src/**/*', 'assets/**/*'],
      tasks: ['default']
    },
    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      all: ['<%= site.destination %>/**/*.{html,md}']
    },

    copy: {
      main: {
        files:[
          {src: ['assets/**'], dest: '<%= site.destination %>/'},
        ]
      }
    },

    'gh-pages': {
      options: {
        base: '<%= site.destination %>'
      },
      src: ['**/*']
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task to be run.
  grunt.registerTask('server', ['default', 'connect', 'watch']);
  grunt.registerTask('default', ['clean', 'assemble', 'copy']);

  grunt.registerTask('publish', ['default', 'gh-pages']);
};
