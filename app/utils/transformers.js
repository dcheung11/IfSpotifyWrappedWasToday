export function toCamelCase(str) {
  let words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  words.join(', ');
  return words;
}

export function capitalizeFirstLetters(str) {
  // Split the string into an array of words
  let words = str.split(' ');

  // Iterate over the words and capitalize the first letter of each
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words back into a string and return it
  return words.join(' ');
}
