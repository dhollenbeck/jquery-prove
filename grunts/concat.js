'use strict';

module.exports = function(grunt) {

	grunt.config('concat', {
		options: {
			nonull: true,
			sourceMap: false
		},
		prove: {
			dest: 'dist/prove.js',
			src: [
				'src/core/*.js',
				'src/selectors/*.js',
				'src/utilities/*.js',
				'src/validators/*.js',
			]
		},
		decorator: {
			dest: 'dist/decorator.js',
			src: [
				'src/decorators/*.js',
			]
		},
		docs1: {
			dest: 'docs/examples/prove.js',
			src: 'dist/prove.js'
		},
		docs2: {
			dest: 'docs/examples/decorator.js',
			src: 'dist/decorator.js'
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
};
