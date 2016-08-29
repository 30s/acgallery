/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app/js', // 'dist',

        '@angular': 'libs/js/@angular',
        '@ng-bootstrap': 'libs/js/@ng-bootstrap',
        'angular2-in-memory-web-api': 'libs/js/angular2-in-memory-web-api',
        'rxjs': 'libs/js/rxjs',
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'boot.js', defaultExtension: 'js' },

        'rxjs': { defaultExtension: 'js' },
        '@ng-bootstrap/ng-bootstrap': { main: 'index.js', defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    };

    var ngPackageNames = [
      'common',
      'compiler',
      'core',
      'forms',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      'router',
      'upgrade',
    ];

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);

    // No umd for router yet. It has now.
    //packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

    var ngBootstrapPackageNames = [
      'accordion',
      'alert',
      'bundles',
      'buttons',
      'carousel',
      'collapse',
      'dropdown',
      'esm',
      'modal',
      'pagination',
      'popover',
      'progressbar',
      'rating',
      'tabset',
      'timepicker',
      'tooltip',
      'typeahead',
      'util'
    ];

    // Individual files
    function packBootstrapIndex(pkgName) {
        packages['@ng-bootstrap/ng-bootstrap/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Add package entries for angular packages
    ngBootstrapPackageNames.forEach(packBootstrapIndex);

    var config = {
        map: map,
        packages: packages
    };

    System.config(config);

})(this);