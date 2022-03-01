export declare type Tree<A> = Leaf<A> | Branch<A>;
export declare class Leaf<A> {
    tag: 'leaf';
    readonly value: A;
    constructor(value: A);
}
export declare class Branch<A> {
    tag: 'branch';
    readonly left: Tree<A>;
    readonly right: Tree<A>;
    constructor(left: Tree<A>, right: Tree<A>);
}
export declare const isLeaf: <A>(t: Tree<A>) => t is Leaf<A>;
export declare const isBranch: <A>(t: Tree<A>) => t is Branch<A>;
export declare const size: <A>(tree: Tree<A>) => number;
export declare const max: (tree: Tree<number>) => number;
export declare const depth: <A>(tree: Tree<A>) => number;
export declare const map: <A, B>(f: (a: A) => B, tree: Tree<A>) => Tree<B>;
export declare const mapCurry: <A, B>(f: (a: A) => B) => (tree: Tree<A>) => Tree<B>;
export declare class BranchOptional<A> {
    tag: 'branchOptional';
    readonly left?: TreeOptional<A>;
    readonly right?: TreeOptional<A>;
    constructor(option: {
        left?: TreeOptional<A>;
        right?: TreeOptional<A>;
    });
}
export declare type TreeOptional<A> = Leaf<A> | BranchOptional<A>;
export declare const isBranchOptional: <A>(t: TreeOptional<A>) => t is BranchOptional<A>;
export declare const filter: <A>(f: (val: A) => boolean, tree?: TreeOptional<A> | undefined) => TreeOptional<A> | undefined;
export declare const zip: <A, B>(tree1: Tree<A>, tree2: Tree<B>) => Tree<(A | B)[]> | undefined;
//# sourceMappingURL=index.d.ts.map