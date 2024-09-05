// usernameUtils.js

// Utility function to generate a random username
export const generateUsername = () => {
    const adjectives = ["Quick", "Brave", "Bright", "Clever", "Wise", "Fierce"];
    const nouns = ["Tiger", "Lion", "Eagle", "Shark", "Wolf", "Falcon"];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000); // Append a random number

    return `${randomAdjective}${randomNoun}${randomNumber}`;
};
