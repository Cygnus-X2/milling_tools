
import materialData from './material_data_cutting_force.js';

export function calculateParameters() {
    
    // Get values from input fields
    var cutterDiameter = parseFloat(document.getElementById('cutterDiameter').value);
    var amountTooth = parseFloat(document.getElementById('amountTooth').value);
    var cuttingSpeed = parseFloat(document.getElementById('cuttingSpeed').value);
    var feedPerTooth = parseFloat(document.getElementById('feedPerTooth').value);
    var feedDepth = parseFloat(document.getElementById('feedDepth').value);
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
    var cuttingForce = specificCuttingForceKc * chipCrosssectionArea * 1.3;
    var millingPower = (amountTooth / 4) * cuttingForce * cuttingSpeed / 60 / efficiency;
    
    // Display the result
    var resultText = `Spindle Speed: ${spindleSpeed.toFixed(2)} RPM<br>` +
                     `Middle Chip Thickness: ${middleChipThickness.toFixed(2)} mm<br>` +
                     `Specific Cutting Force: ${specificCuttingForceKc.toFixed(2)} N/mm^2<br>` +
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