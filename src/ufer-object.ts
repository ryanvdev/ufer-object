


export const deepCompareTwoObjects = (a:unknown, b:unknown):boolean => {
    if(a === b) return true;

    const commonType = typeof a;
    if(commonType !== typeof b) return false;

    switch(commonType){
        case 'number': {
            if(isNaN(a as number) && isNaN(b as number)) {
                return true;
            }
            return (a === b);
        }
        case 'string':
        case 'bigint':
        case 'boolean':
        case 'undefined':
        case 'symbol': {
            return (a === b);
        }
        case 'object': {
            //! case null | undefined
            if(a === null || b === null ) return (a === b);
            if(a === undefined || b === undefined) return (a === b);

            //! 
            if(a.constructor !== b.constructor) return false;

            //! case: Date
            if(a instanceof Date) {
                if(!(b instanceof Date)) return false;
                return (a.toJSON() === b.toJSON());
            }

            //! case: Array
            if(Array.isArray(a) || Array.isArray(b)){
                if(!Array.isArray(a)) return false;
                if(!Array.isArray(b)) return false;
                if(a.length !== b.length) return false;

                for(let i = 0; i < a.length; i++){
                    if(deepCompare(a[i], b[i]) === false) return false;
                }

                return true;
            }


            const keysOfA = Object.keys(a);
            const keysOfB = Object.keys(a);
            if(keysOfA.length !== keysOfB.length) return false;

            for(let i = 0; i < keysOfA.length; i++) {
                const key = keysOfA[i];
                if(keysOfB.includes(key) === false) return false;
                
                if(deepCompare((a as any)[key], (b as any)[key]) === false) return false;
            }

            return true;
        }
        case 'function': {
            return (String(a) === String(b));
        }
        default: {
            throw new Error(`[deepCompare] Cannot resolve type of object is ${commonType}`);
        }
    }
}


export const deepCompare = (firstSubject:unknown, secondSubject:unknown, ...subjects:unknown[]):boolean => {
    if(deepCompareTwoObjects(firstSubject, secondSubject) === false) return false;

    for(let i = 0; i < subjects.length; i++){
        if(deepCompareTwoObjects(firstSubject, subjects[i]) === false) return false;
    }
    
    return true;
}

export const deepCopy = <T>(obj:T):T => {
    switch(typeof obj){
        case 'number':
        case 'string':
        case 'bigint':
        case 'boolean':
        case 'undefined':
        case 'function':
        case 'symbol': {
            return obj;
        }
        case 'object': {
            //! case null | undefined
            if(obj === null) return null as T;
            if(obj === undefined) return undefined as T;

            //! case: Date
            if(obj instanceof Date) {
                return (new Date(obj.toJSON())) as T;
            }

            //! case: Array
            if(Array.isArray(obj)){
                return obj.map((item) => deepCopy(item)) as T;
            }

            //! case Object
            const keys = Object.keys(obj);
            // keys.sort();
            return keys.reduce((sum, key)=>{
                sum[key] = deepCopy((obj as any)[key]);
                return sum;
            }, {} as any);
        }
        default: {
            throw new Error(`[deepCompare] Cannot resolve type of object is ${typeof obj}`);
        }
    }
}
