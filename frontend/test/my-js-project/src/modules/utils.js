// This file includes utility functions that can be used throughout the application.

// Function to generate a unique ID
export function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}

// Function to deep clone an object
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Function to merge two objects
export function mergeObjects(target, source) {
    return { ...target, ...source };
}

// Function to check if a value is an array
export function isArray(value) {
    return Array.isArray(value);
}

// Function to format a date to a readable string
export function formatDate(date) {
    if (!(date instanceof Date)) {
        throw new Error('Invalid date');
    }
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}