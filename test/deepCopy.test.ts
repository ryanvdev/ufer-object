import {deepCopy} from "../src";

describe('deepCopy', () => {
    test('should be true', () => {
        const originalObject = {
            a: 1,
            b: 2, //! test 
            c: 3,
            d: {
                a: 1, //! test 
                b: 2,
                c: 3,
                arr: [
                    1, //! test 
                    '2', //! test 
                    3, //! test 
                    NaN, //! test 
                    Infinity //! test 
                ]
            },
            f: new Date()
        };

        const copied = deepCopy(originalObject);
        copied.b = 1000;
        copied.d.a = 1000;
        copied.d.arr[0] = 1000;
        copied.d.arr[2] = 1000;
        copied.d.arr[3] = 1000;
        copied.d.arr[4] = 1000;

        const result = [
            copied.d.c === 3,
            copied.d.arr[1] === '2',
            //
            copied.f !== originalObject.f,
            copied.f.toJSON() === originalObject.f.toJSON(),
            originalObject.d.arr !== copied.d.arr,
            //
            originalObject.b === 2,
            originalObject.d.a === 1,
            originalObject.d.arr[0] === 1,
            originalObject.d.arr[1] === '2',
            originalObject.d.arr[2] === 3,
            isNaN(originalObject.d.arr[3] as any),
            originalObject.d.arr[4] === Infinity,
        ].every(item => (item === true));

        expect(result).toBe(true);
    });




    test('should be true', () => {
        const originalArray = [
            '1',
            2, //! 1
            3,
            {
                a: 1, //!
                b: 2,
                c: 3,
                arr: [1,'2',3,NaN,Infinity] //! 2
            },
            NaN
        ];

        const copied = deepCopy(originalArray);
        copied[1] = 1000;
        (copied[3] as any).a = 1000;
        (copied[3] as any).arr[2] = 1000;

        const result = [
            (copied[3] as any).arr.at(-1) === Infinity,
            isNaN(copied.at(-1) as any),
            (copied[3] as any).c === 3,
            //============
            originalArray[1] === 2,
            (originalArray[3] as any).a === 1,
            (originalArray[3] as any).arr[2] === 3,
        ].every(item => (item === true));

        expect(result).toBe(true);
    });


    test('should be true', () => {
        const d = new Date();
        const dClone = deepCopy(d);

        const result = [
            d !== dClone,
            d.toJSON() === dClone.toJSON()
        ].every(item => (item === true));

        expect(result).toBe(true);
    });

});