import { CodingPattern } from '../types';

export const codingPatterns: CodingPattern[] = [
  {
    id: 'hash-map-lookup',
    name: 'Hash Map Lookup',
    category: 'Lookup and Counting',
    summary: 'Use a HashMap when the slow part of a brute-force solution is repeatedly searching for a value, count, index, or relationship you could remember.',
    whenToUse: ['You need O(1) average lookup by value or key', 'You are matching complements, frequencies, or last-seen positions', 'A nested loop is only checking whether something exists'],
    clues: ['Words like pair, complement, duplicate, frequency, anagram, first unique', 'Need to remember what appeared earlier', 'Output depends on counts or indices'],
    commonDataStructures: ['HashMap<K, V>', 'HashSet<T>', 'Map<Character, Integer>'],
    javaTemplate: `Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
    int need = target - nums[i];
    if (seen.containsKey(need)) {
        return new int[] { seen.get(need), i };
    }
    seen.put(nums[i], i);
}`,
    pitfalls: ['Updating the map before checking can pair an element with itself', 'For counts, remember to decrement or remove when leaving a window', 'HashMap is average O(1), not sorted order'],
    exampleProblems: [
      { title: 'Find a Target Pair', originalSummary: 'Given numbers and a target, return the two indices whose values add to the target.', difficulty: 'Easy', externalUrl: 'https://leetcode.com/problems/two-sum/' },
      { title: 'First Rare Character', originalSummary: 'Find the first character in a string that appears exactly once.', difficulty: 'Easy' }
    ]
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    category: 'Array and String Traversal',
    summary: 'Use two pointers when two positions move through a sequence to compare, partition, shrink, or combine values efficiently.',
    whenToUse: ['Input is sorted or can be sorted', 'You compare values from both ends', 'You need in-place partitioning or pair scanning'],
    clues: ['Sorted array', 'Palindrome', 'Remove duplicates in place', 'Closest pair or target sum'],
    commonDataStructures: ['int left/right indices', 'char[]', 'List pointers'],
    javaTemplate: `int left = 0;
int right = nums.length - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) return true;
    if (sum < target) left++;
    else right--;
}`,
    pitfalls: ['Forgetting why a pointer move is safe', 'Off-by-one loop boundaries', 'Sorting may change original indices'],
    exampleProblems: [
      { title: 'Sorted Pair Sum', originalSummary: 'Find whether two values in a sorted array add up to a target.', difficulty: 'Easy' },
      { title: 'Clean Palindrome', originalSummary: 'Check if a phrase reads the same after ignoring punctuation and case.', difficulty: 'Easy' }
    ]
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    category: 'Contiguous Ranges',
    summary: 'Use a sliding window for contiguous subarrays or substrings when you can expand the right side and shrink the left side while maintaining state.',
    whenToUse: ['The answer is a contiguous range', 'You need longest, shortest, or count of ranges', 'Window validity can be updated incrementally'],
    clues: ['Substring or subarray', 'At most K', 'Minimum length', 'No repeats', 'Consecutive range'],
    commonDataStructures: ['left/right indices', 'HashMap for counts', 'HashSet for uniqueness'],
    javaTemplate: `int left = 0;
Map<Character, Integer> count = new HashMap<>();
for (int right = 0; right < s.length(); right++) {
    char c = s.charAt(right);
    count.put(c, count.getOrDefault(c, 0) + 1);
    while (!isValid(count)) {
        char out = s.charAt(left++);
        count.put(out, count.get(out) - 1);
    }
    best = Math.max(best, right - left + 1);
}`,
    pitfalls: ['Using sliding window when the range is not contiguous', 'Shrinking with if when a while loop is required', 'Not removing zero-count entries when validity depends on key count'],
    exampleProblems: [
      { title: 'Longest Unique Stretch', originalSummary: 'Find the longest substring that contains no repeated characters.', difficulty: 'Medium' },
      { title: 'Smallest Sum Window', originalSummary: 'Find the shortest contiguous range whose values reach a target sum.', difficulty: 'Medium' }
    ]
  },
  {
    id: 'stack',
    name: 'Stack',
    category: 'Last-In First-Out',
    summary: 'Use a stack when the most recent unresolved item should be handled first.',
    whenToUse: ['You match open and close tokens', 'You need monotonic previous/next greater logic', 'You simulate undo, recursion, or nested scopes'],
    clues: ['Parentheses', 'Nested', 'Previous greater', 'Backtracking state', 'Undo'],
    commonDataStructures: ['Deque<T> as stack', 'ArrayDeque<T>', 'char stack'],
    javaTemplate: `Deque<Character> stack = new ArrayDeque<>();
for (char c : s.toCharArray()) {
    if (c == '(') {
        stack.push(c);
    } else if (stack.isEmpty()) {
        return false;
    } else {
        stack.pop();
    }
}
return stack.isEmpty();`,
    pitfalls: ['Using legacy Stack instead of Deque', 'Forgetting empty-stack checks before pop', 'Mixing push/pop side with queue methods'],
    exampleProblems: [
      { title: 'Bracket Audit', originalSummary: 'Decide whether every closing bracket matches the latest unmatched opening bracket.', difficulty: 'Easy' },
      { title: 'Warmer Day Waits', originalSummary: 'For each temperature, find how many days until a warmer one appears.', difficulty: 'Medium' }
    ]
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Sorted Search and Answers',
    summary: 'Use binary search when the search space is sorted or when a yes/no condition becomes permanently true after some point.',
    whenToUse: ['Array is sorted', 'You can discard half the search space', 'You are searching the minimum feasible answer'],
    clues: ['Sorted', 'First/last occurrence', 'Minimum capacity', 'Feasible threshold', 'O(log n)'],
    commonDataStructures: ['low/mid/high indices', 'predicate function'],
    javaTemplate: `int low = 0, high = nums.length - 1;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (nums[mid] == target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
}
return -1;`,
    pitfalls: ['Overflow from (low + high) / 2', 'Wrong loop condition for boundary search', 'Not proving the predicate is monotonic'],
    exampleProblems: [
      { title: 'Find in Sorted Data', originalSummary: 'Return the index of a target value in a sorted array.', difficulty: 'Easy' },
      { title: 'Smallest Working Speed', originalSummary: 'Find the slowest speed that still completes all work by the deadline.', difficulty: 'Medium' }
    ]
  },
  {
    id: 'bfs',
    name: 'BFS',
    category: 'Graph Traversal',
    summary: 'Use breadth-first search to explore a graph level by level, especially when the first time you reach a node is the shortest path in an unweighted graph.',
    whenToUse: ['Need shortest path by number of edges', 'Need level order traversal', 'Need to spread from sources in waves'],
    clues: ['Nearest', 'Fewest steps', 'Level order', 'Minutes until all cells change', 'Unweighted graph'],
    commonDataStructures: ['Queue<T>', 'boolean[] visited', 'directions array for grids'],
    javaTemplate: `Queue<Node> queue = new ArrayDeque<>();
queue.offer(start);
visited.add(start);
while (!queue.isEmpty()) {
    Node cur = queue.poll();
    for (Node next : cur.neighbors) {
        if (visited.add(next)) {
            queue.offer(next);
        }
    }
}`,
    pitfalls: ['Marking visited too late and adding duplicates', 'Using BFS on weighted shortest path without Dijkstra', 'Losing level boundaries when distance matters'],
    exampleProblems: [
      { title: 'Tree by Levels', originalSummary: 'Return tree values grouped by depth from top to bottom.', difficulty: 'Medium' },
      { title: 'Nearest Exit', originalSummary: 'Find the fewest moves from a cell to an exit in an unweighted grid.', difficulty: 'Medium' }
    ]
  },
  {
    id: 'dfs',
    name: 'DFS',
    category: 'Graph Traversal',
    summary: 'Use depth-first search to fully explore one branch before backing up, which is natural for recursion, connected components, and path enumeration.',
    whenToUse: ['Need to visit all connected nodes', 'Need recursion over choices', 'Need detect cycles or compute subtree values'],
    clues: ['All paths', 'Island count', 'Connected component', 'Backtrack', 'Tree recursion'],
    commonDataStructures: ['recursion stack', 'boolean[][] visited', 'Set<T> visited'],
    javaTemplate: `void dfs(Node node, Set<Node> visited) {
    if (node == null || visited.contains(node)) return;
    visited.add(node);
    for (Node next : node.neighbors) {
        dfs(next, visited);
    }
}`,
    pitfalls: ['Stack overflow on very deep graphs', 'Forgetting visited on cyclic graphs', 'Not undoing state in backtracking'],
    exampleProblems: [
      { title: 'Count Land Groups', originalSummary: 'Count connected groups of land cells in a grid.', difficulty: 'Medium' },
      { title: 'All Root Paths', originalSummary: 'List each path from a tree root to every leaf.', difficulty: 'Easy' }
    ]
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    category: 'Optimization and Counting',
    summary: 'Use dynamic programming when overlapping subproblems and optimal substructure let you build answers from smaller answers.',
    whenToUse: ['Need count, min, max, or feasibility over choices', 'Naive recursion repeats the same states', 'The current answer depends on earlier answers'],
    clues: ['Ways to', 'Maximum profit', 'Minimum cost', 'Can segment', 'Choose or skip'],
    commonDataStructures: ['int[] dp', 'boolean[] dp', 'Map<State, Value> memo'],
    javaTemplate: `int[] dp = new int[n + 1];
dp[0] = 1;
for (int i = 1; i <= n; i++) {
    for (int step : steps) {
        if (i - step >= 0) {
            dp[i] += dp[i - step];
        }
    }
}
return dp[n];`,
    pitfalls: ['Starting with DP before defining the state', 'Wrong base cases', 'Confusing greedy choice with a recurrence'],
    exampleProblems: [
      { title: 'Climb Count', originalSummary: 'Count how many ways there are to reach the top when each move can be one or two steps.', difficulty: 'Easy' },
      { title: 'Best Non-Adjacent Sum', originalSummary: 'Choose values to maximize total without taking neighboring positions.', difficulty: 'Medium' }
    ]
  }
];

export const getPatternById = (id: string) => codingPatterns.find((pattern) => pattern.id === id);
