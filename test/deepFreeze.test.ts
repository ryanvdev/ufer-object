import { deepFreeze } from "../lib";

describe('deepFreeze', ()=>{
    test('should be true', () => {
        const a = {
            a: 1,
            b: 2,
            c: {
                a: 1,
                b: 2,
                c: [
                    0,
                    1,
                    {
                        a: 1,
                        b: 2
                    },
                    3
                ]
            }
        }


        const results:boolean[] = [];

        results.push(
            Object.isFrozen(a) === false,
            Object.isFrozen(a.c) === false,
            Object.isFrozen(a.c.c) === false,
            Object.isFrozen(a.c.c[2]) === false
        )


        deepFreeze(a) as typeof a;

        results.push(
            Object.isFrozen(a),
            Object.isFrozen(a.c),
            Object.isFrozen(a.c.c),
            Object.isFrozen(a.c.c[2])
        );

        expect(results.every(item => (item === true))).toBe(true);

    });

    test('should be true', () => {
        const a = [
            0,
            1,
            2,
            3,
            new Date(),
            {
                a: 1,
                b: 2,
                c: [0, '1', null, undefined, 4, {a: 1, b: '2'}]
            },
            6
        ] as any;

        const results:boolean[] = [];

        results.push(
            Object.isFrozen(a) === false,
            Object.isFrozen(a[5]) === false,
            Object.isFrozen(a[5].c) === false,
            Object.isFrozen(a[5].c[5]) === false
        )


        deepFreeze(a) as typeof a;

        results.push(
            Object.isFrozen(a),
            Object.isFrozen(a[5]),
            Object.isFrozen(a[5].c),
            Object.isFrozen(a[5].c[5])
        )

        expect(results.every(item => (item === true))).toBe(true);
    });
})