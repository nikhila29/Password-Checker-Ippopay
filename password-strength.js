// 1. A password is considered strong if the below conditions
// are all met:
// ● It has at least 6 characters and at most 20 characters.
// ● It contains at least one lowercase letter, at least one
// uppercase letter, and at least one digit.
// ● It does not contain three repeating characters in a row
// (i.e., &quot;Baaabb0&quot; is weak, but &quot;Baaba0&quot; is strong).
// Given a string password, return the minimum number of steps
// required to make password strong. if password is already
// strong, return 0.
// In one step, you can:
// ● Insert one character to password,
// ● Delete one character from password, or
// ● Replace one character of password with another
// character.
// Example 1:
// Input: password = &quot;a&quot;
// Output: 5
// Example 2:

// Input: password = &quot;aA1&quot;
// Output: 3
// Example 3:
// Input: password = &quot;1337C0d3&quot;
// Output: 0

function strongPasswordChecker(password) {
  // Define the conditions for a strong password
  const minLength = 6;
  const maxLength = 20;
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /[0-9]/;

  // Check if the password is already strong
  let missingConditions = 0;
  if (!lowercaseRegex.test(password)) {
    missingConditions++;
  }
  if (!uppercaseRegex.test(password)) {
    missingConditions++;
  }
  if (!digitRegex.test(password)) {
    missingConditions++;
  }

  // Check the length condition
  if (password.length < minLength) {
    const addLength = minLength - password.length;
    return Math.max(missingConditions, addLength);
  } else if (password.length > maxLength) {
    let deleteLength = password.length - maxLength;
    let repeatingChars = 0;
    let i = 2;

    // Count repeating characters to optimize deletions
    while (i < password.length) {
      if (
        password[i] === password[i - 1] &&
        password[i] === password[i - 2]
      ) {
        repeatingChars++;
        i += 3; // Skip the repeating characters
      } else {
        i++;
      }
    }

    deleteLength -= repeatingChars * 2;
    return deleteLength > missingConditions
      ? deleteLength
      : Math.max(deleteLength, missingConditions);
  } else {
    // Password length is within the valid range, check for repeating characters
    let repeatingChars = 0;
    let i = 2;

    while (i < password.length) {
      if (
        password[i] === password[i - 1] &&
        password[i] === password[i - 2]
      ) {
        repeatingChars++;
        i += 3; // Skip the repeating characters
      } else {
        i++;
      }
    }

    return Math.max(repeatingChars, missingConditions);
  }
}

// Test cases
console.log(strongPasswordChecker("a")); // Output: 5
console.log(strongPasswordChecker("aA1")); // Output: 3
console.log(strongPasswordChecker("1337C0d3")); // Output: 0
console.log(strongPasswordChecker("Nikhila")); // Output: 1
console.log(strongPasswordChecker("7@")); // Output: 4
console.log(strongPasswordChecker("nikhila@3")); // Output: 1
console.log(strongPasswordChecker("67")); // Output: 4-- capital,small, min length-6



