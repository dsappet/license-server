import angular from 'angular';
import _ from 'underscore';
import _string from 'underscore.string';

// The accepted convention previous to using ES6 syntax was that all services were factories
// This is no longer practical with ES6 as classes map to angularjs services so use them! (sorry factories)

// NOTE to keep these redactor services idempotent
export default class indexRedactorService {
  static get $inject() {
    // replaces the indexRedactorService.$inject = []; syntax
    // angulars inject
    return ['$q'];
  }
  constructor($q) {
    this.$q = $q;
  }

  /// Redact some text
  /// required params properties
  /// inputText : string : the text to have redaction performed on it.
  /// phrases : array of strings : the text strings to match and replace
  /// optional params properties
  /// replacementChar : character : the replacement character : defaults to 'X'
  /// caseSensitive : boolean : defaults to true
  // Return: returns a promise that resolves the string, just in case it takes a long time it wont block
  redact(parameters) {
    // Converted to a promise now
    let promise = this.$q((resolve, reject) => {
      // Setup and defaults
      let replacementChar = parameters.replacementChar || 'X';
      // Here is a little example of type checking variables and defaulting if it isn't as expected.
      let caseSensitive =
        typeof parameters.caseSensitive === typeof true
          ? parameters.caseSensitive
          : true;
      if (parameters.phrases === undefined || parameters.phrases.length === 0) {
        return parameters.inputText;
      }

      let phrases = parameters.phrases;
      let searchText = parameters.inputText;
      if (!caseSensitive) {
        phrases = parameters.phrases.map(p => p.toLowerCase());
        searchText = parameters.inputText.toLowerCase();
      }

      // loop through the phrases array
      let indicies = [];
      phrases.map(p => {
        // should just use for loop here now
        let pos = -1;
        do {
          pos = searchText.indexOf(p, pos + 1); // use the start index to reduce search time on subsequent searches
          if (pos === -1) break; // No more matches, abandon ship!
          // Track the starting index and length of the redacted area
          indicies.push({ index: pos, length: p.length });
        } while (pos != -1);
      });

      // Ok now go replace everything in the original text.
      // Overlapping phrases should be handled properly now.
      // we really need a splice method for strings
      // quick google search and guess what? There is an underscore string library ... neat! Now I don't have to write one.
      let redactedText = parameters.inputText;
      for (let i = 0, len = indicies.length; i < len; i++) {
        redactedText = _string.splice(
          redactedText,
          indicies[i].index,
          indicies[i].length,
          this.buildReplacement(replacementChar, indicies[i].length)
        );
      }

      // Go home strings, you're drunk
      resolve(redactedText);
    });
    return promise;
  }
  /// Create the replacement string
  /// For loop is simple but quick for small strings
  buildReplacement(character, length) {
    let replacement = '';
    for (let i = 0; i < length; i++) {
      replacement += character;
    }
    return replacement;
  }
}
