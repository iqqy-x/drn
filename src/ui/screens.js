export function createScreens(elements) {
  const screens = [elements.idle, elements.calibration, elements.countdown, elements.ended];
  return {
    show(name) { screens.forEach((screen) => { screen.hidden = screen.id !== `${name}Screen`; }); },
    setCalibration(message, ready) { elements.calibrationState.textContent = message; elements.calibrationButton.disabled = !ready; },
    setCountdown(value) { elements.countdownValue.textContent = value; },
    setEnded(score, delivered, bestCombo) { elements.finalScore.textContent = `${score} poin`; elements.finalSummary.textContent = `Run selesai. Kamu mengirim ${delivered} paket.`; elements.finalDelivered.textContent = delivered; elements.finalCombo.textContent = bestCombo; elements.playerName.value = ""; }
  };
}
