'use strict';


module.exports = function(grunt) {

	grunt.config('eslint', {
		options: {
			rulePaths: ['node_modules/@esscorp/eslint/rules']
		},
		frontend: {
			options: {
				configFile: 'node_modules/@esscorp/eslint/configs/frontend.js'
			},
			nonull: true,
			src: [
				'src/**/*.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-eslint');
};
