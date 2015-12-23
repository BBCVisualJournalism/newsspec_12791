module.exports = function (grunt) {
    grunt.config('csslint', {
        options: {
            'known-properties'              : false,
            'box-sizing'                    : false,
            'box-model'                     : false,
            'compatible-vendor-prefixes'    : false,
            'duplicate-background-images'   : false,
            'font-sizes'                    : false,
            'outline-none'                  : false,
            'import'                        : false,
            'qualified-headings'            : false,
            'text-indent'                   : false,
            'unique-headings'               : false,
            'unqualified-attributes'        : false,
            'universal-selector'            : false,
            'adjoining-classes'             : false,
        },
        src: ['./content/<%= config.services.default %>/css/main.css']
    });
};