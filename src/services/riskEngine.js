// Rule-based risk scoring engine (v1 — no ML yet)

const SYMPTOM_WEIGHTS = {
  heavy_bleeding:  20,
  severe_cramps:   15,
  fever:           15,
  irregular_cycle: 20,
  discharge:       15,
  fatigue:         10,
  nausea:          10,
  headache:        10,
  bloating:         5,
  mood_swings:      5,
};

export function calculateRisk(symptoms = []) {
  let score = 0;
  for (const s of symptoms) {
    score += SYMPTOM_WEIGHTS[s] || 0;
  }

  if (score >= 50) {
    return {
      risk_level: 'High',
      score,
      message: 'Please consult a doctor immediately.',
      color: '#FF3B30',
    };
  }
  if (score >= 25) {
    return {
      risk_level: 'Medium',
      score,
      message: 'Monitor your symptoms and see a doctor if they persist.',
      color: '#FF9500',
    };
  }
  return {
    risk_level: 'Low',
    score,
    message: 'You appear to be healthy. Keep tracking!',
    color: '#34C759',
  };
}

export const ALL_SYMPTOMS = Object.keys(SYMPTOM_WEIGHTS);
