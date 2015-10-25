
module.exports = function(grunt) {
    var initcfg = {
        pkg: grunt.file.readJSON('package.json'),

        //backend documentation
        jsdoc : {
            main: {
                src: [
                    'index.js',
                    'lib/**/*.js',
                    'test/**/*.js'
                ],
                options: {
                    destination: 'docs',
                    readme: './README.md',
                    configure: 'jsdoc.conf.json'
                }
            }
        },

        jshint: {
            backEnd: [
                'Gruntfile.js',
                'index.js',
                'lib/**/*.js'
            ]
        },

        clean: {
            npm: ['node_modules'],
        },

        mocha_istanbul: {
            coverage: {
                src: 'test',
            },
        },


    };

    grunt.initConfig(initcfg);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('test', ['mocha_istanbul']);
    // grunt.registerTask('build', ['copy', 'less', 'html2js:dev', 'ngAnnotate:main']);
};
