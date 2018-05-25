import angular from 'angular'; // for webpack's sake

// The accepted convention previous to using ES6 syntax was that all services were factories
// This is no longer practical with ES6 as classes map to angularjs services so use them! (sorry factories)

export default class keyPhraseService {
  static get $inject() {
    // angulars inject
    return ['$log'];
  }
  constructor($log) {
    this.$log = $log;
  }

  /// take in a string and parse it out to phrases
  /// input : str : string
  /// input will be words or phrases separated by comma or spaces
  /// phrases will be enclosed in single or double quotes
  /// examples:
  /// Hello world “Boston Red Sox”
  /// ‘Pepperoni Pizza’, ‘Cheese Pizza’, beer

  // There are some edge case scenarios that are not explicitly listed,
  // can commas be in phrases? - YES
  // Can a quote be in a phrase? - NO
  // Empty quotes? - NO
  // Empty commas? - YES
  /// Output: array of strings : parsed and ready phrases to redact

  // TODO : Unit test this puppy! Perfect candidate.
  parse(str) {
    //this.$log.info(`Initial string: ${str}`);
    // single or double quotes can be used so let's unify with a replace to be all "
    // quotes will be escaped
    let unifiedQuotesString = str.replace(/'/g, '"'); // use regex instead replace('\'','"')
    // There were some open close single quotes that are special characters in the instruction document,
    // I'm chocking that up to pdf conversion printing special characters as it wasn't discussed in the docs.
    // If not though let's still take care of it.
    unifiedQuotesString = unifiedQuotesString.replace(/‘/g, '"'); // open
    unifiedQuotesString = unifiedQuotesString.replace(/’/g, '"'); // and close
    //this.$log.info(`Unified string: ${unifiedQuotesString}`);
    // use a regex to parse out phrases
    let dubQuoteResults = unifiedQuotesString.match(/("[^"]+"|[^",\s]+)/g);
    // remove bounding quotes
    let removedQuotes = dubQuoteResults.map(x =>
      x.replace(/^"([^"]+)"$/, '$1')
    );
    //this.$log.info(removedQuotes);
    return removedQuotes;
  }
}
