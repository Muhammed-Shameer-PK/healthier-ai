const HOTLINE = '108'; // National Ambulance (India)
const ASHA_HOTLINE = '104';

export function classifyEmergency(riskLevel, symptoms = []) {
  const critical = ['heavy_bleeding', 'severe_cramps', 'fever'];
  const hasCritical = critical.some(s => symptoms.includes(s));

  if (riskLevel === 'High' || hasCritical) {
    return {
      level: 'CRITICAL',
      message: 'Seek medical help immediately.',
      hotline: HOTLINE,
      color: '#FF3B30',
    };
  }
  if (riskLevel === 'Medium') {
    return {
      level: 'WARNING',
      message: 'Contact your ASHA worker or local clinic.',
      hotline: ASHA_HOTLINE,
      color: '#FF9500',
    };
  }
  return null;
}

export function simulateSMS(phone, message) {
  // In production this would use an SMS gateway (e.g. MSG91)
  console.log(`[SMS SIMULATION] To: ${phone}`);
  console.log(`[SMS SIMULATION] Body: ${message}`);
  return { sent: true, simulated: true, phone, message };
}
