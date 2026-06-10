import { AlgorithmVisualizer } from '../types';

export const visualizers: AlgorithmVisualizer[] = [
  {
    id: 'two-sum-hashmap',
    title: 'Two Sum using HashMap',
    patternId: 'hash-map-lookup',
    pattern: 'Hash Map Lookup',
    summary: 'Track seen numbers and look for the complement before storing the current value.',
    javaCode: `Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
    int need = target - nums[i];
    if (seen.containsKey(need)) {
        return new int[] { seen.get(need), i };
    }
    seen.put(nums[i], i);
}
return new int[] { -1, -1 };`,
    steps: [
      { line: 1, explanation: 'Create a map from value to index so prior values are easy to find.', variables: { target: 9, i: null, need: null }, arrayState: { values: [2, 7, 11, 15] }, mapState: {} },
      { line: 3, explanation: 'At index 0, value 2 needs complement 7.', variables: { i: 0, current: 2, need: 7 }, arrayState: { values: [2, 7, 11, 15], activeIndices: [0] }, mapState: {} },
      { line: 7, explanation: '7 is not in the map yet, so store 2 at index 0.', variables: { i: 0, current: 2, need: 7 }, arrayState: { values: [2, 7, 11, 15], activeIndices: [0] }, mapState: { '2': 0 } },
      { line: 4, explanation: 'At index 1, value 7 needs complement 2, which exists in the map.', variables: { i: 1, current: 7, need: 2 }, arrayState: { values: [2, 7, 11, 15], activeIndices: [0, 1] }, mapState: { '2': 0 } },
      { line: 5, explanation: 'Return the saved index for 2 and the current index for 7.', variables: { i: 1, current: 7, need: 2 }, arrayState: { values: [2, 7, 11, 15], activeIndices: [0, 1] }, mapState: { '2': 0 }, result: '[0, 1]' }
    ]
  },
  {
    id: 'valid-parentheses-stack',
    title: 'Valid Parentheses using Stack',
    patternId: 'stack',
    pattern: 'Stack',
    summary: 'Push opening brackets and require each closing bracket to match the latest opener.',
    javaCode: `Deque<Character> stack = new ArrayDeque<>();
for (char c : s.toCharArray()) {
    if (c == '(') {
        stack.push(c);
    } else {
        if (stack.isEmpty()) return false;
        stack.pop();
    }
}
return stack.isEmpty();`,
    steps: [
      { line: 1, explanation: 'Start with an empty stack.', variables: { s: '(()())', c: null }, stackState: [] },
      { line: 4, explanation: 'Read the first opener and push it.', variables: { c: '(' }, stackState: ['('], arrayState: { values: ['(', '(', ')', '(', ')', ')'], activeIndices: [0] } },
      { line: 4, explanation: 'Read another opener and push it on top.', variables: { c: '(' }, stackState: ['(', '('], arrayState: { values: ['(', '(', ')', '(', ')', ')'], activeIndices: [1] } },
      { line: 7, explanation: 'Read a closer. The top opener matches, so pop.', variables: { c: ')' }, stackState: ['('], arrayState: { values: ['(', '(', ')', '(', ')', ')'], activeIndices: [2] } },
      { line: 10, explanation: 'After all matches, the stack is empty, so the string is valid.', variables: { c: ')' }, stackState: [], arrayState: { values: ['(', '(', ')', '(', ')', ')'], activeIndices: [5] }, result: 'true' }
    ]
  },
  {
    id: 'binary-search-low-mid-high',
    title: 'Binary Search using low/mid/high',
    patternId: 'binary-search',
    pattern: 'Binary Search',
    summary: 'Keep a sorted search range and discard half after each comparison.',
    javaCode: `int low = 0, high = nums.length - 1;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (nums[mid] == target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
}
return -1;`,
    steps: [
      { line: 1, explanation: 'Initialize the search range across the whole sorted array.', variables: { low: 0, high: 6, target: 10 }, arrayState: { values: [1, 3, 5, 7, 9, 10, 14], activeIndices: [0, 6], window: [0, 6] } },
      { line: 3, explanation: 'Compute mid without overflow.', variables: { low: 0, mid: 3, high: 6 }, arrayState: { values: [1, 3, 5, 7, 9, 10, 14], activeIndices: [3], window: [0, 6] } },
      { line: 5, explanation: '7 is less than 10, so discard the left half including mid.', variables: { low: 4, mid: 3, high: 6 }, arrayState: { values: [1, 3, 5, 7, 9, 10, 14], activeIndices: [3], window: [4, 6] } },
      { line: 4, explanation: 'The next mid is index 5, and nums[5] is the target.', variables: { low: 4, mid: 5, high: 6 }, arrayState: { values: [1, 3, 5, 7, 9, 10, 14], activeIndices: [5], window: [4, 6] }, result: '5' }
    ]
  },
  {
    id: 'bfs-level-order-queue',
    title: 'BFS Level Order using Queue',
    patternId: 'bfs',
    pattern: 'BFS',
    summary: 'Process nodes in queue order to visit each tree level from left to right.',
    javaCode: `Queue<TreeNode> queue = new ArrayDeque<>();
queue.offer(root);
while (!queue.isEmpty()) {
    TreeNode node = queue.poll();
    result.add(node.val);
    if (node.left != null) queue.offer(node.left);
    if (node.right != null) queue.offer(node.right);
}`,
    steps: [
      { line: 1, explanation: 'Create the queue that drives level order traversal.', variables: { node: null }, queueState: [] },
      { line: 2, explanation: 'Add the root node first.', variables: { node: 'A' }, queueState: ['A'] },
      { line: 4, explanation: 'Poll A from the front and process it.', variables: { node: 'A' }, queueState: [], result: 'A' },
      { line: 6, explanation: 'Offer A left child, then the right child, so the next level is queued.', variables: { node: 'A' }, queueState: ['B', 'C'], result: 'A' },
      { line: 4, explanation: 'Poll B next because it was discovered first.', variables: { node: 'B' }, queueState: ['C'], result: 'A, B' }
    ]
  },
  {
    id: 'sliding-window-unique',
    title: 'Sliding Window using HashSet',
    patternId: 'sliding-window',
    pattern: 'Sliding Window',
    summary: 'Grow a unique-character window and shrink from the left when a duplicate appears.',
    javaCode: `Set<Character> window = new HashSet<>();
int left = 0, best = 0;
for (int right = 0; right < s.length(); right++) {
    while (window.contains(s.charAt(right))) {
        window.remove(s.charAt(left));
        left++;
    }
    window.add(s.charAt(right));
    best = Math.max(best, right - left + 1);
}`,
    steps: [
      { line: 1, explanation: 'Use a set to represent the current unique window.', variables: { left: 0, right: null, best: 0 }, arrayState: { values: ['a', 'b', 'c', 'a', 'b'], window: [0, 0] }, mapState: {} },
      { line: 8, explanation: 'Add a, then the best length is 1.', variables: { left: 0, right: 0, best: 1 }, arrayState: { values: ['a', 'b', 'c', 'a', 'b'], activeIndices: [0], window: [0, 0] }, mapState: { a: 1 } },
      { line: 8, explanation: 'Add b and c while the window stays unique.', variables: { left: 0, right: 2, best: 3 }, arrayState: { values: ['a', 'b', 'c', 'a', 'b'], activeIndices: [2], window: [0, 2] }, mapState: { a: 1, b: 1, c: 1 } },
      { line: 4, explanation: 'The next a is a duplicate, so shrink until the old a leaves.', variables: { left: 0, right: 3, best: 3 }, arrayState: { values: ['a', 'b', 'c', 'a', 'b'], activeIndices: [0, 3], window: [0, 3] }, mapState: { a: 1, b: 1, c: 1 } },
      { line: 9, explanation: 'After removing the left a, add the new a. The best remains 3.', variables: { left: 1, right: 3, best: 3 }, arrayState: { values: ['a', 'b', 'c', 'a', 'b'], activeIndices: [3], window: [1, 3] }, mapState: { a: 1, b: 1, c: 1 }, result: 'best = 3' }
    ]
  }
];

export const getVisualizerById = (id: string) => visualizers.find((visualizer) => visualizer.id === id);
