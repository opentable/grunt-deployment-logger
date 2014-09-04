module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        'start-deployment': {
            'test': {
                options:{
                    message: 'blarg',
                    env: 'test'
                }
            },
            'test-timestamp-override': {
                options:{
                    timestamp: new Date().toISOString(),
                    message: 'blarg'
                }
            }
        },
        'end-deployment': {
            'test': {
                options:{
                    message: 'flarg',
                    env: 'production'
                }
            },
            'test-timestamp-override': {
                options:{
                    timestamp: new Date().toISOString(),
                    message: 'flarg'
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('test', ['jshint', 'start-server', 'start-deployment', 'end-deployment']);
    grunt.registerTask('default', ['test']);
    grunt.loadTasks('tasks');
    grunt.loadTasks('tests/tasks');
};
