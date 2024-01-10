function calculateParameters() {
    // Get values from input fields
    var cutterDiameter = parseFloat(document.getElementById('cutterDiameter').value);
    var amountTooth = parseFloat(document.getElementById('amountTooth').value);
    var cuttingSpeed = parseFloat(document.getElementById('cuttingSpeed').value);
    var feedPerTooth = parseFloat(document.getElementById('feedPerTooth').value);
    var feedDepth = parseFloat(document.getElementById('feedDepth').value);
    var specificCuttingForce = parseFloat(document.getElementById('specificCuttingForce').value);
    var efficiency = parseFloat(document.getElementById('efficiency').value);

    // Perform calculations
    var spindleSpeed = (cuttingSpeed * 1000) / (Math.PI * cutterDiameter);
    var middleChipThickness = feedPerTooth;
    var specificCuttingForceKc = specificCuttingForce / (middleChipThickness ** 0.23);  // Example exponent
    var chipCrosssectionArea = feedDepth * feedPerTooth;
    var cuttingForce = specificCuttingForceKc * chipCrosssectionArea * 1.3;
    var millingPower = (amountTooth / 2) * cuttingForce * cuttingSpeed / 60 / efficiency;

    // Display the result
    var resultText = `Spindle Speed: ${spindleSpeed.toFixed(2)} RPM<br>` +
                     `Middle Chip Thickness: ${middleChipThickness.toFixed(2)} mm<br>` +
                     `Specific Cutting Force: ${specificCuttingForceKc.toFixed(2)} N/mm^2<br>` +
                     `Cutting Force: ${cuttingForce.toFixed(2)} N<br>` +
                     `Milling Power: ${millingPower.toFixed(2)} W`;

    document.getElementById('result').innerHTML = resultText;
}
