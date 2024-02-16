
import materialData from './material_data_cutting_force.js';

export function calculateParameters() {

  // Get values from input fields
  var cutterDiameter = parseFloat(document.getElementById('cutterDiameter').value);
  var amountTooth = parseFloat(document.getElementById('amountTooth').value);
  var cuttingSpeed = parseFloat(document.getElementById('cuttingSpeed').value);
  var feedPerTooth = parseFloat(document.getElementById('feedPerTooth').value);
  var feedDepth = parseFloat(document.getElementById('feedDepth').value);
  var feedWidth = parseFloat(document.getElementById('feedWidth').value);
  var efficiency = parseFloat(document.getElementById('efficiency').value);


  // Get selected material and its properties
  var selectedMaterial = document.getElementById('material').value;
  var kc1_1 = materialData[selectedMaterial]['kc1.1'];
  var mc = materialData[selectedMaterial]['mc'];

  // Perform calculations
  var spindleSpeed = (cuttingSpeed * 1000) / (Math.PI * cutterDiameter);
  var middleChipThickness = feedPerTooth;
  var specificCuttingForceKc = kc1_1 / (middleChipThickness ** mc);
  var chipCrosssectionArea = feedDepth * feedPerTooth;
  var cuttingForce = specificCuttingForceKc * chipCrosssectionArea * 1.2;
  var phi = 2 * Math.asin(feedWidth / cutterDiameter);
  var amountTooth = document.getElementById('amountTooth').value; // Assuming you have this input in your HTML
  var ze = amountTooth * (phi / (2 * Math.PI));
  var millingPower = ze * cuttingForce * cuttingSpeed / 60 / efficiency;
  var feedRate = spindleSpeed * feedPerTooth * amountTooth
  var materialRemovalRate = (feedRate * feedDepth * feedWidth) / 1000;

  // Display the result
  var resultText = `Spindle Speed: ${spindleSpeed.toFixed(2)} RPM<br>` +
    `Feed Rate: ${feedRate.toFixed(2)} mm/min <br>` +
    `Material Removal Rate: ${materialRemovalRate.toFixed(2)} cm³/min<br>` +
    `Cutting Force: ${cuttingForce.toFixed(2)} N<br>` +
    `Milling Power: ${millingPower.toFixed(2)} W`;
  document.getElementById('result').innerHTML = resultText;
}

window.addEventListener('load', () => {
  const calcButton = document.getElementById('calculate-button');
  if (calcButton) {
    calcButton.addEventListener('click', calculateParameters);
  }
});