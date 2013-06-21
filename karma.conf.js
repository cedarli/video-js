// files = [
//   QUNIT,
//   QUNIT_ADAPTER
// ];

//TODO make the configFile optional
frameworks = ['qunit'];
autoWatch = true;

files = [
  'test/karma-qunit-shim.js',
  QUNIT,
  QUNIT_ADAPTER,
  "src/js/core.js",
  "src/js/core-object.js",
  "src/js/events.js",
  "src/js/lib.js",
  "src/js/component.js",
  "src/js/button.js",
  "src/js/slider.js",
  "src/js/menu.js",
  "src/js/player.js",
  "src/js/control-bar/control-bar.js",
  "src/js/control-bar/play-toggle.js",
  "src/js/control-bar/time-display.js",
  "src/js/control-bar/fullscreen-toggle.js",
  "src/js/control-bar/progress-control.js",
  "src/js/control-bar/volume-control.js",
  "src/js/control-bar/mute-toggle.js",
  "src/js/control-bar/volume-menu-button.js",
  "src/js/poster.js",
  "src/js/loading-spinner.js",
  "src/js/big-play-button.js",
  "src/js/media/media.js",
  "src/js/media/html5.js",
  "src/js/media/flash.js",
  "src/js/media/loader.js",
  "src/js/tracks.js",
  "src/js/json.js",
  "src/js/setup.js",
  "src/js/plugins.js",
  'test/unit/*.js'
];

// preprocessors = {
//   'src/js/*.js': 'coverage'
// };
// reporters = ['coverage'];

plugins = ['karma-qunit', 'karma-chrome-launcher'];
