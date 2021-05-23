/*Eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules, special libraries to load modules on demand
To name some (for historical reasons):

AMD – one of the most ancient module systems, initially implemented by the library require.js.
CommonJS – the module system created for Node.js server.
UMD – one more module system, suggested as a universal one, compatible with AMD and CommonJS.
Now all these slowly become a part of history, but we still can find them in old scripts.

What is a module?
A module is just a file. One script is one module. As simple as that.

Modules can load each other and use special directives export and import to interchange functionality, call functions of one module from another one:

export keyword labels variables and functions that should be accessible from outside the current module.
import allows the import of functionality from other modules.



*/
