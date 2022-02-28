declare type Tree<A> = Leaf<A> | Branch<A>;
declare class Leaf<A> {
    tag: 'leaf';
    readonly value: A;
    constructor(value: A);
}
declare class Branch<A> {
    tag: 'branch';
    readonly left: Tree<A>;
    readonly right: Tree<A>;
    constructor(left: Tree<A>, right: Tree<A>);
}
declare const isLeaf: <A>(t: Tree<A>) => t is Leaf<A>;
declare const isBranch: <A>(t: Tree<A>) => t is Branch<A>;
declare const size: <A>(tree: Tree<A>) => number;
declare const max: (tree: Tree<number>) => number;
declare const depth: <A>(tree: Tree<A>) => number;
declare const map: <A, B>(f: (a: A) => B, tree: Tree<A>) => Tree<B>;
declare const mapCurry: <A, B>(f: (a: A) => B) => (tree: Tree<A>) => Tree<B>;
declare class BranchOptional<A> {
    tag: 'branchOptional';
    readonly left?: TreeOptional<A>;
    readonly right?: TreeOptional<A>;
    constructor(option: {
        left?: TreeOptional<A>;
        right?: TreeOptional<A>;
    });
}
declare type TreeOptional<A> = Leaf<A> | BranchOptional<A>;
declare const isBranchOptional: <A>(t: TreeOptional<A>) => t is BranchOptional<A>;
declare const filter: <A>(f: (val: A) => boolean, tree?: TreeOptional<A> | undefined) => TreeOptional<A> | undefined;
declare const zip: <A, B>(tree1: Tree<A>, tree2: Tree<B>) => Tree<(A | B)[]> | undefined;
//# sourceMappingURL=index.d.ts.map