export class Leaf {
    constructor(value) {
        this.tag = 'leaf';
        this.value = value;
    }
}
export class Branch {
    constructor(left, right) {
        this.tag = 'branch';
        this.left = left;
        this.right = right;
    }
}
export const isLeaf = (t) => {
    return t.tag === 'leaf';
};
export const isBranch = (t) => {
    return t.tag === 'branch';
};
export const size = (tree) => {
    if (isLeaf(tree)) {
        return 1;
    }
    else {
        return 1 + size(tree.left) + size(tree.right);
    }
};
export const max = (tree) => {
    let currentMax = 0;
    if (isLeaf(tree)) {
        currentMax = currentMax >= tree.value ? currentMax : tree.value;
    }
    else {
        const leftMax = max(tree.left);
        const rightMax = max(tree.right);
        currentMax = leftMax >= rightMax ? leftMax : rightMax;
    }
    return currentMax;
};
export const depth = (tree) => {
    if (isLeaf(tree)) {
        return 0;
    }
    else {
        const depthLeft = 1 + depth(tree.left);
        const depthRight = 1 + depth(tree.right);
        return depthLeft >= depthRight ? depthLeft : depthRight;
    }
};
export const map = (f, tree) => {
    if (isLeaf(tree)) {
        return new Leaf(f(tree.value));
    }
    else {
        return new Branch(map(f, tree.left), map(f, tree.right));
    }
};
export const mapCurry = (f) => (tree) => {
    if (isLeaf(tree)) {
        return new Leaf(f(tree.value));
    }
    else {
        return new Branch(map(f, tree.left), map(f, tree.right));
    }
};
export class BranchOptional {
    constructor(option) {
        this.tag = 'branchOptional';
        this.left = option.left;
        this.right = option.right;
    }
}
export const isBranchOptional = (t) => {
    return t.tag === 'branchOptional';
};
export const filter = (f, tree) => {
    if (!tree)
        return;
    if (isBranchOptional(tree)) {
        return new BranchOptional({
            left: filter(f, tree.left),
            right: filter(f, tree.right)
        });
    }
    else {
        return !f(tree.value) ? tree : undefined;
    }
};
export const zip = (tree1, tree2) => {
    if (isLeaf(tree1) && isLeaf(tree2)) {
        return new Leaf([tree1.value, tree2.value]);
    }
    else if (isBranch(tree1) && isBranch(tree2)) {
        const leftZipped = zip(tree1.left, tree2.left);
        const rifhtZipped = zip(tree1.right, tree2.right);
        if (leftZipped && rifhtZipped)
            return new Branch(leftZipped, rifhtZipped);
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=index.js.map