/**
 * Debounce utility for delaying function execution
 * @module form-validation/utils/debounce
 */

/**
 * Debounces a function, delaying its execution until after the specified delay
 * has elapsed since the last time it was invoked.
 *
 * @template T - Function type
 * @param {T} fn - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {T} The debounced function
 *
 * @example
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching for:', query);
 * }, 500);
 *
 * // Will only execute once, 500ms after the last call
 * debouncedSearch('a');
 * debouncedSearch('ab');
 * debouncedSearch('abc'); // Only this executes after 500ms
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(...args: Parameters<T>): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}
