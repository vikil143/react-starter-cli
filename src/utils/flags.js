import { COMPONENT_KEYS, COMPONENT_LABELS } from "../config/components.js";
import { FEATURE_KEYS } from "../config/features.js";

const FEATURE_SET = new Set(FEATURE_KEYS);
const COMPONENT_SET = new Set(COMPONENT_KEYS);

export function parseFlagSelections(flags) {
  const template = resolveTemplate(flags);
  const features = resolveFeatures(flags);
  const components = resolveComponents(flags.components);
  const hasExplicitFeatureSelection = Boolean(flags.all || flags.features || features.length > 0);
  const hasExplicitTemplateSelection = Boolean(flags.template || flags.js || flags.ts);
  const hasExplicitComponentSelection = flags.components !== undefined;

  return {
    template,
    features,
    components,
    skipInstall: Boolean(flags.skipInstall),
    interactive: Boolean(flags.interactive),
    hasExplicitFeatureSelection,
    hasExplicitTemplateSelection,
    hasExplicitComponentSelection,
  };
}

export function resolveTemplate(flags) {
  if (flags.js && flags.ts) {
    throw new Error("Choose either --js or --ts, not both.");
  }

  const template = flags.template?.trim().toLowerCase();

  if (template && !["js", "ts"].includes(template)) {
    throw new Error(`Unsupported template "${flags.template}". Use --template=js or --template=ts.`);
  }

  if (flags.ts || template === "ts") {
    return "ts";
  }

  return "js";
}

export function resolveFeatures(flags) {
  if (flags.all) {
    return [...FEATURE_KEYS];
  }

  const merged = new Set();

  for (const feature of FEATURE_KEYS) {
    if (flags[feature]) {
      merged.add(feature);
    }
  }

  for (const feature of parseCsvFlag(flags.features)) {
    if (!FEATURE_SET.has(feature)) {
      throw new Error(
        `Unsupported feature "${feature}". Supported features: ${FEATURE_KEYS.join(", ")}.`
      );
    }

    merged.add(feature);
  }

  return [...merged];
}

export function resolveComponents(rawValue) {
  if (rawValue === undefined) {
    return undefined;
  }

  const merged = new Set();

  for (const component of parseCsvFlag(rawValue)) {
    if (!COMPONENT_SET.has(component)) {
      throw new Error(
        `Unsupported component "${component}". Supported components: ${Object.values(COMPONENT_LABELS).join(", ")}.`
      );
    }

    merged.add(component);
  }

  return [...merged];
}

function parseCsvFlag(rawValue) {
  if (!rawValue) {
    return [];
  }

  return rawValue
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function formatSelectionLabels(keys, labels) {
  return keys.map((key) => labels[key]);
}
