let code = `
foo()
function foo(){
    return 1;
}
foo()
`;
function parse(code: string) {

}

parse(code);


class Heap<T>{
    queue: T[] = [];
    constructor(array: T[], public compare: (a: T, b: T) => boolean) {
        let queue = this.buildHeap(array);
    }

    getParent(index: number) {
        return this.queue[this.getParentIndex(index)];
    }

    getParentIndex(index: number) {
        if (index > 0) {
            return Math.floor((index - 1) / 2);
        } else {
            return -1;
        }
    }

    getLeft(index: number) {
        return this.queue[this.getLeftIndex(index)];
    }

    getLeftIndex(index: number) {
        return (2 * index) + 1;
    }

    getRight(index: number) {
        return this.queue[this.getRightIndex(index)];
    }

    getRightIndex(index: number) {
        return this.getLeftIndex(index) + 1;
    }

    buildHeap(array: T[]) {
        for (const item of array) {
            this.insert(item);
        }
    }

    insert(element: T) {
        let newLength = this.queue.push(element);
        let elementIndex = newLength - 1;
        this.shiftUp(elementIndex);
    }

    shiftUp(nodeIndex: number) {
        let parentIndex = this.getParentIndex(nodeIndex);
        let parent = this.queue[nodeIndex];
        if (parent) {
            let node = this.queue[nodeIndex];
            let nodeHigh = this.compare(node, parent);
            if (nodeHigh) {
                this.queue[nodeIndex] = parent;
                this.queue[parentIndex] = node;
                this.shiftUp(parentIndex);
            } else {
                console.log(`shiftUp over`);
            }
        } else {
            if (nodeIndex === 0) {
                console.log('end');
            } else if (this.queue.length > 0) {
                console.error(`未找到父节点，无法操作，index:${nodeIndex}`);
            } else {

            }
        }
    }

    remove() {
        let removed = this.queue.shift();
        let end = this.queue.pop();
        this.queue.unshift(end);
        this.shiftDown(0);
        return removed;
    }

    shiftDown(nodeIndex: number) {
        let node = this.queue[nodeIndex];

        let leftIndex = this.getLeftIndex(nodeIndex);
        let leftNode = this.queue[leftIndex];

        let rightIndex = this.getRightIndex(nodeIndex);
        let rightNode = this.queue[rightIndex];

        let leftHigh = this.compare(leftNode, rightNode);

        if (leftHigh) {
            let highNode = leftNode;
            let highIndex = leftIndex;

            let nodeHigh = this.compare(node, highNode);
            if (nodeHigh) {
                console.log(`over`)
            } else {
                this.queue[highIndex] = node;
                this.queue[nodeIndex] = highNode;
                this.shiftDown(highIndex);
            }
        } else {
            let highNode = rightNode;
            let highIndex = rightIndex;
            
            let nodeHigh = this.compare(node, highNode);
            if (nodeHigh) {
                console.log(`over`);
            } else {
                this.queue[highIndex] = node;
                this.queue[nodeIndex] = highNode;
                this.shiftDown(highIndex);
            }
        }
    }

    peek() {
        return this.queue[0];
    }
}

