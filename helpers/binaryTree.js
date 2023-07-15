// binaryTree.js

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  add(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (value.id === currentNode.value.id) {
        // Handle duplicate values (optional)
        return;
      }

      if (value.id < currentNode.value.id) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  find(value) {
    const results = [];

    const traverse = (node) => {
      if (!node) {
        return;
      }

      if (value === node.value) {
        results.push(node);
      }

      if (value < node.value) {
        traverse(node.left);
      } else {
        traverse(node.right);
      }
    };

    traverse(this.root);

    return results;
  }

  findBySide(side, price) {
    const result = [];

    const traverse = (node) => {
      if (!node) {
        return;
      }

      if (node.value.side === side && node.value.price === price) {
        result.push(node.value);
      }

      if (node.value.side <= side && node.value.price <= price) {
        traverse(node.right);
      } else {
        traverse(node.left);
      }
    };

    traverse(this.root);

    return result;
  }

  delete(value) {
    const deleteNode = (node, value) => {
      if (!node) {
        return null;
      }

      if (
        node.value.id === value.id &&
        node.value.side === value.side &&
        node.value.price === value.price
      ) {
        // Case 1: No children
        if (!node.left && !node.right) {
          return null;
        }

        // Case 2: One child
        if (!node.left) {
          return node.right;
        }

        if (!node.right) {
          return node.left;
        }

        // Case 3: Two children
        const minNode = findMinNode(node.right);
        node.value = minNode.value;
        node.right = deleteNode(node.right, minNode.value);
        return node;
      }

      if (value.id < node.value.id) {
        node.left = deleteNode(node.left, value);
        return node;
      }

      node.right = deleteNode(node.right, value);
      return node;
    };

    const findMinNode = (node) => {
      while (node.left) {
        node = node.left;
      }
      return node;
    };

    this.root = deleteNode(this.root, value);
  }
}

module.exports = BinaryTree;
