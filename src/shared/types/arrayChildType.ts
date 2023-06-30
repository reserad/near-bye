export type ArrayChildType<Type> = Type extends Array<infer Item> ? Item : Type;
