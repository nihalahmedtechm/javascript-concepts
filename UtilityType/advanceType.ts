//////////////// Partial type/////////////

//Constructs a type with all properties of Type set to optional.

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 :Todo= {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

alert(JSON.stringify(todo2))


/////////////////////Required<Type>/////////////
/*Constructs a type consisting of all properties of Type set to required. The opposite of Partial.
*/

interface Person {
  name: string;
  email?: string;
}

const obj: Person = { name:'test' };
const obj2: Required<Person> = { name: 'test1'};
//Error : Property 'email' is missing in type '{ name: string; }' but required in type 'Required<Person>'.(2741)
