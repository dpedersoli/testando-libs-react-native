/**
 * Style utility helpers for merging custom styles with defaults
 * @module form-validation/utils/styleHelpers
 */

import type { StyleConfig } from '../types';
import { defaultStyleConfig } from '../constants/defaultStyles';

/**
 * Deeply merges custom style configuration with defaults
 *
 * Takes a partial StyleConfig and merges it with default values,
 * ensuring all properties are defined. Custom values override defaults.
 *
 * @param {StyleConfig} [custom] - Custom style configuration (partial)
 * @returns {StyleConfig} Complete style configuration with all properties
 *
 * @example
 * const styles = mergeStyleConfig({
 *   colors: { invalid: '#FF1744' }
 * });
 * // Returns full StyleConfig with custom invalid color and all other defaults
 */
export function mergeStyleConfig(custom?: StyleConfig): StyleConfig {
  if (!custom) {
    return defaultStyleConfig;
  }

  return {
    colors: {
      ...defaultStyleConfig.colors,
      ...custom.colors,
    },
    border: {
      ...defaultStyleConfig.border,
      ...custom.border,
    },
    typography: {
      ...defaultStyleConfig.typography,
      ...custom.typography,
    },
    spacing: {
      ...defaultStyleConfig.spacing,
      ...custom.spacing,
    },
    errorStyle: {
      ...defaultStyleConfig.errorStyle,
      ...custom.errorStyle,
    },
  };
}
