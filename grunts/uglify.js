'use strict';

module.exports = function(grunt) {

	grunt.config('uglify', {
		options: {
			banner: '/*!'
			+ '\n<%= pkg.name %> - v<%= pkg.version %> - '
			+ '<%= grunt.template.today("yyyy-mm-dd") %>'
			+ '\nhttps://github.com/provejs-jquery'
			+ '\n*/'
		},
		prove: {
			options: {
				sourceMap: true,
				sourceMapName: 'dist/prove.map',
				compress: {
					dead_code: true,
					drop_console: true
				}
			},
			dest: 'dist/prove.min.js',
			src: [
				'dist/prove.js',
			]
		},
		decorator: {
			options: {
				sourceMap: true,
				sourceMapName: 'dist/decorator.map',
				compress: {
					dead_code: true,
					drop_console: true
				}
			},
			dest: 'dist/decorator.min.js',
			src: [
				'dist/decorator.js',
			]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
};
