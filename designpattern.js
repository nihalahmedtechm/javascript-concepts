///====> JavaScript treats functions as first-class citizens, meaning you can pass functions
// as parameters to other functions
/// just like you would any other variable.


function performOperation(a, b, cb) {
    let c = a + b;
    cb(c);
}


performOperation(10, 20, function (result) {
    console.log(result)
})


////////////// java script design pattern//////////////////////////

/*1) Constructor Pattern

When thinking about classical object-oriented languages, a constructor is a special function in a class
which initializes an object with some set of default and/or sent-in values.

Common ways to create objects in JavaScript are the three following ways:

*/

// either of the following ways can be used to create a new object
const instance1 = {};
// or
const instance2 = Object.create(Object.prototype);
// or
const instance3 = new Object();

instance1.key = 'Nihal Ahmed';
//or 
instance1['name'] = 'Ahmed';

Object.defineProperty(instance1, 'address', {
    value: 'Pune',
    writable: true,
    configurable: true,
    enumerable: true
})

// setting multiple properties using Object.defineProperties
Object.defineProperties(instance1, {
    "firstKey": {
        value: "First key's value",
        writable: true
    },
    "secondKey": {
        value: "Second key's value",
        writable: false
    }
});


/*
we can use the function as a constructor and initialize its
properties the same way we would with a classic language constructor.
*/


function Person(name, age, isDeveloper) {
    this.name = name;
    this.age = age;
    this.isDeveloper = isDeveloper || false;
    this.writesCode = function () {
        console.log(this.isDeveloper ? "This person does write code" : "This person does not write code")
    }
}


const person1 = new Person('Nihal Ahmed', 20, true)
const person2 = new Person('Nihal Ahmed', 20)
person1.writesCode();
person2.writesCode();


/*
 The problem with the previous approach is that the method writesCode gets
  redefined for each of the instances of the Person constructor.
  We can avoid this by setting the method into the function prototype:
*/

Person.prototype.writesCode1 = function () {
    console.log(this.isDeveloper ? "This person does write code" : "This person does not write code")
}

person1.writesCode1();
person2.writesCode1();

/** Out put
 * This person does write code
This person does not write code
This person does write code
This person does not write code
 */


/////////////////Module Pattern//////////////////////////
/**
 * As far as peculiarities go, JavaScript never ceases to amaze. Another peculiar
 *  thing to JavaScript (at least as far as object-oriented languages go) 
 * is that JavaScript does not support access modifiers.
 *  In a classical OOP language, a user defines a class and determines 
 * access rights for its members. Since JavaScript in its plain form supports neither
 *  classes nor access modifiers, JavaScript developers figured out a way to mimic this behavior when needed.

Before we go into the module pattern specifics, let’s talk about the concept of closure. 
A closure is a function with access to the parent scope, even after the parent function has closed.
They help us mimic the behavior of access modifiers through scoping. Let’s show this via an example:
 */


const counterFun = (() => {
    let counter = 1;
    return () => {
        return counter++;
    }
})()

console.log(counterFun())
console.log(counterFun());
console.log(counterFun());

/**
 * As you can see, by using the IIFE(Immediately-Invoked-Function-Expressions), we have tied the counter variable to a function which was invoked
 *  and closed but can still be accessed by the child function that increments it.
 *  Since we cannot access the counter variable from outside of the function expression,
 *  we made it private through scoping manipulation.

Using the closures, we can create objects with private and public parts. 
These are called modules and are very useful whenever we want to hide certain parts of an object
 and only expose an interface to the user of the module. Let’s show this in an example:


  (function() {

    // declare private variables and/or functions

    return {
        // declare public variables and/or functions
    }

})();

 */


const collection = (() => {
    let objects = [];
    return {
        addObject: function (object) {
            objects.push(object);
        },
        removeObject: function (object) {
            let index = objects.indexOf(object);
            if (index >= 0) {
                objects.splice(index, 1)
            }

        },
        getObjects: function () {
            return JSON.parse(JSON.stringify(objects))
        }
    }
})();

collection.addObject('Nihal');
collection.addObject('Jalal');
console.log(collection.getObjects())
collection.removeObject('Jalal');
console.log(collection.getObjects())

/** output
 * [ 'Nihal', 'Jalal' ]
  [ 'Nihal' ]
 */

/////////////Revealing Module Pattern/////////
/**
 * This pattern is an improvement made to the module pattern as illustrated above.
 *  The main difference is that we write the entire object logic in the private scope
 * of the module and then simply expose the parts we want to be public by returning an
 * anonymous object. We can also change the naming of
 *  private members when mapping private members to their corresponding public members
 */


const collectionRevealing = (function () {

    let objects = [];

    const addObject = function (object) {
        objects.push(object);
    }
    const removeObject = function (object) {
        let index = objects.indexOf(object);
        if (index >= 0) {
            objects.splice(index, 1)
        }

    }
    const getObjects = function () {
        return JSON.parse(JSON.stringify(objects))
    }

    return {
        addName: addObject,
        removeName: removeObject,
        getNames: getObjects
    }

})();

collectionRevealing.addName('Nihal');
collectionRevealing.addName('Jalal');
console.log(collectionRevealing.getNames())
collectionRevealing.removeName('Jalal');
console.log(collectionRevealing.getNames())

/** output
 * [ 'Nihal', 'Jalal' ]
  [ 'Nihal' ]
 */


/////////////////////Singleton Pattern/////////////////////
/**
 * The singleton pattern is used in scenarios when we need exactly one instance of a class. 
 * For example, we need to have an object which contains some configuration for something. In these cases,
 *  it is not necessary to create a new object whenever the configuration object is required
 *  somewhere in the system.
 */


const singleton = (function () {

    let singletonInstance = null;

    function initInstance(options) {
        Object.assign(this, options);
    }
    const getInstance = function (options) {
        if (singletonInstance === null) {
            singletonInstance = new initInstance(options);
            return singletonInstance
        }
        else
            return singletonInstance;
    }

    return { getInstance }

})()


let configObject = singleton.getInstance({ "size": 8, });
console.log(configObject);

let configObject1 = singleton.getInstance({ "size": 10, name: 'Nihal' });
console.log(configObject1);

////////////////////////Observer Pattern/////////////////

/**
 * The observer pattern is a very useful tool when we have a scenario where we need to improve the
 *  communication between disparate parts of our system in an optimized way.
 *  It promotes loose coupling between objects.

There are various versions of this pattern, but in its most basic form, we have
 two main parts of the pattern. The first is a subject and the second is observers
 */

let publisherSubscriber = {};

(function (container) {

    let id = 0;
    container.subscribe = function (topic, cb) {
        if (!(topic in container)) {
            container[topic] = [];
        }
        container[topic].push({
            id: ++id,
            'callback': cb
        })
        return id;
    }
    container.unsubscribe = function (topic, id) {
        let subscribes = [];
        for (let subscriber of container[topic]) {
            if (subscriber.id !== id) {
                subscribes.push(subscriber)
            }
        }
        container[topic] = subscribes;
    }

    container.publish = function (topic, data) {
        for (let subscriber of container[topic]) {
            subscriber.callback(data);
        }
    }
})(publisherSubscriber)


const subscribeId1 = publisherSubscriber.subscribe('click', function (data) {
    console.log('subscribeId1', data)
})

const subscribeId2 = publisherSubscriber.subscribe('doubleClick', function (data) {
    console.log('subscribeId2 double click', data)
})


publisherSubscriber.publish('click', { data: 'click' })
publisherSubscriber.publish('doubleClick', { data: 'doubleClick' });
publisherSubscriber.unsubscribe('doubleClick', subscribeId2);

publisherSubscriber.publish('click', { data: 'click' })
publisherSubscriber.publish('doubleClick', { data: 'doubleClick' });

/**
 * Out put
 * subscribeId1 { data: 'click' }
subscribeId2 double click { data: 'doubleClick' }
subscribeId1 { data: 'click' }
 */


/// ///////////////////////////////////  es 6///////////////////

class ClsPublisherSubscriber {

    constructor() {
        this.id = 0;
        this.container = {};
    }
    subscribe(topic, cb) {

        if (!(topic in this.container)) {
            this.container[topic] = [];
        }
        this.container[topic].push({
            id: ++this.id,
            'callback': cb
        })
        return this.id;
    }
    unsubscribe(topic, id) {
        let subscribes = [];
        for (let subscriber of this.container[topic]) {
            if (subscriber.id !== id) {
                subscribes.push(subscriber)
            }
        }
        this.container[topic] = subscribes;
    }

    publish(topic, data) {
        for (let subscriber of this.container[topic]) {
            subscriber.callback(data);
        }
    }
}

const pubSubInstance = new ClsPublisherSubscriber();

const subscribePubSubId1 = pubSubInstance.subscribe('click', function (data) {
    console.log('subscribePubSubId1', data)
})

const subscribePubSubId2 = pubSubInstance.subscribe('doubleClick', function (data) {
    console.log('subscribePubSubId2 double click', data)
})


pubSubInstance.publish('click', { data: 'click' })
pubSubInstance.publish('doubleClick', { data: 'doubleClick' });

pubSubInstance.unsubscribe('doubleClick', subscribePubSubId2);

pubSubInstance.publish('click', { data: 'click' })
pubSubInstance.publish('doubleClick', { data: 'doubleClick' });


//////////////////////////////////Prototype Pattern///////////////////////
/**
 * As we have already mentioned throughout the article, JavaScript does not support classes in 
 * its native form. Inheritance between objects is implemented using prototype-based programming.

It enables us to create objects which can serve as a prototype for other objects being created.
 The prototype object is used as a blueprint for each object the constructor creates.

As we have already talked about this in the previous sections, let’s show a simple example 
of how this pattern might be used.
 */


////////////////////////////////////////Prototype Pattern///////////////////////////

/**
 * As we have already mentioned throughout the article, JavaScript does not support classes in its native form.
 *  Inheritance between objects is implemented using prototype-based programming.

It enables us to create objects which can serve as a prototype for other objects being created.
 The prototype object is used as a blueprint for each object the constructor creates.

As we have already talked about this in the previous sections, let’s show a simple example of how this pattern 
might be used.
 */


const prototypeObj = {
    sayHi: function () {
        console.log('Hello Hi', this.firstName, this.age);
    },
    showMessage: function () {
        console.log('data show message')
    }
}

function Person1() {
    firstName = 'Nihal';
    age = 20;
    function constructorFunction(firstName, age) {
        this.firstName = firstName;
        this.age = age;
    };
    constructorFunction.prototype = prototypeObj;
    const instance = new constructorFunction(firstName, age);
    return instance;
}


let person22 = new Person1();
let person33 = new Person1("Bob ddd", 38);
person22.sayHi();
person33.sayHi();


/////////////////////////Command Pattern/////////////////
/**
 * The command pattern is useful in cases when we want to decouple objects executing the commands
 *  from objects issuing the commands. For example, imagine a scenario where our application is
 *  using a large number of API service calls. Then, let’s say that the API services change.
 *  We would have to modify the code wherever the APIs
 *  that changed are called.

This would be a great place to implement an abstraction layer, which would separate the objects calling an API 
service from the objects which are telling them when to call the API service. This way, we avoid 
modification in all of the places where we have a need to call the service, but rather have to change 
only the objects which are making the call itself, which is only one place.

As with any other pattern, we have to know when exactly is there a real need for such a pattern.
 We need to be aware of the tradeoff we are making, as we are adding an additional abstraction layer 
 over the API calls, which will reduce performance but potentially save a lot of time when we need to
  modify objects executing the commands.
 */


class Invoker {
    constructor() { }
    add = function (x, y) {
        return x + y;
    };
    subtract = function (x, y) {
        return x - y;
    }
}

class Manager {
    execute = function (name, args) {
         if (name in new Invoker()) {
        return new Invoker()[name].apply(Invoker, [].slice.call(arguments, 1));
         }
     return false;
    }
}

console.log(new Manager().execute('add', 2, 3))
console.log(new Manager().execute('subtract', 10, 5))