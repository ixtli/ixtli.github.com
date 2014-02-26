
module.exports = {

	buildDir: 'build/',

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

		js: ['bower_components/bootstrap/transition.js']

	}
};
