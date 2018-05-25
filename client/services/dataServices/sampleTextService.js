import angular from 'angular';

// The accepted convention previous to using ES6 syntax was that all services were factories
// This is no longer practical with ES6 as classes map to angularjs services so use them! (sorry factories)

// NOTE to keep these redactor services idempotent
export default class sampleTextService {
  static get $inject() {
    // replaces the indexRedactorService.$inject = []; syntax
    // angulars inject
    return ['$http', '$q'];
  }
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  // return a promise!
  getSampleText() {
    return this.$http.get('/api/1/lorem');
  }
}
