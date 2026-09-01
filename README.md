# @catstral/clone
A custom cloning class for JavaScript/TypeScript.

This will handle (almost) all primitives for cloning (see [here](#cloning-exceptions) for exceptions).

Anyting that isn't handled, can either be handled by registering a new handler, if no handler exists the value will be passed back as is (or cause an error to be thrown in strict cloning).

## TOC
* [Cloner](#cloner)
  * [`static registerHandler(handler)`](#static-registerhandlerhandler)
  * [`static setHandler(id, handler)`](#static-sethandlerid-handler)
  * [`static removeHandler(id)`](#static-removehandlerid)
  * [`static from(cloner)`](#static-fromcloner)
  * [`registerHandler(handler)`](#registerhandlerhandler)
  * [`setHandler(id, handler)`](#sethandlerid-handler)
  * [`removeHandler(id)`](#removehandlerid)
  * [`clone(value, strict?)`](#clonestrictvalue)
  * [`cloneStrict(value)`](#clonestrictvalue)
* [Utility functions](#utility-functions)
  * [`clone(value, strict?)`](#clonevalue-strict-1)
  * [`cloneStrict(value)`](#clonestrictvalue-1)
* [Cloning exceptions](#cloning-exceptions)
  * [GlobalThis](#globalthis)
  * [Function](#function)
  * [Math](#Math)
  * [WeakMap](#weakmap)
  * [WeakSet](#weakset)
  * [WeakRef](#weakref)
  * [FinalizationRegistry](#finalizationregistry)


## Cloner
### `static registerHandler(handler)`
A method to register a handler to the global registry. Upon initializing the [Cloner](#cloner) this registry is the moved to that initialized `Cloner`.

If an ID is given to the handler, it can later be replaced or removed from the registry.

If an ID is given to the handler, but a handler already exists with that ID, it will throw an error, if you mean to replace the handler instead, see [setHandler](#static-sethandlerid-handler).

> This method has an overload:  
> `static registerHandler(checker, clone)`

### `static setHandler(id, handler)`
A method to set a handler in the global registry. Upon initializing the [Cloner](#cloner) this registry is the moved to that initialized `Cloner`.

Any handler set here can be replaced or removed by that same ID later.

If the given ID to the handler is not the same as the ID given to the function, it will throw an error.

### `static removeHandler(id)`
A method to remove a handler from the global registry based on the ID.

### `static from(cloner)`
A method to construct a new [Cloner](#cloner) based on the registry of given cloner.

### `registerHandler(handler)`
A method to register a handler to the global registry.

If an ID is given to the handler, it can later be replaced or removed from the registry.

If an ID is given to the handler, but a handler already exists with that ID, it will throw an error, if you mean to replace the handler instead, see [setHandler](#sethandlerid-handler).

> This method has an overload:  
> `registerHandler(checker, clone)`

### `setHandler(id, handler)`
A method to set a handler in the registry.

Any handler set here can be replaced or removed by that same ID later.

If the given ID to the handler is not the same as the ID given to the function, it will throw an error.

### `removeHandler(id)`
A method to remove a handler from the global registry based on the ID.

### `clone(value, strict?)`
A method to clone a value.

If a value does not have a handler, it will instead be passed back as is.

Also accepts a flag on if the cloning should be strict, meaning that if the values (or nested value) does not have a cloning handler, it will throw an error instead of passing the original value back.

### `cloneStrict(value)`
A method to clone a value.

If the values (or nested value) does not have a cloning handler, it will throw an error.

## Utility functions
### `clone(value, strict?)`
A wrapper function around the [Cloner](#cloner) that creates a new `Cloner` and then clones the given value.

Also accepts a flag on if the cloning should be strict, meaning that if the values (or nested value) does not have a cloning handler, it will throw an error instead of passing the original value back.

### `cloneStrict(value)`
A wrapper function around the [Cloner](#cloner) that creates a new `Cloner` and then clones the given value.

If the values (or nested value) does not have a cloning handler, it will throw an error.

## Cloning exceptions
This is a list of exceptions for the [Cloner](#cloner).

If any of these values are found in strict mode, it will cause the cloner to throw.

### GlobalThis
The [GlobalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GlobalThis) global does not have a constructor, since this cloner is constructor dependend, this cannot be deepcloned.

### Function
A [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) cannot be fully read out enough to allow it to be re-constructed. It does not allow reading anything about the arguments or the details of the function body. Therefore this cannot be recreated from scratch and cannot be deep cloned.

### Math
The [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) global is a namespace, not an object. All values and methods are static and `Math` cannot be constructed, since this cloner is constructor dependend, this cannot be deepcloned.

### WeakMap
A [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) doesn't allow reading all the values. Because a `WeakMap` doesn't allow observing the liveness of its keys it also doesn't allow enumeration over said keys, making it impossible to fully deep clone.

### WeakSet
A [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) doesn't allow reading all the values. Because a `WeakSet` depends on the javascript garbage collector to determine the list of values it holds, it is enumerable and therefore cannot be deep cloned.

### WeakRef
A [WeakRef](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef) is a weak reference to another object, allowing that object to be collected by the garbage collector, this means that deep cloning this value would break the reference it has created as by the time it is handled for deep cloning, the value being referenced may no longer exists and therefore cannot be referenced anymore, preventing re-construction of the `WeakRef`.

### FinalizationRegistry
A [FinalizationRegistry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry) doesn't allow getting the cleanup callback that is used to construct the registry. It is also a really complicated feature to handle correctly as it has to interact with the garbage collector.

