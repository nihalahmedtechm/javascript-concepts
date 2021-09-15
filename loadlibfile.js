// A homemade module loader
// To explain how this works, let's build a similar system from scratch. The code that follows creates a function that mimics a subset of the functionality of the original require() function of Node.js.

// Let's start by creating a function that loads the content of a module, wraps it into a private scope, and evaluates it:

function loadModule(filename, module, require) {
  var wrappedSrc =
    '(function(module, exports, require) {' +
      fs.readFileSync(filename, 'utf8') +
    '})(module, module.exports, require);';
  eval(wrappedSrc);
}
