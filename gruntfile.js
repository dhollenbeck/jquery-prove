'use strict';

module.exports = function(grunt) {

	// setup
	grunt.initConfig({
		pkg: require('./package.json')
	});

	// load grunt tasks
	grunt.loadTasks('./grunts');

	// register tasks
	grunt.registerTask('lint', ['eslint']);
	grunt.registerTask('build', [
		'concat:prove',
		'concat:decorator',
		'uglify:prove',
		'uglify:decorator',

		'concat:docs1',
		'concat:docs2',
	]);
	grunt.registerTask('default', ['lint']);
};
