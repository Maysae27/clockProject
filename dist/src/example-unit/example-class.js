/**
 * This class has a very nice and complex method allowing to manipulate a given number.
 */
var MyClass = /** @class */ (function () {
    function MyClass(aNumber) {
        this.aNumber = aNumber;
    }
    /**
     * Returns a number for very important reasons, obviously.
     */
    MyClass.prototype.get = function () {
        return this.aNumber;
    };
    return MyClass;
}());
export { MyClass };
