
module.exports = {

	buildDir: 'build/',

	fontDir: 'fonts/',

	vendorRoot: 'bower_components',

	watchPort: 1337,

	app: {

		js: ['src/ixtli.js'],

		less: [
			'bower_components/bootstrap/less/bootstrap.less',
			'less/*.less'
		],

		templates: ['partials/*.html'],

		indicies: ['indicies/index.html']

	},

	vendor: {

		js: [
			'bower_components/bootstrap/js/transition.js',
			'bower_components/d3/d3.js'
		],

		fonts: ['bower_components/bootstrap/dist/fonts/*']

	}
};
