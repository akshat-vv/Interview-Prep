// 1. Remove Duplicates from Sorted Array

// Input:  nums = [0,0,1,1,1,2,2,3,3,4]
// Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]

// function removeDuplicates(nums) {
//   if (nums.length === 0) return 0;

//   let i = 0;
//   for (let j = 1; j < nums.length; j++) {
//     if (nums[j] !== nums[i]) {
//       i++;
//       nums[i] = nums[j];
//     }
//   }

//   return i + 1;
// }


// 2.✅ Problem: Two Sum II – Input Array Is Sorted
// You are given a 1-indexed array of integers numbers that is sorted in non-decreasing order.
// You need to find two numbers such that they add up to a specific target number.

// Input:  numbers = [2,7,11,15], target = 9
// Output: [1,2]  // because 2 + 7 = 9


// ✅ Approach: Two Pointers
// Since the array is sorted, we can:

// Start with two pointers: one at the start (left), one at the end (right)

// If sum is too small: move left++

// If sum is too big: move right--

// If sum equals target: return [left + 1, right + 1]

// function twoSum(numbers, target) {
//   let left = 0;
//   let right = numbers.length - 1;

//   while (left < right) {
//     const sum = numbers[left] + numbers[right];

//     if (sum === target) {
//       return [left + 1, right + 1]; // 1-based index
//     } else if (sum < target) {
//       left++;
//     } else {
//       right--;
//     }
//   }

//   return []; // no solution
// }


// 3. Given an array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Do this in-place without making a copy of the array.

// Input:  [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]


// let i = 0;
// for (let j = 0; j < a.length; j++) {
//   if (a[j] !== 0) {
//     [a[i], a[j]] = [a[j], a[i]]; // swap
//     i++;
//   }
// }



// 4 Problem: Valid Palindrome
// Given a string s, return true if it is a palindrome, considering only alphanumeric characters and ignoring cases.

// Input:  s = "A man, a plan, a canal: Panama"
// Output: true

// Input:  s = "race a car"
// Output: false


// First APproch
// function isPalindrome(s) {
//   const cleaned = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
//   return cleaned === cleaned.split('').reverse().join('');
// }



// Second Approach 
// function isPalindrome(s) {
//   let left = 0;
//   let right = s.length - 1;

//   while (left < right) {
//     while (left < right && !isAlphaNumeric(s[left])) left++;
//     while (left < right && !isAlphaNumeric(s[right])) right--;

//     if (s[left].toLowerCase() !== s[right].toLowerCase()) {
//       return false;
//     }

//     left++;
//     right--;
//   }

//   return true;
// }

// function isAlphaNumeric(c) {
//   return /^[a-z0-9]$/i.test(c);
// }


// Second appraoch for alphanumeric
// function isAlphaNumeric(c) {
//   const code = c.charCodeAt(0);

//   // 0–9 => ASCII 48–57
//   if (code >= 48 && code <= 57) return true;

//   // A–Z => ASCII 65–90
//   if (code >= 65 && code <= 90) return true;

//   // a–z => ASCII 97–122
//   if (code >= 97 && code <= 122) return true;

//   return false;
// }



// 5.Problem: Container With Most Water
// (Leetcode 11 – Very common interview question at FAANG)

// You are given an array height[] of n non-negative integers, where each element represents a vertical line on the x-axis.
// Find two lines that, together with the x-axis, form a container that holds the most water.

// You must solve it in O(n) time.

// function maxArea(height) {
//   let left = 0;
//   let right = height.length - 1;
//   let maxArea = 0;

//   while (left < right) {
//     const h = Math.min(height[left], height[right]);
//     const w = right - left;
//     maxArea = Math.max(maxArea, h * w);

//     if (height[left] < height[right]) {
//       left++;
//     } else {
//       right--;
//     }
//   }

//   return maxArea;
// }


//  6.  Valid Paranthesis

// function isValid(s) {
//   const stack = [];
//   const map = {
//     ')': '(',
//     ']': '[',
//     '}': '{'
//   };

//   for (let char of s) {
//     if (char === '(' || char === '{' || char === '[') {
//       stack.push(char);
//     } else {
//       if (stack.pop() !== map[char]) {
//         return false;
//       }
//     }
//   }

//   return stack.length === 0;
// }

// 7. Problem: Rotate Array
// (LeetCode 189 – Frequently asked in frontend/backend interviews)

// 🔍 Problem Statement
// Given an array nums, rotate the array to the right by k steps, where k >= 0.

// 🧠 The rotation is circular:

// Right rotation means elements move to the right, and the last ones wrap to the front.

/*Input:  nums = [1,2,3,4,5,6,7], k = 3  
Output:        [5,6,7,1,2,3,4]*/

// function rotate(nums, k) {
//   k = k % nums.length;

//   reverse(nums, 0, nums.length - 1);        // Step 1
//   reverse(nums, 0, k - 1);                  // Step 2
//   reverse(nums, k, nums.length - 1);        // Step 3
// }

// function reverse(arr, start, end) {
//   while (start < end) {
//     [arr[start], arr[end]] = [arr[end], arr[start]];
//     start++;
//     end--;
//   }
// }
