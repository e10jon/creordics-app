// This is a mock AI module that simulates setting default values for sliders based on input text

export function generateMockValues(text: string) {
  // Simple heuristics to generate plausible but somewhat random values
  // In a real app, this would be an actual AI model

  // Use length of text as a seed for "randomness" but ensure consistent results for same input
  const seed = text.length;
  
  // Generate deterministic but varying values between 3 and 8
  const generateValue = (position: number): number => {
    const baseValue = ((seed * position) % 6) + 3; // Value between 3 and 8
    return baseValue;
  };
  
  return {
    actions: generateValue(1),
    truthAlignment: generateValue(2),
    meaningfulImpact: generateValue(3),
    transmissibility: generateValue(4),
    replicability: generateValue(5)
  };
}