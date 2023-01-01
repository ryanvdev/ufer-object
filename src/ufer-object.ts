
export type ComparisonResults = 'equals' | 'not-equals' | 'unknown';

export const valueTypes = Object.freeze(["string", "number", "bigint", "boolean", "symbol", "undefined"]);

export const deepCompare = (a:unknown, b:unknown):ComparisonResults => {
    if(a === b) return 'equals';

    const commonType = typeof a;
    if(commonType !== typeof b) return 'not-equals';

    //! case NaN
    if(commonType === 'number'){
        if(isNaN(a as number) && isNaN(b as number)){
            return 'equals';
        }

        if(a === b) return 'equals';
        return 'not-equals';
    }

    //! case value types
    if(valueTypes.includes(commonType)) {
        if(a === b) return 'equals';
        return 'not-equals';
    }

    //! case function
    if(commonType === 'function'){
        if(String(a) === String(b)) return 'equals';
        return 'not-equals';
    }

    //! case null
    if(a === null || b === null){
        if(a === b) return 'equals';
        return 'not-equals';
    }

    //! case: Date
    if(a instanceof Date) {
        if(!(b instanceof Date)) return 'not-equals';

        if(a.toJSON() === b.toJSON()) return 'equals';
        
        return 'not-equals';
    }

    //! case Array
    if(Array.isArray(a) || Array.isArray(b)){
        if(!Array.isArray(a)) return 'not-equals';
        if(!Array.isArray(b)) return 'not-equals';

        if(a.length !== b.length) return 'not-equals';

        for(let i = 0; i < a.length; i++){
            const result = deepCompare(a[i], b[i]);
            if(result !== 'equals') return result;
        }

        return 'equals';
    }

    //! case Object
    if(a instanceof Object){
        if(!(b instanceof Object)) return 'not-equals';

        const keysOfA = Object.keys(a);
        const keysOfB = Object.keys(a);

        if(keysOfA.length !== keysOfB.length) return 'not-equals';

        for(let i = 0; i < keysOfA.length; i++) {
            const key = keysOfA[i];
            if(keysOfB.includes(key) === false) return 'not-equals';

            const result = deepCompare(
                (a as any)[key],
                (b as any)[key]
            );

            if(result !== 'equals') return result;
        }

        return 'equals';
    }
    
    return 'unknown';
}

export const deepCopy = <T>(obj:T):T => {
    const objType = typeof obj;

    //! case value types
    if(valueTypes.includes(objType)) {
        return obj;
    }
    
    //! case function
    if(objType === 'function'){
        return obj;
    }

    //! case null
    if(obj === null){
        return (null as T);
    }

    //! case: Date
    if(obj instanceof Date) {
        return (new Date(obj.toJSON())) as T;
    }

    //! case Array
    if(Array.isArray(obj)){
        return obj.map((item) => deepCopy(item)) as T;
    }

    //! case Object
    if(obj instanceof Object){
        const keys = Object.keys(obj);
        keys.sort();

        return keys.reduce((sum, key)=>{
            sum[key] = deepCopy((obj as any)[key]);
            return sum;
        }, {} as any);
    }
    
    return obj;
}
