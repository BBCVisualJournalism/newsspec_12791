module.exports = function (grunt) {

    grunt.registerTask('copy_js_minimum', ['copy:requirejs']);

    grunt.config(['copy', 'requirejs'], {
        files: [{
            expand: true,
            cwd:    'source/js/lib/vendors/require/',
            src:    ['*.js'],
            dest:   'content/<%= config.services.default %>/js/lib/vendors/require/'
        }]
    });
    
    grunt.config(['copy', 'jsAll'], {
        files: [{
            expand: true,
            cwd:    'source/js/',
            src:    ['**'],
            dest:   'content/<%= config.services.default %>/js/'
        }]
    });
    
    grunt.registerTask('copyRequiredJs', function () {
        if (grunt.config.get('config').debug === 'true') {
            grunt.task.run('copy:jsAll'); 
        } else {
            grunt.task.run('copy_js_minimum'); 
        }
    });

    var applicationJS = ['requirejs:jquery1', 'requirejs:jquery2'];
    if (grunt.config.get('config').scaffoldLite === 'true') {
        applicationJS = ['requirejs:lite'];
    }

    grunt.config(['concurrent', 'js'], {
        tasks: ['jshint', 'jasmine'].concat(applicationJS)
    });
    grunt.registerTask('js', ['clean:allJs', 'overrideImagerImageSizes', 'concurrent:js', 'copyRequiredJs']);
};