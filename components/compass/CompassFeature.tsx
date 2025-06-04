import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { RecursionIcon } from "../RecursionIcon";
import { PhilosophicalSlider } from "../PhilosophicalSlider";
import { ScoreDisplay } from "../ScoreDisplay";
import { FactorLegend } from "../FactorLegend";
import { ComparisonDisplay } from "../ComparisonDisplay";
import { generateMockValues } from "../mockAI";
import { Button } from "@gluestack-ui/themed";

type Step = "firstIdea" | "secondIdea" | "comparison" | "results";

interface IdeaEvaluation {
  name: string;
  actions: number;
  truthAlignment: number;
  meaningfulImpact: number;
  transmissibility: number;
  replicability: number;
}

export function CompassFeature() {
  const [currentStep, setCurrentStep] = useState<Step>("firstIdea");
  const [showLegend, setShowLegend] = useState(false);

  // First idea state
  const [firstIdea, setFirstIdea] = useState("");
  const [firstIdeaEvaluation, setFirstIdeaEvaluation] =
    useState<IdeaEvaluation>({
      name: "",
      actions: 5,
      truthAlignment: 5,
      meaningfulImpact: 5,
      transmissibility: 5,
      replicability: 5,
    });

  // Second idea state
  const [secondIdea, setSecondIdea] = useState("");
  const [secondIdeaEvaluation, setSecondIdeaEvaluation] =
    useState<IdeaEvaluation>({
      name: "",
      actions: 5,
      truthAlignment: 5,
      meaningfulImpact: 5,
      transmissibility: 5,
      replicability: 5,
    });

  // Calculate scores
  const calculateScore = (evaluation: IdeaEvaluation): number => {
    return (
      evaluation.actions +
      evaluation.truthAlignment +
      evaluation.meaningfulImpact +
      evaluation.transmissibility +
      evaluation.replicability
    );
  };

  const firstScore = calculateScore(firstIdeaEvaluation);
  const secondScore = calculateScore(secondIdeaEvaluation);

  // Set AI-generated values when moving to comparison screen
  useEffect(() => {
    if (
      currentStep === "comparison" &&
      firstIdea &&
      firstIdeaEvaluation.name === ""
    ) {
      const firstValues = generateMockValues(firstIdea);
      setFirstIdeaEvaluation({
        name: firstIdea,
        ...firstValues,
      });

      const secondValues = generateMockValues(secondIdea);
      setSecondIdeaEvaluation({
        name: secondIdea,
        ...secondValues,
      });
    }
  }, [currentStep, firstIdea, secondIdea, firstIdeaEvaluation.name]);

  const handleNextStep = () => {
    switch (currentStep) {
      case "firstIdea":
        if (firstIdea.trim()) setCurrentStep("secondIdea");
        break;
      case "secondIdea":
        if (secondIdea.trim()) setCurrentStep("comparison");
        break;
      case "comparison":
        setCurrentStep("results");
        break;
      case "results":
        // Reset and start over
        setFirstIdea("");
        setSecondIdea("");
        setFirstIdeaEvaluation({
          name: "",
          actions: 5,
          truthAlignment: 5,
          meaningfulImpact: 5,
          transmissibility: 5,
          replicability: 5,
        });
        setSecondIdeaEvaluation({
          name: "",
          actions: 5,
          truthAlignment: 5,
          meaningfulImpact: 5,
          transmissibility: 5,
          replicability: 5,
        });
        setCurrentStep("firstIdea");
        break;
    }
  };

  const handlePrevStep = () => {
    switch (currentStep) {
      case "secondIdea":
        setCurrentStep("firstIdea");
        break;
      case "comparison":
        setCurrentStep("secondIdea");
        break;
      case "results":
        setCurrentStep("comparison");
        break;
    }
  };

  // Render the appropriate content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case "firstIdea":
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>
                What idea or action are you considering?
              </Text>
              <TextInput
                value={firstIdea}
                onChangeText={setFirstIdea}
                style={styles.input}
                placeholder="Enter your first idea..."
                placeholderTextColor="#666"
              />
            </View>
          </View>
        );

      case "secondIdea":
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>
                What alternative are you considering?
              </Text>
              <TextInput
                value={secondIdea}
                onChangeText={setSecondIdea}
                style={styles.input}
                placeholder="Enter your alternative idea..."
                placeholderTextColor="#666"
              />
            </View>
          </View>
        );

      case "comparison":
        return (
          <ScrollView style={styles.comparisonContainer}>
            <View style={styles.comparisonContent}>
              <View style={styles.comparisonHeader}>
                <Text style={styles.comparisonTitle}>Evaluate Your Ideas</Text>
                <Button onPress={() => setShowLegend(!showLegend)}>
                  <Text style={styles.buttonText}>
                    {showLegend ? "Hide Legend" : "Show Legend"}
                  </Text>
                </Button>
              </View>

              {showLegend && <FactorLegend />}

              <View style={styles.evaluationContainer}>
                <View style={styles.evaluationCard}>
                  <Text style={styles.evaluationTitle}>{firstIdea}</Text>
                  <View>
                    <PhilosophicalSlider
                      label="Actions"
                      value={firstIdeaEvaluation.actions}
                      onChange={(values) =>
                        setFirstIdeaEvaluation({
                          ...firstIdeaEvaluation,
                          actions: values[0],
                        })
                      }
                    />
                    <PhilosophicalSlider
                      label="Truth Alignment"
                      value={firstIdeaEvaluation.truthAlignment}
                      onChange={(values) =>
                        setFirstIdeaEvaluation({
                          ...firstIdeaEvaluation,
                          truthAlignment: values[0],
                        })
                      }
                    />
                    <PhilosophicalSlider
                      label="Meaningful Impact"
                      value={firstIdeaEvaluation.meaningfulImpact}
                      onChange={(values) =>
                        setFirstIdeaEvaluation({
                          ...firstIdeaEvaluation,
                          meaningfulImpact: values[0],
                        })
                      }
                    />
                    <PhilosophicalSlider
                      label="Transmissibility"
                      value={firstIdeaEvaluation.transmissibility}
                      onChange={(values) =>
                        setFirstIdeaEvaluation({
                          ...firstIdeaEvaluation,
                          transmissibility: values[0],
                        })
                      }
                    />
                    <PhilosophicalSlider
                      label="Replicability"
                      value={firstIdeaEvaluation.replicability}
                      onChange={(values) =>
                        setFirstIdeaEvaluation({
                          ...firstIdeaEvaluation,
                          replicability: values[0],
                        })
                      }
                    />
                  </View>
                  <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>Total Score</Text>
                    <View style={styles.scoreCircle}>
                      <Text style={styles.scoreValue}>{firstScore}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.evaluationCard}>
                  <Text style={styles.evaluationTitle}>{secondIdea}</Text>
                  <View>
                    <PhilosophicalSlider
                      label="Actions"
                      value={secondIdeaEvaluation.actions}
                      onChange={(values) =>
                        setSecondIdeaEvaluation({
                          ...secondIdeaEvaluation,
                          actions: values[0],
                        })
                      }
                    />
                    <PhilosophicalSlider
                      label="Truth Alignment"
                      value={secondIdeaEvaluation.truthAlignment}
                      onChange={(values) =>
                        setSecondIdeaEvaluation({
                          ...secondIdeaEvaluation,
                          truthAlignment: values[0],
                        })
                      }
                    />
                    <PhilosophicalSlider
                      label="Meaningful Impact"
                      value={secondIdeaEvaluation.meaningfulImpact}
                      onChange={(values) =>
                        setSecondIdeaEvaluation({
                          ...secondIdeaEvaluation,
                          meaningfulImpact: values[0],
                        })
                      }
                    />
                    <PhilosophicalSlider
                      label="Transmissibility"
                      value={secondIdeaEvaluation.transmissibility}
                      onChange={(values) =>
                        setSecondIdeaEvaluation({
                          ...secondIdeaEvaluation,
                          transmissibility: values[0],
                        })
                      }
                    />
                    <PhilosophicalSlider
                      label="Replicability"
                      value={secondIdeaEvaluation.replicability}
                      onChange={(values) =>
                        setSecondIdeaEvaluation({
                          ...secondIdeaEvaluation,
                          replicability: values[0],
                        })
                      }
                    />
                  </View>
                  <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>Total Score</Text>
                    <View style={styles.scoreCircle}>
                      <Text style={styles.scoreValue}>{secondScore}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case "results":
        return (
          <ScrollView style={styles.resultsContainer}>
            <View style={styles.resultsContent}>
              <Text style={styles.resultsTitle}>Comparison Results</Text>

              <ComparisonDisplay
                firstIdeaName={firstIdea}
                secondIdeaName={secondIdea}
                firstScore={firstScore}
                secondScore={secondScore}
              />

              <View style={styles.scoreDisplayContainer}>
                <ScoreDisplay score={firstScore} />
                <ScoreDisplay score={secondScore} />
              </View>
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <View
          style={[
            styles.stepTab,
            currentStep === "firstIdea" && styles.activeStepTab,
          ]}
        >
          <Text style={styles.stepTabText}>Idea</Text>
        </View>
        <View
          style={[
            styles.stepTab,
            currentStep === "secondIdea" && styles.activeStepTab,
          ]}
        >
          <Text style={styles.stepTabText}>Alternative</Text>
        </View>
        <View
          style={[
            styles.stepTab,
            currentStep === "comparison" && styles.activeStepTab,
          ]}
        >
          <Text style={styles.stepTabText}>Evaluate</Text>
        </View>
        <View
          style={[
            styles.stepTab,
            currentStep === "results" && styles.activeStepTab,
          ]}
        >
          <Text style={styles.stepTabText}>Compare</Text>
        </View>
      </View>

      {/* Main Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <Button
          onPress={handlePrevStep}
          disabled={currentStep === "firstIdea"}
          style={styles.navButton}
        >
          <Text style={styles.buttonText}>Back</Text>
        </Button>
        <Button
          onPress={handleNextStep}
          disabled={
            (currentStep === "firstIdea" && !firstIdea.trim()) ||
            (currentStep === "secondIdea" && !secondIdea.trim())
          }
          style={styles.navButton}
        >
          <Text style={styles.buttonText}>
            {currentStep === "results" ? "Start Over" : "Next"}
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  stepIndicator: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  stepTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeStepTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  stepTabText: {
    fontSize: 14,
    color: "#666",
  },
  stepContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  stepContent: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  comparisonContainer: {
    flex: 1,
  },
  comparisonContent: {
    padding: 16,
  },
  comparisonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  comparisonTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  evaluationContainer: {
    gap: 16,
  },
  evaluationCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
  },
  evaluationTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  scoreLabel: {
    fontSize: 14,
    color: "#666",
  },
  scoreCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 14,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  scoreDisplayContainer: {
    gap: 16,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
