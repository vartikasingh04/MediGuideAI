import diseases from "../data/diseases";

export function matchDiseases(userSymptoms) {
  const results = diseases.map((disease) => {
    const matchedSymptoms = disease.symptoms.filter(
      (symptom) => userSymptoms.includes(symptom)
    );

    const score =
      disease.symptoms.length === 0
        ? 0
        : Math.round(
            (matchedSymptoms.length /
              disease.symptoms.length) *
              100
          );

    return {
      ...disease,
      matchedSymptoms,
      score,
    };
  });

  return results
    .filter(
      (disease) =>
        disease.matchedSymptoms.length > 0
    )
    .sort((a, b) => b.score - a.score);
}