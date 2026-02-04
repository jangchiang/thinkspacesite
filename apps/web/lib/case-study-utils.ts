/**
 * Determines if a result value is a short metric (e.g., "60%", "3x", "99.99%")
 * vs a long descriptive string.
 */
export function isMetricValue(value: string): boolean {
  const trimmed = value.trim()
  return trimmed.length <= 10 && /\d/.test(trimmed)
}

/**
 * Given an array of result objects, returns 'metric' if all values are short metrics,
 * otherwise 'descriptive'.
 */
export function getResultDisplayMode(
  results: { value: string; label: string }[]
): 'metric' | 'descriptive' {
  if (results.length === 0) return 'metric'
  return results.every((r) => isMetricValue(r.value)) ? 'metric' : 'descriptive'
}
