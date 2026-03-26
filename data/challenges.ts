export interface Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const challenges: Challenge[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    starterCode: `def two_sum(nums, target):
  # Write your code here
  pass

# Example test case
print(two_sum([2, 7, 11, 15], 9)) # Expected output: [0, 1]
`,
    difficulty: 'Easy',
  },
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    starterCode: `def reverse_string(s):
  # Write your code here
  pass

# Example test case
s = ["h", "e", "l", "l", "o"]
reverse_string(s)
print(s) # Expected output: ["o", "l", "l", "e", "h"]
`,
    difficulty: 'Easy',
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci Number',
    description: 'The Fibonacci numbers, commonly denoted `F(n)`, form a sequence such that each number is the sum of the two preceding ones, starting from 0 and 1. Write a function to compute the nth Fibonacci number.',
    starterCode: `def fib(n):
  # Write your code here
  pass

# Example test case
print(fib(10)) # Expected output: 55
`,
    difficulty: 'Medium',
  },
  {
    id: 'palindrome',
    title: 'Valid Palindrome',
    description: 'A phrase is a palindrome if it reads the same forward and backward. Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
    starterCode: `def is_palindrome(s):
  # Write your code here
  pass

# Example test cases
print(is_palindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(is_palindrome("race a car"))  # Expected: False
`,
    difficulty: 'Easy',
  },
  {
    id: 'anagram',
    title: 'Valid Anagram',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    starterCode: `def is_anagram(s, t):
  # Write your code here
  pass

# Example test cases
print(is_anagram("anagram", "nagaram"))  # Expected: True
print(is_anagram("rat", "car"))  # Expected: False
`,
    difficulty: 'Easy',
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray',
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    starterCode: `def max_subarray(nums):
  # Write your code here
  pass

# Example test case
print(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
`,
    difficulty: 'Medium',
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    description: 'Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals, and return an array of the non-overlapping intervals.',
    starterCode: `def merge_intervals(intervals):
  # Write your code here
  pass

# Example test case
intervals = [[1,3],[2,6],[8,10],[15,18]]
print(merge_intervals(intervals))  # Expected: [[1,6],[8,10],[15,18]]
`,
    difficulty: 'Medium',
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    starterCode: `def climb_stairs(n):
  # Write your code here
  pass

# Example test cases
print(climb_stairs(2))  # Expected: 2
print(climb_stairs(3))  # Expected: 3
`,
    difficulty: 'Easy',
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.',
    starterCode: `def binary_search(nums, target):
  # Write your code here
  pass

# Example test case
nums = [-1,0,3,5,9,12]
print(binary_search(nums, 9))  # Expected: 4
print(binary_search(nums, 2))  # Expected: -1
`,
    difficulty: 'Easy',
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    starterCode: `def length_of_longest_substring(s):
  # Write your code here
  pass

# Example test cases
print(length_of_longest_substring("abcabcbb"))  # Expected: 3
print(length_of_longest_substring("bbbbb"))     # Expected: 1
print(length_of_longest_substring("pwwkew"))    # Expected: 3
`,
    difficulty: 'Medium',
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    starterCode: `def group_anagrams(strs):
  # Write your code here
  pass

# Example test case
strs = ["eat","tea","tan","ate","nat","bat"]
print(group_anagrams(strs))  # Expected: [["bat"],["nat","tan"],["ate","eat","tea"]]
`,
    difficulty: 'Medium',
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    starterCode: `def is_valid(s):
  # Write your code here
  pass

# Example test cases
print(is_valid("()"))     # Expected: True
print(is_valid("()[]{}")) # Expected: True
print(is_valid("(]"))     # Expected: False
`,
    difficulty: 'Easy',
  },
  {
    id: 'missing-number',
    title: 'Missing Number',
    description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
    starterCode: `def missing_number(nums):
  # Write your code here
  pass

# Example test cases
print(missing_number([3,0,1]))     # Expected: 2
print(missing_number([0,1]))       # Expected: 2
print(missing_number([9,6,4,2,3,5,7,0,1]))  # Expected: 8
`,
    difficulty: 'Easy',
  },
  {
    id: 'product-except-self',
    title: 'Product of Array Except Self',
    description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].',
    starterCode: `def product_except_self(nums):
  # Write your code here
  pass

# Example test case
print(product_except_self([1,2,3,4]))  # Expected: [24,12,8,6]
`,
    difficulty: 'Medium',
  },
  {
    id: 'rotate-array',
    title: 'Rotate Array',
    description: 'Given an array, rotate the array to the right by k steps, where k is non-negative.',
    starterCode: `def rotate(nums, k):
  # Write your code here (modify nums in-place)
  pass

# Example test case
nums = [1,2,3,4,5,6,7]
rotate(nums, 3)
print(nums)  # Expected: [5,6,7,1,2,3,4]
`,
    difficulty: 'Medium',
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    starterCode: `def contains_duplicate(nums):
  # Write your code here
  pass

# Example test cases
print(contains_duplicate([1,2,3,1]))     # Expected: True
print(contains_duplicate([1,2,3,4]))     # Expected: False
`,
    difficulty: 'Easy',
  },
  {
    id: 'house-robber',
    title: 'House Robber',
    description: 'You are a professional robber. Houses are arranged in a row, and you cannot rob two adjacent houses. Given an array representing the amount of money in each house, return the maximum amount you can rob.',
    starterCode: `def rob(nums):
  # Write your code here
  pass

# Example test cases
print(rob([1,2,3,1]))     # Expected: 4
print(rob([2,7,9,3,1]))   # Expected: 12
`,
    difficulty: 'Medium',
  },
  {
    id: 'best-time-stock',
    title: 'Best Time to Buy and Sell Stock',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy and a single day to sell.',
    starterCode: `def max_profit(prices):
  # Write your code here
  pass

# Example test cases
print(max_profit([7,1,5,3,6,4]))  # Expected: 5
print(max_profit([7,6,4,3,1]))    # Expected: 0
`,
    difficulty: 'Easy',
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    description: 'You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins that you need to make up that amount.',
    starterCode: `def coin_change(coins, amount):
  # Write your code here
  pass

# Example test cases
print(coin_change([1,3,4], 6))    # Expected: 2
print(coin_change([2], 3))        # Expected: -1
`,
    difficulty: 'Medium',
  },
  {
    id: 'valid-sudoku',
    title: 'Valid Sudoku',
    description: 'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the rules: each row, column, and 3x3 sub-box must contain unique digits 1-9.',
    starterCode: `def is_valid_sudoku(board):
  # Write your code here
  pass

# Example test case
board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
print(is_valid_sudoku(board))  # Expected: True
`,
    difficulty: 'Medium',
  },
  {
    id: 'longest-palindrome',
    title: 'Longest Palindromic Substring',
    description: 'Given a string s, return the longest palindromic substring in s.',
    starterCode: `def longest_palindrome(s):
  # Write your code here
  pass

# Example test cases
print(longest_palindrome("babad"))   # Expected: "bab" or "aba"
print(longest_palindrome("cbbd"))    # Expected: "bb"
`,
    difficulty: 'Medium',
  },
  {
    id: 'word-pattern',
    title: 'Word Pattern',
    description: 'Given a pattern and a string s, find if s follows the same pattern. Here "follow" means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.',
    starterCode: `def word_pattern(pattern, s):
  # Write your code here
  pass

# Example test cases
print(word_pattern("abba", "dog cat cat dog"))    # Expected: True
print(word_pattern("abba", "dog cat cat fish"))   # Expected: False
`,
    difficulty: 'Easy',
  },
  {
    id: 'number-islands',
    title: 'Number of Islands',
    description: 'Given an m x n 2D binary grid which represents a map of "1"s (land) and "0"s (water), return the number of islands.',
    starterCode: `def num_islands(grid):
  # Write your code here
  pass

# Example test case
grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
print(num_islands(grid))  # Expected: 1
`,
    difficulty: 'Medium',
  },
  {
    id: 'search-rotated-array',
    title: 'Search in Rotated Sorted Array',
    description: 'You are given an integer array nums sorted in ascending order (with distinct values), and an integer target. Suppose that nums is rotated at some pivot. Search for target in this array.',
    starterCode: `def search(nums, target):
  # Write your code here
  pass

# Example test cases
print(search([4,5,6,7,0,1,2], 0))  # Expected: 4
print(search([4,5,6,7,0,1,2], 3))  # Expected: -1
`,
    difficulty: 'Medium',
  },
  {
    id: 'trapping-rainwater',
    title: 'Trapping Rain Water',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    starterCode: `def trap(height):
  # Write your code here
  pass

# Example test case
print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # Expected: 6
`,
    difficulty: 'Hard',
  },
  {
    id: 'median-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    starterCode: `def find_median_sorted_arrays(nums1, nums2):
  # Write your code here
  pass

# Example test cases
print(find_median_sorted_arrays([1,3], [2]))     # Expected: 2.0
print(find_median_sorted_arrays([1,2], [3,4]))   # Expected: 2.5
`,
    difficulty: 'Hard',
  },
]; 