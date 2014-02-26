A page about the github user 'ixtli', visible at [http://ixtli.github.io/](http://ixtli.github.io/).

requirements
============
* [node.js](http://nodejs.org/) (make sure node is installed)
* [grunt](http://gruntjs.com/) (make sure grunt-cli is installed)
* [bower](http://bower.io/) (make sure the bower package manager is installed)

installation
============
1. enter the project directory in your shell
1. `npm install`
1. `bower install`

developing
============
After installation, run `grunt watch` to build assets when they change.

building
============
To build the page run `grunt` by itself. This creates the files at the root level directory which are automatically served by github at [http://ixtli.github.io/](http://ixtli.github.io/)

compilation
============
While I very much prefer to compile any and all javascript with the [closure compiler](https://developers.google.com/closure/compiler/) I have not done so here so that the code itself will be visible on inspection of the website. This said, all javascript is type annotated and linted with gjslint so, theoretically, a .min.js file should be easily created with ADVANCED_OPTIMIZATIONS by supplying the right externs files. (For jQuery and D3, as those are the only external JS libs used live.)