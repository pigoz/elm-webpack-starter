var processCss = requireFromLocalOrParent('css-loader/lib/processCss');
var loaderUtils = require('loader-utils');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var _ = require('lodash');

module.exports = function(source, map) {
  if (this.cacheable)
    this.cacheable();

  var query = loaderUtils.parseQuery(this.query);

  var processOpts = {
    mode: 'local',
    loaderContext: {
      options: {
        context: this.options.context
      },
      loaderIndex: this.loaderIndex - 1,
      resource: this.resource,
      loaders: this.loaders,
      request: this.request,
      resourcePath: this.resourcePath
    },
    query: query
  }

  var resourcePath = this.resourcePath;

  processCss(source, null, processOpts, function(err, result) {
    if (err)
      throw err;

    var moduleName = getElmModuleName(resourcePath);
    var module = getElmModule(resourcePath, result.exports);
    var outputFile = path.join(__dirname, 'src/Styles/', moduleName + '.elm');

    console.log('writing elm module to: ', outputFile);
    console.log(module);

    fs.writeFile(outputFile, module);
  });

  return source;
};

function getElmModule(path, exports) {
  var header = 'module Styles.' + getElmModuleName(path) + ' where';
  var vars = _.map(exports, function(value, key) {
    return key + "Cls = " + '"' + value + '"';
  }).join("\n");
  return [header, "", vars].join("\n");
}

function getElmModuleName(resourcePath) {
  var ext = path.extname(resourcePath);
  var base = path.basename(resourcePath, ext);
  return _.capitalize(base);
}

// Needed to make require work with `npm link` since `css-loader`
// is a peerDependency
function requireFromLocalOrParent(id) {
  var parent = module;
  for (; parent; parent = parent.parent) {
    try {
      return parent.require(id);
    } catch(ex) {}
  }
  throw new Error("Cannot find module '" + id + "'");
};
