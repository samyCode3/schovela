"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
// Define the base directory where you want to store the images
const baseDirectory = './src/storage'; // Replace with your desired base folder path
const dirPathName = (subDirectoryName) => {
    return path.join(baseDirectory, subDirectoryName);
};
// Function to create a directory if it doesn't exist
function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    }
}
// Function to save an image to the sub-directory
function saveImageToSubDirectory(subDirectoryPath, imageData, imageName) {
    const imagePath = path.join(dirPathName(subDirectoryPath), imageName);
    ensureDirectoryExistence(imagePath);
    fs.writeFile(imagePath, imageData, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
        }
        else {
            console.log('Image saved successfully:', imagePath);
        }
    });
}
// Example usage:
const base64ImageData = '...'; // Replace with your Base64 image data
const imageName = 'image5.jpg'; // Replace with your desired image name
const sub = 'myImage';
saveImageToSubDirectory(sub, base64ImageData, imageName);
