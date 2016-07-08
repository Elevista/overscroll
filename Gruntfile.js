module.exports = function (grunt) {
	var version = grunt.file.readJSON("package.json").version;
	grunt.initConfig({
		clean: ["dist"],
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**'],
					dest: 'dist/',
					rename: function (dest, src) {
						return dest + src.replace('.js', '-' + version + '.js');
					}
				}]
			}
		},
		uglify: {
			//options: {mangle: false},
			target: {
				files: grunt.file.expandMapping(['src/**.js'], 'dist/', {
					rename: function (destBase, destPath) {
						return destBase + destPath.replace('src/', '').replace('.js', '-' + version + '.min.js');
					}
				})
			}
		}

	});
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['clean', 'copy', 'uglify']);
};