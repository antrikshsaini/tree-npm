# Tree npm package 

## Installation

use command ``` npm install tree-npm-lib ``` to install package

## Some Explanation



                          A Tree

                          Branch
                      ┌─────┬─────┐
             ┌────────┼──●  │  ●──┼───────┐
             │        └─────┴─────┘       │
             ↓         left  right        ↓
           Branch                       Branch

### Type Declaration

```ts
type Tree<A> = Leaf<A> | Branch<A>;

class Leaf<A> {
    tag: 'leaf' = 'leaf';
    readonly value: A;

    constructor(value: A) {
        this.value = value;
    }
}

class Branch<A> {
    tag: 'branch' = 'branch';
    readonly left: Tree<A>;
    readonly right: Tree<A>;

    constructor(left: Tree<A>, right: Tree<A>) {
        this.left = left;
        this.right = right;
    }
}

class BranchOptional<A> {
    tag: 'branchOptional' = 'branchOptional';
    readonly left?: TreeOptional<A>;
    readonly right?: TreeOptional<A>;

    constructor(option: { left?: TreeOptional<A>, right?: TreeOptional<A> }) {
        this.left = option.left;
        this.right = option.right;
    }
}

type TreeOptional<A> = Leaf<A> | BranchOptional<A>

const isBranchOptional = <A>(t: TreeOptional<A>): t is BranchOptional<A> => {
    return t.tag === 'branchOptional';
};

```
### Type Guards

```ts

const isLeaf = <A>(t: Tree<A>): t is Leaf<A> => {
    return t.tag === 'leaf';
};
const isBranch = <A>(t: Tree<A>): t is Branch<A> => {
    return t.tag === 'branch';
};

```

## Some Cool Functions

### Size   
Signature->   size: Tree<A> -> number

Find size of Tree, Total of number of leaf and branch

```ts
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

```

### Max
Signature->   max: Tree<number> -> number

In a Tree of type number, find Maximum leaf value

```ts
console.log(max(tree)); //9
```

### Depth
Signature->   depth: Tree<A> -> number

In a Tree, find the maximum path length from the root node to any leaf

```ts
console.log(depth(tree)); // 2
```

### Map
Signature->   map: ((A)-> B) -> Tree<A> -> Tree<B>

Creates new Tree, after applying a function to each element in the tree

```ts
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
```
### Filter
Signature->   filter : ((Tree<A>)=> boolean) => Tree<A> | undefined => Tree<A> | undefined

Creates a tree or return undefined, based on the condition (basically remove leaf node)

```ts
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
       right: Leaf { tag: 'leaf', value: 4 } } 
       }
```

### Zip

Signature->   zip: Tree<A> -> Tree<B> -> Tree<Array<A|B>> | undefined

creates a new tree out of two supplied trees by pairing up equally-positioned items from both trees.
Both trees should be of same structure otherwise it would be undefined

```ts
const tree: Tree<number> = {
    tag: 'branch',
    left: { tag: 'leaf', value: 2 },
    right: {
        tag: 'branch',
        left: { tag: 'leaf', value: 5 },
        right: { tag: 'leaf', value: 4 },
    },
};

console.log(JSON.stringify(zip(tree, tree), null, 2));

// Output
{
  "tag": "branch",
  "left": {
    "tag": "leaf",
    "value": [2,2]
  },
  "right": {
    "tag": "branch",
    "left": {
      "tag": "leaf",
      "value": [5,5]
    },
    "right": {
      "tag": "leaf",
      "value": [4,4]
    }
  }
}
```