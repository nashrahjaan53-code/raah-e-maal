const SAVED_STRATEGIES_KEY = "loanpilot_saved_strategies";

export function getSavedStrategies() {
  try {
    const rawValue = localStorage.getItem(SAVED_STRATEGIES_KEY);
    const parsedValue = rawValue ? JSON.parse(rawValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function getSavedStrategy() {
  return getSavedStrategies()[0] || null;
}

export function saveStrategy(strategy) {
  const existingStrategies = getSavedStrategies().filter(
    (item) => item.name !== strategy.name || item.loanSignature !== strategy.loanSignature
  );

  const payload = {
    ...strategy,
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    SAVED_STRATEGIES_KEY,
    JSON.stringify([payload, ...existingStrategies])
  );

  return payload;
}

export function deleteSavedStrategy(targetStrategy) {
  const nextStrategies = getSavedStrategies().filter(
    (item) =>
      item.savedAt !== targetStrategy.savedAt ||
      item.name !== targetStrategy.name ||
      item.loanSignature !== targetStrategy.loanSignature
  );

  localStorage.setItem(SAVED_STRATEGIES_KEY, JSON.stringify(nextStrategies));
  return nextStrategies;
}

export function clearSavedStrategy() {
  localStorage.removeItem(SAVED_STRATEGIES_KEY);
}
