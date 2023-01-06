export type DeepFreezeObject<T> = {
    readonly [P in keyof T]: DeepFreeze<T[P]>;
}

export type DeepFreezeArray<T> = ReadonlyArray<DeepFreeze<T>>;

export type DeepFreeze<T> = T extends (infer R)[] ? DeepFreezeArray<R> : (
    T extends Function ? T : (
        T extends object ? DeepFreezeObject<T> : T
    )
)
