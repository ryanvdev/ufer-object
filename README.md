# deepCompare

## 1. Compare objects

```ts
import { deepCompare } from 'ufer-object';

const objA = {
    a: {
        a: 1,
        b: 2,
        c: [1,2,3,4,5,6,NaN,Infinity]
    },
    b: NaN,
    c: [1,2,3,4,5],
    d: () => {
        return 'ok';
    },
    e: null,
    f: '',
    g: 'ok'
}

const objB = {
    b: NaN,
    c: [1,2,3,4,5],
    a: {
        c: [1,2,3,4,5,6,NaN,Infinity],
        a: 1,
        b: 2,
    },
    d: () => {
        return 'ok';
    },
    e:null,
    f: '',
    g: 'ok'
}

const objC = {
    a: {
        c: [1,2,3,4,5,6,NaN,Infinity],
        a: 1,
        b: 2,
    },
}

deepCompare(objA, objB); // return true
deepCompare(objA, objB, {...objA}, {...objB}); // return true

deepCompare(
    objA,
    objB,
    {...objA, newKey: 'value'}, // add a newKey
    {...objB}
); // return false

deepCompare(objA, objC); // return false;
deepCompare(objA.a, objC.a); // return true

```

## 2. Compare arrays
```ts
import {deepCompare} from 'ufer-object';

const arr1 = [1, 2, 'a', {a:1, b:2}, NaN];
const arr2 = [1, 2, 'a', {a:1, b:2}, NaN];
const arr3 = [1, 2, 3, 4, 5];

deepCompare(arr1, arr2); // return true;
deepCompare(arr1, arr2, [...arr1]); // return true;
deepCompare(arr1, arr3); // return false;
```

## 3. Compare objects and arrays

```ts
const objectLikeArray = {
    0: 1,
    1: 2,
    2: 'a',
    3: {a:1, b:2},
    4: NaN,
    length: 5
};

const arr1 = [1, 2, 'a', {a:1, b:2}, NaN];
const arr2 = [1, 2, 'a', {a:1, b:2}, NaN];

deepCompare(objectLikeArray, arr1); // return false;
deepCompare(arr1, arr2); // return true;
```

## 4. Compare everything you want
```ts
import {deepCompare} from 'ufer-object';

const d1:Date = new Date('2023-01-01T20:31:51.124Z');
const d2:Date = new Date('2023-01-01T20:31:51.124Z');
const toDay:Date = new Date();
const arr = [1, 2, 'a', {a:1, b:2}, NaN];
const obj = {a:1, b:2}

deepCompare(d1, d2); // return true;
deepCompare(d1, d2, new Date('2023-01-01T20:31:51.124Z')); // return true;
deepCompare(d1, toDay); // return false;
deepCompare(d1, arr); // return false;

// compare NaN
(NaN === NaN) // return false
deepCompare(NaN, NaN); // return true  

// 
deepCompare(Infinity, Infinity); // return true;
deepCompare(Infinity, toDay); // return false;
```

```ts
import {deepCompare} from 'ufer-object';

class Cat {
    private _name:string;
    public constructor(name:string){
        this._name = name;
    }

    public printName(){
        console.log(this._name);
    }
}

class Duck {
    private _name:string;
    public constructor(name:string){
        this._name = name;
    }

    public printName(){
        console.log(this._name);
    }
}

class Dog {
    private _name:string;

    public constructor(name:string){
        this._name = name;
    }

    public get name(){
        return this._name;
    }

    public set name(v:string){
        this._name = v;
    }

    public printName(){
        console.log(this._name);
    }
}

deepCompare(
    new Cat('Daisy'),
    new Cat('Daisy')
); // return true;



deepCompare(
    new Cat('Daisy'),
    new Dog('Daisy')
); // return false;



const rosieDog = new Dog('Rosie');
const sunnyDog = new Dog('Sunny');


// before change the name of the sunnyDog.
deepCompare(rosieDog, sunnyDog); // return false;

sunnyDog.name = 'Rosie'; 

// after change the name of the sunnyDog.
deepCompare(rosieDog, sunnyDog); // return true; 
// because after renaming all properties in rosieDog are same as all properties in sunnyDog and all methods in rosieDog are same as all method sunnyDog.

```

# deepCopy

## 1. deep-copy everything you want

```ts
// deep-copy date ==========================
const someday:Date = new Date('2023-01-01T20:31:51.124Z');
deepCopy(someday);


// deep-copy an object ==========================
const originalObject = {
    a: {
        c: [1,2,3,4,5,6,NaN,Infinity],
        a: 1,
        b: 2,
    },
}
const copiedObject = deepCopy(originalObject);

console.log(copiedObject.a === originalObject.a) // false

// copiedObject.a.b === 2
console.log(copiedObject.a.b === originalObject.a.b) // true



// copy a array ==========================
deepCopy([1, 2, 3, 4, 5, NaN, '7', {a: 1, b: 2}, ]);


// WARNING: Not support deep-copy instance of object which created by custom-class. Consider the following example:
        // const rosieDog = new Dog('Rosie');
        // deepCopy(rosieDog) // ! NOT-SUPPORT
```