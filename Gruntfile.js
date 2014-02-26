/* jshint strict: false, undef: false */


/**
 * The (function(){})() wrapper for grunt
 * @param  {Grunt} grunt grunt global namespace
 */
module.exports = function(grunt)
{
	// Things to help us get the job done. Grunt should really
	// figure this out on its own.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-gjslint');

	// @TODO: Grow up and stop uglifying your source: compile it!
	// grunt.loadNpmTasks('grunt-closure-tools');

	// The package.json file contains some useful information
	var pkg = grunt.file.readJSON('package.json');

	// Lodash contains useful functionality
	var _ = require('lodash');

	// We wouldn't want to be mixing data with our build script, would we? ;)
	var config = require('./config.js');

	// The name of the final, compiled CSS file
	var cssFileName = pkg.name + '.css';

	/**
	 * Task definitions
	 * @type {Object}
	 */
	var taskConfig = {

		// make-like clean action
		clean: {

			options: {
				force: true
			},

			build: [
				config.buildDir,
				config.fontDir
			]
		},

		copy: {

			// Their javascript files to the build dir
			build_vendor_js: {
				files: [
					{
						src: config.vendor.js,
						dest: config.buildDir,
						expand: true,
						flatten: true
					}
				]
			},

			// Out JavaScript files to the build dir
			build_js: {
				files: [
					{
						src: config.app.js,
						dest: config.buildDir,
						expand: true,
						flatten: true
					}
				]
			},

			// We need bootstrap fonts, sadly
			build_fonts: {
				files: [
					{
						src: config.vendor.fonts,
						dest: config.fontDir,
						expand: true,
						flatten: true
					}
				]
			}
		},

		// standard jshint
		jshint: {

			options: {
				jshintrc: '.jshintrc'
			},

			// Application source
			src: config.app.js,

			// Might as well lint this
			gruntfile: ['Gruntfile.js']

		},

		// Closure linter, minus the dumb stuff :)
		gjslint: {
			options: {
				flags: [
					'--strict',
					'--jsdoc',
					'--disable=0005,0006,0233'
				],
				reporter: {
					name: 'console'
				}
			},
			all: {
				src: config.app.js
			}
		},

		// Build our less files while including all of bootstrap
		less: {
			build: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: config.buildDir + cssFileName + '.map',
					sourceMapFilename: config.buildDir + cssFileName + '.map'
				},

				src: config.app.less,
				dest: config.buildDir + cssFileName
			}
		},

		// Build our template html files using lodash's template system
		template: {
			build: {
				options: {
					data: {
						scripts: grunt.file.expand(config.app.js),
						buildPath: config.buildDir,
						cssFileName: cssFileName
					}
				},
				files: [
					{
						src: config.app.indicies,
						dest: '.',
						expand: true,
						flatten: true
					}
				]
			}
		},

		/**
		 * A custom 'watch' configuration because it tends to be more complex
		 * than the others and we have to rename the task below.
		 */
		customWatch: {
			options: {
				livereload: true,
				debounceDelay: 250
			},
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile']
			},
			js: {
				files: config.app.js,
				tasks: ['jshint', 'gjslint', 'copy:build_js']
			},
			less: {
				files: config.app.less,
				tasks: ['less:build']
			},
			indicies: {
				files: config.app.indicies,
				tasks: ['template:build']
			}

		},

		connect: {
			server: {
				options: {
					port: config.watchPort,
					hostname: 'localhost',
					livereload: true
				}
			}
		}
	};

	// init grunt
	grunt.initConfig(_.extend(taskConfig, config));

	// We want to inject some things in before watch happens, so rename it
	grunt.renameTask('watch', 'customWatch');

	// Define our custom watch task
	grunt.registerTask('watch', ['connect', 'build', 'customWatch']);

	// The bread and butter of the config
	grunt.registerTask('build', [
		'clean:build',
		'jshint',
		'gjslint',
		'less:build',
		'copy:build_vendor_js',
		'copy:build_js',
		'copy:build_fonts',
		'template:build'
	]);

	// Default task happens when the user types 'grunt'
	grunt.registerTask('default', ['build']);
};
