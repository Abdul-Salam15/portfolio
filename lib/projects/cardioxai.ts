import { HeartPulse } from "lucide-react"
import type { Project } from "./types"

// Sources: card description and README. Text last updated from projects.md.
export const cardioxai: Project = {
  slug: "cardioxai",
  title: "CardioXAI",
  icon: HeartPulse,
  categories: ["AI & Backend"],
  featured: false,
  tagLine: "Applied Machine Learning",
  timeline: "Jun 2026 – Jul 2026",
  personal: true,
  techStack: ["Python", "Scikit-Learn", "XGBoost", "SHAP", "LIME", "SMOTE"],
  summary:
    "Most heart-disease risk tools rely on lab tests that many people can't easily get. I built an explainable model that estimates coronary heart disease risk from self-reported answers alone, reaching 0.815 AUC-ROC.",

  impact: [
    { value: "0.815", label: "AUC-ROC on the held-out test set" },
    { value: "0.413", label: "F1 score, the highest of all the models tested" },
    { value: "253,680", label: "CDC survey records in the source dataset" },
  ],
  problem:
    "Standard risk tools like Framingham and QRISK3 depend on clinical measurements such as cholesterol, blood pressure readings and fasting glucose. People without regular access to healthcare can't easily get those numbers, which leaves many of them out, particularly in low- and middle-income countries.",
  solution:
    "A Django web app that estimates coronary heart disease risk from 16 self-reported answers covering demographics, medical history and lifestyle. I trained Logistic Regression, Random Forest and XGBoost models on the CDC's BRFSS survey data, used SMOTE to balance the classes, and combined the three into a weighted consensus ensemble. Each result includes SHAP and LIME explanations, a confidence tier, a knowledge graph of risk factors and up to five lifestyle recommendations based on cardiovascular guidelines.",
  edgeCases: [
    {
      title: "Only 12.2% of records are positive cases",
      handling: "SMOTE is applied to the training set only, so validation and test scores reflect real-world data.",
    },
    {
      title: "The models disagree on a person",
      handling: "Disagreement and uncertainty push the result into a low confidence tier, which directs the user to a doctor rather than showing a score that could mislead them.",
    },
    {
      title: "One explanation method could mislead",
      handling: "SHAP and LIME appear side by side, so users can compare the two.",
    },
    {
      title: "Advice that sounds right but isn't",
      handling: "Recommendations come from established cardiovascular guidelines, not from a language model.",
    },
    {
      title: "Sensitive health answers",
      handling: "Nothing is stored beyond the browser session, and nothing is shared with third parties.",
    },
    {
      title: "Users treating it as a diagnosis",
      handling: "Clear disclaimers appear before, during and after the assessment.",
    },
  ],

  githubUrl: "https://github.com/Abdul-Salam15/CardioXAI",
  liveUrl: "https://cardioxai-rovx.onrender.com",
}
