/**
 * DATA STRUCTURES AND ALGORITHMS - INTERVIEW QUESTIONS
 * 
 * This file contains common DSA problems frequently asked in technical interviews.
 * Each problem includes multiple approaches, time/space complexity analysis,
 * and detailed explanations of the algorithms used.
 * 
 * Topics Covered:
 * 1. Array manipulation (two pointers, sliding window)
 * 2. String processing and validation
 * 3. Stack-based problems
 * 4. Greedy algorithms
 * 5. Mathematical algorithms
 * 
 * All solutions are optimized for interview settings with clear explanations.
 */

/**
 * PROBLEM 1: REMOVE DUPLICATES FROM SORTED ARRAY
 * 
 * LeetCode 26 - Easy
 * 
 * Problem Statement:
 * Given an integer array nums sorted in non-decreasing order, remove duplicates
 * in-place such that each unique element appears only once. Return the number
 * of unique elements.
 * 
 * Input:  nums = [0,0,1,1,1,2,2,3,3,4]
 * Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
 * 
 * Constraints:
 * - Modify array in-place
 * - Return length of unique elements
 * - Order must be maintained
 * 
 * Algorithm: Two Pointers Technique
 * Time Complexity: O(n) - single pass through array
 * Space Complexity: O(1) - only using two pointers
 */

/**
 * SOLUTION: Two Pointers Approach
 * 
 * @param {number[]} nums - Sorted array with duplicates
 * @returns {number} - Length of array after removing duplicates
 * 
 * Algorithm:
 * 1. Use two pointers: i (slow) and j (fast)
 * 2. i tracks position for next unique element
 * 3. j scans through array looking for different elements
 * 4. When nums[j] != nums[i], copy nums[j] to nums[i+1] and increment i
 * 5. Return i+1 as the length of unique elements
 */
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let i = 0; // Slow pointer - tracks position for next unique element

    for (let j = 1; j < nums.length; j++) { // Fast pointer - scans array
        if (nums[j] !== nums[i]) {
            // Found a new unique element
            i++;
            nums[i] = nums[j]; // Place unique element at correct position
        }
    }

    return i + 1; // Length of unique elements
}

// Test case:
// const nums = [0,0,1,1,1,2,2,3,3,4];
// console.log(removeDuplicates(nums)); // 5
// console.log(nums.slice(0, 5)); // [0,1,2,3,4]

/**
 * PROBLEM 2: TWO SUM II - INPUT ARRAY IS SORTED
 * 
 * LeetCode 167 - Medium
 * 
 * Problem Statement:
 * Given a 1-indexed array of integers that is sorted in non-decreasing order,
 * find two numbers such that they add up to a specific target number.
 * Return indices of the two numbers (1-indexed).
 * 
 * Input:  numbers = [2,7,11,15], target = 9
 * Output: [1,2] because 2 + 7 = 9
 * 
 * Key Insight: Since array is sorted, we can use two pointers to find the pair
 * in O(n) time instead of O(n²) brute force approach.
 * 
 * Algorithm: Two Pointers from Both Ends
 * Time Complexity: O(n) - single pass with two pointers
 * Space Complexity: O(1) - only using two pointers
 */

/**
 * SOLUTION: Two Pointers Approach
 * 
 * @param {number[]} numbers - Sorted array of integers
 * @param {number} target - Target sum
 * @returns {number[]} - 1-indexed positions of the two numbers
 * 
 * Algorithm:
 * 1. Start with left pointer at beginning, right pointer at end
 * 2. Calculate sum of elements at both pointers
 * 3. If sum equals target, return indices (1-indexed)
 * 4. If sum is less than target, move left pointer right (increase sum)
 * 5. If sum is greater than target, move right pointer left (decrease sum)
 * 6. Continue until target is found
 */
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left + 1, right + 1]; // Convert to 1-based indexing
        } else if (sum < target) {
            left++; // Need larger sum, move left pointer right
        } else {
            right--; // Need smaller sum, move right pointer left
        }
    }

    return []; // No solution found (shouldn't happen per problem constraints)
}

// Test case:
// console.log(twoSum([2,7,11,15], 9)); // [1,2]
// console.log(twoSum([2,3,4], 6)); // [1,3]

/**
 * PROBLEM 3: MOVE ZEROES
 * 
 * LeetCode 283 - Easy
 * 
 * Problem Statement:
 * Given an integer array nums, move all 0's to the end while maintaining
 * the relative order of non-zero elements. Do this in-place.
 * 
 * Input:  [0, 1, 0, 3, 12]
 * Output: [1, 3, 12, 0, 0]
 * 
 * Constraints:
 * - Modify array in-place
 * - Maintain relative order of non-zero elements
 * - Minimize number of operations
 * 
 * Algorithm: Two Pointers with Swapping
 * Time Complexity: O(n) - single pass through array
 * Space Complexity: O(1) - only using one pointer variable
 */

/**
 * SOLUTION: Two Pointers with Swap
 * 
 * @param {number[]} nums - Array with zeros to move
 * @returns {void} - Modifies array in-place
 * 
 * Algorithm:
 * 1. Use pointer i to track position for next non-zero element
 * 2. Use pointer j to scan through array
 * 3. When nums[j] is non-zero, swap with nums[i] and increment i
 * 4. This naturally moves all zeros to the end
 */
function moveZeroes(nums) {
    let i = 0; // Position for next non-zero element

    for (let j = 0; j < nums.length; j++) {
        if (nums[j] !== 0) {
            // Swap non-zero element to front
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
        }
    }
}

// Test case:
// const arr = [0, 1, 0, 3, 12];
// moveZeroes(arr);
// console.log(arr); // [1, 3, 12, 0, 0]

/**
 * PROBLEM 4: VALID PALINDROME
 * 
 * LeetCode 125 - Easy
 * 
 * Problem Statement:
 * A phrase is a palindrome if, after converting all uppercase letters to lowercase
 * and removing all non-alphanumeric characters, it reads the same forward and backward.
 * 
 * Input:  s = "A man, a plan, a canal: Panama"
 * Output: true
 * 
 * Input:  s = "race a car"
 * Output: false
 * 
 * Two Approaches:
 * 1. Clean string first, then check palindrome
 * 2. Use two pointers with in-place character validation
 */

/**
 * APPROACH 1: Clean String First
 * 
 * @param {string} s - Input string
 * @returns {boolean} - True if palindrome
 * 
 * Algorithm:
 * 1. Remove non-alphanumeric characters using regex
 * 2. Convert to lowercase
 * 3. Compare string with its reverse
 * 
 * Time Complexity: O(n) - string processing and comparison
 * Space Complexity: O(n) - creating cleaned string
 */
function isPalindromeClean(s) {
    const cleaned = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
}

/**
 * APPROACH 2: Two Pointers (Space Optimized)
 * 
 * @param {string} s - Input string
 * @returns {boolean} - True if palindrome
 * 
 * Algorithm:
 * 1. Use two pointers from both ends
 * 2. Skip non-alphanumeric characters
 * 3. Compare characters after converting to lowercase
 * 4. Move pointers inward until they meet
 * 
 * Time Complexity: O(n) - single pass with two pointers
 * Space Complexity: O(1) - only using two pointers
 */
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !isAlphaNumeric(s[left])) {
            left++;
        }
        
        // Skip non-alphanumeric characters from right
        while (left < right && !isAlphaNumeric(s[right])) {
            right--;
        }

        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

/**
 * HELPER FUNCTION: Check if character is alphanumeric
 * 
 * @param {string} c - Character to check
 * @returns {boolean} - True if alphanumeric
 * 
 * Two implementations:
 * 1. Using regex (simpler)
 * 2. Using ASCII codes (more efficient)
 */

// Regex approach (simpler to understand)
function isAlphaNumeric(c) {
    return /^[a-z0-9]$/i.test(c);
}

// ASCII approach (more efficient)
function isAlphaNumericASCII(c) {
    const code = c.charCodeAt(0);

    // Check if digit (0-9): ASCII 48-57
    if (code >= 48 && code <= 57) return true;

    // Check if uppercase letter (A-Z): ASCII 65-90
    if (code >= 65 && code <= 90) return true;

    // Check if lowercase letter (a-z): ASCII 97-122
    if (code >= 97 && code <= 122) return true;

    return false;
}

// Test cases:
// console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
// console.log(isPalindrome("race a car")); // false

/**
 * PROBLEM 5: CONTAINER WITH MOST WATER
 * 
 * LeetCode 11 - Medium (Very common at FAANG interviews)
 * 
 * Problem Statement:
 * You are given an array height of n non-negative integers, where each element
 * represents a vertical line. Find two lines that form a container that holds
 * the most water.
 * 
 * Input:  height = [1,8,6,2,5,4,8,3,7]
 * Output: 49 (between indices 1 and 8: min(8,7) * (8-1) = 7 * 7 = 49)
 * 
 * Key Insight: Use two pointers to avoid O(n²) brute force.
 * Always move the pointer with smaller height to potentially find larger area.
 * 
 * Algorithm: Two Pointers Greedy Approach
 * Time Complexity: O(n) - single pass with two pointers
 * Space Complexity: O(1) - only using variables for pointers and max area
 */

/**
 * SOLUTION: Two Pointers Greedy
 * 
 * @param {number[]} height - Array of line heights
 * @returns {number} - Maximum water area
 * 
 * Algorithm:
 * 1. Start with pointers at both ends (maximum width)
 * 2. Calculate area = min(height[left], height[right]) * (right - left)
 * 3. Update maximum area if current area is larger
 * 4. Move pointer with smaller height inward (greedy choice)
 * 5. Continue until pointers meet
 * 
 * Why move smaller height pointer?
 * - Area is limited by smaller height
 * - Moving larger height pointer can only decrease width without increasing height
 * - Moving smaller height pointer might find a taller line
 */
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        // Calculate current area
        const currentHeight = Math.min(height[left], height[right]);
        const currentWidth = right - left;
        const currentArea = currentHeight * currentWidth;
        
        // Update maximum area
        maxWater = Math.max(maxWater, currentArea);

        // Move pointer with smaller height (greedy choice)
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

// Test case:
// console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49

/**
 * PROBLEM 6: VALID PARENTHESES
 * 
 * LeetCode 20 - Easy (Very common interview question)
 * 
 * Problem Statement:
 * Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 * 
 * Valid conditions:
 * 1. Open brackets must be closed by the same type of brackets
 * 2. Open brackets must be closed in the correct order
 * 3. Every close bracket has a corresponding open bracket
 * 
 * Input:  s = "()[]{}"
 * Output: true
 * 
 * Input:  s = "([)]"
 * Output: false
 * 
 * Algorithm: Stack-based Matching
 * Time Complexity: O(n) - single pass through string
 * Space Complexity: O(n) - stack can hold up to n/2 opening brackets
 */

/**
 * SOLUTION: Stack-based Validation
 * 
 * @param {string} s - String with brackets
 * @returns {boolean} - True if valid parentheses
 * 
 * Algorithm:
 * 1. Create mapping of closing to opening brackets
 * 2. Use stack to track opening brackets
 * 3. For opening brackets: push to stack
 * 4. For closing brackets: check if matches top of stack
 * 5. String is valid if stack is empty at the end
 */
function isValid(s) {
    const stack = [];
    
    // Mapping of closing brackets to opening brackets
    const bracketMap = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            // Opening bracket - push to stack
            stack.push(char);
        } else {
            // Closing bracket - check if it matches top of stack
            if (stack.pop() !== bracketMap[char]) {
                return false; // Mismatch or no opening bracket
            }
        }
    }

    // Valid if all brackets are matched (stack is empty)
    return stack.length === 0;
}

// Test cases:
// console.log(isValid("()")); // true
// console.log(isValid("()[]{}")); // true
// console.log(isValid("(]")); // false
// console.log(isValid("([)]")); // false

/**
 * PROBLEM 7: ROTATE ARRAY
 *
 * LeetCode 189 - Medium (Frequently asked in interviews)
 *
 * Problem Statement:
 * Given an array nums, rotate the array to the right by k steps, where k >= 0.
 *
 * Input:  nums = [1,2,3,4,5,6,7], k = 3
 * Output: [5,6,7,1,2,3,4]
 *
 * Constraints:
 * - Modify array in-place
 * - Use O(1) extra space if possible
 * - Handle k > nums.length
 *
 * Multiple Approaches:
 * 1. Brute force: Rotate one by one (O(n*k) time)
 * 2. Extra array: Copy to new array (O(n) time, O(n) space)
 * 3. Reverse approach: Three reversals (O(n) time, O(1) space) ⭐
 */

/**
 * OPTIMAL SOLUTION: Three Reversals Approach
 *
 * @param {number[]} nums - Array to rotate
 * @param {number} k - Number of steps to rotate right
 * @returns {void} - Modifies array in-place
 *
 * Algorithm (Reverse Approach):
 * 1. Handle k > nums.length by taking k % nums.length
 * 2. Reverse entire array
 * 3. Reverse first k elements
 * 4. Reverse remaining elements
 *
 * Example: [1,2,3,4,5,6,7], k=3
 * Step 1: Reverse all -> [7,6,5,4,3,2,1]
 * Step 2: Reverse first 3 -> [5,6,7,4,3,2,1]
 * Step 3: Reverse last 4 -> [5,6,7,1,2,3,4]
 *
 * Time Complexity: O(n) - three passes through array
 * Space Complexity: O(1) - only using helper function
 */
function rotate(nums, k) {
    // Handle k larger than array length
    k = k % nums.length;
    
    if (k === 0) return; // No rotation needed

    // Step 1: Reverse entire array
    reverse(nums, 0, nums.length - 1);
    
    // Step 2: Reverse first k elements
    reverse(nums, 0, k - 1);
    
    // Step 3: Reverse remaining elements
    reverse(nums, k, nums.length - 1);
}

/**
 * HELPER FUNCTION: Reverse array segment
 *
 * @param {number[]} arr - Array to reverse
 * @param {number} start - Start index (inclusive)
 * @param {number} end - End index (inclusive)
 */
function reverse(arr, start, end) {
    while (start < end) {
        // Swap elements using destructuring
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

// Test case:
// const nums = [1,2,3,4,5,6,7];
// rotate(nums, 3);
// console.log(nums); // [5,6,7,1,2,3,4]

/**
 * ALTERNATIVE APPROACHES
 */

/**
 * APPROACH 2: Using Extra Array
 *
 * @param {number[]} nums - Array to rotate
 * @param {number} k - Steps to rotate
 *
 * Time: O(n), Space: O(n)
 */
function rotateWithExtraArray(nums, k) {
    k = k % nums.length;
    const result = new Array(nums.length);
    
    for (let i = 0; i < nums.length; i++) {
        result[(i + k) % nums.length] = nums[i];
    }
    
    // Copy back to original array
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
}

/**
 * APPROACH 3: Cyclic Replacements
 *
 * @param {number[]} nums - Array to rotate
 * @param {number} k - Steps to rotate
 *
 * Time: O(n), Space: O(1)
 * More complex but educational approach
 */
function rotateCyclic(nums, k) {
    k = k % nums.length;
    let count = 0;
    
    for (let start = 0; count < nums.length; start++) {
        let current = start;
        let prev = nums[start];
        
        do {
            const next = (current + k) % nums.length;
            const temp = nums[next];
            nums[next] = prev;
            prev = temp;
            current = next;
            count++;
        } while (start !== current);
    }
}

/**
 * COMPLEXITY ANALYSIS SUMMARY
 *
 * Problem: Remove Duplicates
 * - Time: O(n), Space: O(1)
 * - Technique: Two pointers
 *
 * Problem: Two Sum II
 * - Time: O(n), Space: O(1)
 * - Technique: Two pointers from ends
 *
 * Problem: Move Zeroes
 * - Time: O(n), Space: O(1)
 * - Technique: Two pointers with swapping
 *
 * Problem: Valid Palindrome
 * - Time: O(n), Space: O(1)
 * - Technique: Two pointers with character validation
 *
 * Problem: Container With Most Water
 * - Time: O(n), Space: O(1)
 * - Technique: Two pointers greedy approach
 *
 * Problem: Valid Parentheses
 * - Time: O(n), Space: O(n)
 * - Technique: Stack for bracket matching
 *
 * Problem: Rotate Array
 * - Time: O(n), Space: O(1)
 * - Technique: Array reversal
 */

/**
 * INTERVIEW PREPARATION TIPS
 *
 * COMMON PATTERNS:
 *
 * 1. TWO POINTERS:
 *    - Sorted array problems
 *    - Palindrome checking
 *    - Array partitioning
 *    - Cycle detection
 *
 * 2. SLIDING WINDOW:
 *    - Subarray problems
 *    - String pattern matching
 *    - Maximum/minimum in window
 *
 * 3. STACK/QUEUE:
 *    - Bracket matching
 *    - Expression evaluation
 *    - Monotonic stack problems
 *    - BFS/DFS traversals
 *
 * 4. HASH MAP/SET:
 *    - Frequency counting
 *    - Duplicate detection
 *    - Two sum variants
 *    - Anagram problems
 *
 * 5. GREEDY ALGORITHMS:
 *    - Interval problems
 *    - Array optimization
 *    - String manipulation
 *
 * PROBLEM-SOLVING APPROACH:
 *
 * 1. UNDERSTAND THE PROBLEM:
 *    - Read carefully and identify constraints
 *    - Work through examples manually
 *    - Clarify edge cases
 *
 * 2. PLAN THE SOLUTION:
 *    - Identify the pattern or technique
 *    - Consider time/space complexity requirements
 *    - Think of multiple approaches
 *
 * 3. IMPLEMENT:
 *    - Start with brute force if needed
 *    - Optimize step by step
 *    - Handle edge cases
 *
 * 4. TEST:
 *    - Test with provided examples
 *    - Test edge cases (empty, single element, etc.)
 *    - Verify time/space complexity
 *
 * COMMON MISTAKES TO AVOID:
 *
 * 1. Not handling edge cases (empty arrays, single elements)
 * 2. Off-by-one errors in loop conditions
 * 3. Not considering integer overflow
 * 4. Forgetting to handle negative numbers
 * 5. Not optimizing when asked for better complexity
 * 6. Making assumptions about input constraints
 * 7. Not testing the solution thoroughly
 *
 * PRACTICE RECOMMENDATIONS:
 *
 * 1. Start with easy problems and build confidence
 * 2. Focus on understanding patterns rather than memorizing
 * 3. Practice explaining your approach clearly
 * 4. Time yourself to simulate interview pressure
 * 5. Review and understand optimal solutions
 * 6. Practice coding without IDE assistance
 * 7. Focus on clean, readable code
 */
