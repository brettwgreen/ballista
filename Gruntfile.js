module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'src/intro.js',
          'src/ballista_core.js',
          'src/ballista_twitter.js',
          'src/ballista_facebook.js',
          'src/outro.js'
        ],
        dest: 'lib/<%= pkg.name %>.js'
      }
    },
    watch: {
      js: {
        files: [
          'src/ballista*.js',
          'Gruntfile.js'
        ],
        tasks: ['jshint']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'src/ballista*.js']
    },
    connect: {
      server: {
        options: {
          port: 8000,
          keepalive: true
        }
      }
    },
    uglify : {
      my_target: {
            files: {
              'lib/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
          }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');  
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  // Register the default tasks.
  grunt.registerTask('default', ['concat', 'uglify']);

};