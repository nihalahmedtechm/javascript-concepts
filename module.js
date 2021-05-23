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

To summarize, the core concepts are:

A module is a file. To make import/export work, browsers need <script type="module">. Modules have several differences:
    Deferred by default.
    Async works on inline scripts.
    To load external scripts from another origin (domain/protocol/port), CORS headers are needed.
    Duplicate external scripts are ignored.
    Modules have their own, local top-level scope and interchange functionality via import/export.
    Modules always use strict.
Module code is executed only once. Exports are created once and shared between importers.
When we use modules, each module implements the functionality and exports it. Then we use import to directly import it where it’s needed. The browser loads and evaluates the scripts automatically.

In production, people often use bundlers such as Webpack to bundle modules together for performance and other reasons.

In the next chapter we’ll see more examples of modules, and how things can be exported/imported.

*/

//Dynamic imports //

// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}

//Then dynamic import can be like this:
let {hi, bye} = await import('./say.js');

hi();
bye();

/////////Generators////

 function* display() {    
     yield 1;
     yield 2;
     return 3;
 }

 let disp= display();


 console.log(disp.next().value)
 console.log(disp.next().value)


// //// Generators are iterable ////////

for (const iterator of disp) {
    console.log(iterator,'test')
}

///////////////////////////////

function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield console.log(i)
}

let data = generateSequence(0, 5);
const f2 = async () => {
    for (let index = 1000; index < 1005; index++) {
        setTimeout(async () => {
            await data.next()
        }, index);

    }
}
f2().then(() => {

})
