/*! swf-player-version v1.1.1 | @syranide | MIT license */

'use strict';

var detectedVersion;

function parseVersion(description) {
  return description.match(/\d+/g).slice(0, 3).join('.');
}

function detectAvailableVersion() {
  if (typeof navigator === 'object') {
    if (navigator.mimeTypes) {
      var mimeType = navigator.mimeTypes['application/x-shockwave-flash'];

      if (mimeType) {
        var plugin = mimeType.enabledPlugin;

        if (plugin) {
          // Expected format "Shockwave Flash #.# r#", "Shockwave Flash #.# d#"
          detectedVersion = parseVersion(plugin.description);
          return;
        }
      }
    }
  }

  // ActiveXObject for IE<11
  if (typeof ActiveXObject === 'function') {
    var instance;

    try {
      // Throws "Automation server can't create object" if unavailable
      instance = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    } catch (e) {
    }

    if (instance) {
      // Expected format "WIN #,#,#,#"
      detectedVersion = parseVersion(instance.GetVariable('$version'));
      return;
    }
  }

  detectedVersion = null;
}

/**
 * Get available SWF Player version. Result is cached.
 *
 * @return {?string} '#.#.#' or null.
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
 * @param {string} requiredString '#.#.#', '#.#', '#' or ''.
 * @return {boolean} true if supported.
 */
function isVersionSupported(requiredString) {
  var availableString = getVersion();

  if (availableString == null) {
    return false;
  }

  var availableFields = availableString.split('.');
  var requiredFields = requiredString.split('.');

  for (var i = 0; i < requiredFields.length; i++) {
    var availableField = availableFields[i] || '0';
    var requiredField = requiredFields[i];

    if (availableField !== requiredField) {
      return +availableField > +requiredField;
    }
  }

  return true;
}

var SWFPlayerVersion = {
  get: getVersion,
  isSupported: isVersionSupported
};

module.exports = SWFPlayerVersion;
