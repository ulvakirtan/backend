const faceapi = require('face-api.js');
const canvas = require('canvas');
const fs = require('fs');
const path = require('path');
const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let loaded = false;
async function loadModels() {
  if (loaded) return;
  const MODEL_URL = path.resolve(__dirname, '../../models');
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL); // Face detector
  loaded = true;
}

async function loadImage(imagePath) {
  const img = await canvas.loadImage(imagePath);
  return faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
}

async function compareFaces(img1Path, img2Path) {
  await loadModels();
  const img1 = await loadImage(img1Path);
  const img2 = await loadImage(img2Path);
  if (!img1 || !img2) return { success: false, message: 'Face not detected in one or both images.' };
  const distance = faceapi.euclideanDistance(img1.descriptor, img2.descriptor);
  const threshold = 0.6; // Lower is more strict
  const match = distance < threshold;
  return { success: true, match, distance };
}

module.exports = { compareFaces };

