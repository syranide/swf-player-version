/*! swf-player-version v1.0.1 | @syranide | MIT license */

'use strict';

var detectedVersion;

function detectAvailableVersion() {
  if (typeof navigator !== 'undefined') {
    var navSWFPlugin = (
      navigator.plugins &&
      navigator.plugins['Shockwave Flash']
    );

    if (navSWFPlugin) {
      var navSWFMimeType = (
        navigator.mimeTypes &&
        navigator.mimeTypes['application/x-shockwave-flash']
      );

      if (navSWFMimeType && navSWFMimeType.enabledPlugin) {
        try {
          return detectedVersion = (
            navSWFPlugin
              .description
              .match(/(\d+)\.(\d+) r(\d+)/)
              .slice(1)
              .join('.')
          );
        } catch (e) {
        }
      }
    }
  }

  // ActiveXObject-fallback for IE<11
  if (typeof ActiveXObject !== 'undefined') {
    try {
      return detectedVersion = (
        new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
          .GetVariable('$version')
          .match(/(\d+),(\d+),(\d+)/)
          .slice(1)
          .join('.')
      );
    } catch (e) {
    }
  }

  detectedVersion = null;
}

/**
 * Get available SWF Player version. Result is cached.
 *
 * @return {?string} 'X.Y.Z' or null.
 */
function getVersion() {
  if (detectedVersion === undefined) {
    detectAvailableVersion();
  }

  return detectedVersion;
}

/**
 * Determine if available SWF Player meets version requirement.
 *
 * @param {string} requiredString 'X.Y.Z', 'X.Y' or 'X'.
 * @return {boolean} true if supported.
 */
function isVersionSupported(requiredString) {
  var availableString = getVersion();

  if (availableString == null) {
    return false;
  }

  var availableFields = availableString.split('.');
  var requiredFields = requiredString.split('.');

  for (var i = 0; i < 3; i++) {
    var availableNumber = +availableFields[i];
    var requiredNumber = +(requiredFields[i] || 0);

    if (availableNumber !== requiredNumber) {
      return availableNumber > requiredNumber;
    }
  }

  return true;
}

var SWFPlayerVersion = {
  get: getVersion,
  isSupported: isVersionSupported
};

module.exports = SWFPlayerVersion;
