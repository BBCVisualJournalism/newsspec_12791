module.exports = function (grunt) {
	grunt.config('jasmine', {
        allTests: {
            src: 'source/js/newsspec_<%= config.project_number %>/*.js',
            options: {
                keepRunner: true,
                specs: 'source/js/spec/*Spec.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: '<%= requirejs.jquery1.options.baseUrl %>',
                        paths: {
                            "jquery": "./lib/vendors/jquery/jquery-1.9.1",
                            "pubsub": "./lib/vendors/jquery/pubsub",
                            "bump-3": "http://emp.bbci.co.uk/emp/bump-3/bump-3",
                            "swfobject-2": "http://static.stage.bbci.co.uk/frameworks/swfobject/0.1.10/sharedmodules/swfobject-2",
                            "istats-1": "http://static.stage.bbci.co.uk/frameworks/istats/0.28.8/modules/istats-1",
                            "playlister/snippets": "./../../bower_components/snippets-js/index",
                            "$v": "./lib/vendors/velocity/velocity.min"
                        }
                    }
                }
            }
        }
    });
};