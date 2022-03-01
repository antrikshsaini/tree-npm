/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
/**
 * Type Declaration
 */

export type Tree<A> = Leaf<A> | Branch<A>;

export class Leaf<A> {
    tag: 'leaf' = 'leaf';
    readonly value: A;

    constructor(value: A) {
        this.value = value;
    }
}

export class Branch<A> {
    tag: 'branch' = 'branch';
    readonly left: Tree<A>;
    readonly right: Tree<A>;

    constructor(left: Tree<A>, right: Tree<A>) {
        this.left = left;
        this.right = right;
    }
}

/**
 * Type Guards
 */

export const isLeaf = <A>(t: Tree<A>): t is Leaf<A> => {
    return t.tag === 'leaf';
};
export const isBranch = <A>(t: Tree<A>): t is Branch<A> => {
    return t.tag === 'branch';
};

/**
 * Size : Find size of Tree, Total of number of leaf and branch
 *
 * Signature->   size: Tree<A> -> number
 *
 */

export const size = <A>(tree: Tree<A>): number => {
    if (isLeaf(tree)) {
        return 1;
    } else {
        return 1 + size(tree.left) + size(tree.right);
    }
};

/**
 * Implementation Example
 *
const tree: Tree<number> = {
  tag: 'branch',
  left: {tag: 'leaf', value: 8},
  right: {
    tag: 'branch',
    left: {tag: 'leaf', value: 5},
    right: {tag: 'leaf', value: 9},
  },
};
console.log(size(tree)); // 3
 */

/**
 * Max : In a Tree of type number, find Maximum leaf value
 *
 * Signature->   max: Tree<number> -> number
 *
 */

export const max = (tree: Tree<number>): number => {
    let currentMax = 0;
    if (isLeaf(tree)) {
        currentMax = currentMax >= tree.value ? currentMax : tree.value;
    } else {
        const leftMax = max(tree.left);
        const rightMax = max(tree.right);
        currentMax = leftMax >= rightMax ? leftMax : rightMax;
    }
    return currentMax;
};

/**
 * Implementation Example
 *
const tree: Tree<number> = {
  tag: 'branch',
  left: {tag: 'leaf', value: 8},
  right: {
    tag: 'branch',
    left: {tag: 'leaf', value: 5},
    right: {tag: 'leaf', value: 9},
  },
};
console.log(max(tree)); //9
 */

/**
 * depth : In a Tree, find the maximum path length from the root node to any leaf
 *
 * Signature->   depth: Tree<A> -> number
 *
 */

export const depth = <A>(tree: Tree<A>): number => {
    if (isLeaf(tree)) {
        return 0;
    } else {
        const depthLeft = 1 + depth(tree.left);
        const depthRight = 1 + depth(tree.right);
        return depthLeft >= depthRight ? depthLeft : depthRight;
    }
};

/**
 * Implementation Example
 *
const tree: Tree<number> = {
  tag: 'branch',
  left: {tag: 'leaf', value: 8},
  right: {
    tag: 'branch',
    left: {tag: 'leaf', value: 5},
    right: {
      tag: 'branch',
      left: {tag: 'leaf', value: 7},
      right: {tag: 'leaf', value: 9},
    },
  },
};

console.log(depth(tree)); // 3
 */

/**
 * map : Creates new Tree, after applying a function to each element in the tree
 *
 * Signature->   map: ((A)-> B) -> Tree<A> -> Tree<B>
 *
 */

export const map = <A, B>(f: (a: A) => B, tree: Tree<A>): Tree<B> => {
    if (isLeaf(tree)) {
        return new Leaf(f(tree.value));
    } else {
        return new Branch(map(f, tree.left), map(f, tree.right));
    }
};

// curry form

export const mapCurry =
    <A, B>(f: (a: A) => B) =>
        (tree: Tree<A>): Tree<B> => {
            if (isLeaf(tree)) {
                return new Leaf(f(tree.value));
            } else {
                return new Branch(map(f, tree.left), map(f, tree.right));
            }
        };

/**
 * Implementation Example
 *
const tree: Tree<number> = {
  tag: 'branch',
  left: {tag: 'leaf', value: 2},
  right: {
    tag: 'branch',
    left: {tag: 'leaf', value: 3},
    right: {tag: 'leaf', value: 4},
  },
};
console.log(map((i) => i + 1, tree));

console.log(mapCurry((i: number) => i + 1)(tree));

//Output
Branch { tag: 'branch',
    left: Leaf { tag: 'leaf', value: 3 },
    right: Branch {
        tag: 'branch',
        left: Leaf { tag: 'leaf', value: 4 },
        right: Leaf { tag: 'leaf', value: 5 }
        }
    }
*
*/

/**
 * filter : Creates a tree or return undefined, based on the condition (basically remove leaf node)
 *
 * Signature->   filter : ((Tree<A>)=> boolean) => Tree<A> | undefined => Tree<A> | undefined
 *
 */

export class BranchOptional<A> {
    tag: 'branchOptional' = 'branchOptional';
    readonly left?: TreeOptional<A>;
    readonly right?: TreeOptional<A>;

    constructor(option: { left?: TreeOptional<A>, right?: TreeOptional<A> }) {
        this.left = option.left;
        this.right = option.right;
    }
}

export type TreeOptional<A> = Leaf<A> | BranchOptional<A>

export const isBranchOptional = <A>(t: TreeOptional<A>): t is BranchOptional<A> => {
    return t.tag === 'branchOptional';
};

export const filter = <A>(
    f: (val: A) => boolean,
    tree?: TreeOptional<A>
): TreeOptional<A> | undefined => {
    if (!tree) return
    if (isBranchOptional(tree)) {
        return new BranchOptional(
            {
                left: filter(f, tree.left),
                right: filter(f, tree.right)
            }
        )
    } else {
        return !f(tree.value) ? tree : undefined
    }

}

/**
 * Implementation Example
 *
const tree: Tree<number> = {
    tag: 'branch',
    left: { tag: 'leaf', value: 2 },
    right: {
        tag: 'branch',
        left: { tag: 'leaf', value: 5 },
        right: { tag: 'leaf', value: 4 },
    },
};
console.log(filter((i) => i === 5, tree))

//Output
Branch {
    tag: 'branch',
    left: Leaf { tag: 'leaf', value: 2 },
    right:
     Branch {
       tag: 'branch',
       left: undefined,
       right: Leaf { tag: 'leaf', value: 4 } } }
 */

/**
 * Zip : creates a new tree out of two supplied trees by pairing up equally-positioned items from both trees
 * Both trees should be of same structure otherwise it would be undefined
 *
 * Signature->   zip: Tree<A> -> Tree<B> -> Tree<Array<A|B>> | undefined
 *
 */

export const zip = <A, B>(
    tree1: Tree<A>,
    tree2: Tree<B>
): Tree<Array<A | B>> | undefined => {
    if (isLeaf(tree1) && isLeaf(tree2)) {
        return new Leaf([tree1.value, tree2.value]);
    } else if (isBranch(tree1) && isBranch(tree2)) {
        const leftZipped = zip(tree1.left, tree2.left);
        const rifhtZipped = zip(tree1.right, tree2.right);
        if (leftZipped && rifhtZipped) return new Branch(leftZipped, rifhtZipped);
    } else {
        return undefined;
    }
};

/**
 * Implementation Example
 *
const tree6: Tree<number> = {
    tag: 'branch',
    left: { tag: 'leaf', value: 2 },
    right: {
        tag: 'branch',
        left: { tag: 'leaf', value: 5 },
        right: { tag: 'leaf', value: 4 },
    },
};

console.log(JSON.stringify(zip(tree6, tree6), null, 2));

// Output
{
  "tag": "branch",
  "left": {
    "tag": "leaf",
    "value": [
      2,
      2
    ]
  },
  "right": {
    "tag": "branch",
    "left": {
      "tag": "leaf",
      "value": [
        5,
        5
      ]
    },
    "right": {
      "tag": "leaf",
      "value": [
        4,
        4
      ]
    }
  }
}

*/

