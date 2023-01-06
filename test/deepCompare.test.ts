import { deepCompare } from "../lib";



describe('deepCompare', ()=>{
    //! Test Object
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

    test('should be equals', () => {
        expect(deepCompare(objA, objB)).toBe(true);
    });

    test('should be equals', () => {
        expect(deepCompare(objA.a, objC.a)).toBe(true);
    });

    test('should be not-equals', () => {
        expect(deepCompare(objA, objC)).toBe(false);
    });



    //! Check array

    const arrA = [1,2,3,4,5];
    const arrB = [1,2,3,4,5];
    const arrC = [1,2,3];

    test('should be not-equals', () => {
        expect(deepCompare(arrA, arrC)).toBe(false);
    });


    const arrD1 = [1, 2, 'a', {a:1, b:2}, NaN];
    const arrD2 = [1, 2, 'a', {a:1, b:2}, NaN];
    test('should be equals', () => {
        expect(deepCompare(arrD1, arrD2)).toBe(true);
    });


    //! Check objeck like array
    const arrE1 = {
        0: 1,
        1: 2,
        2: 'a',
        3: {a:1, b:2},
        4: NaN,
        length: 5
    };

    test('should be not-equals', () => {
        expect(deepCompare(arrE1, arrD1)).toBe(false);
    });


    //! Check function
    const funcA = () => {
        return 'ok';
    }
    const funcB = () => {
        return 'ok';
    }
    const funcC = () => {
        return 'ok2';
    }

    test('should be equals', () => {
        expect(deepCompare(funcA, funcB)).toBe(true);
    });

    test('should be not-equals', () => {
        expect(deepCompare(funcA, funcC)).toBe(false);
    });

    //! Check Date
    const dateA = new Date('2023-01-01T20:31:51.124Z');
    const dateB = new Date('2023-01-01T20:31:51.124Z');
    const toDay = new Date();

    test('should be equals', () => {
        expect(deepCompare(dateA, dateB)).toBe(true);
    });

    test('should be not-equals', () => {
        expect(deepCompare(dateA, toDay)).toBe(false);
    });

    //! Re-Check
    const originalArray = [1,2,3,4];
    const cloneArray = [...originalArray];

    test('should be equals', () => {
        expect(deepCompare(originalArray, cloneArray)).toBe(true);
    });

    test('should be not-equals', () => {
        expect(deepCompare(NaN, cloneArray)).toBe(false);
    });

    test('should be equals', () => {
        expect(deepCompare(NaN, NaN)).toBe(true);
    });

    test('should be equals', () => {
        expect(deepCompare(objA, objB, {...objB}, {...objA})).toBe(true);
    });

    test('should be not-equals', () => {
        expect(deepCompare(objA, objB, {...objB}, {...arrA, z: 1}, {...objA})).toBe(false);
    });
});