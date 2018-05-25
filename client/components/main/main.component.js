import angular from 'angular';

export default {
  template: require('./main.html'),

  bindings: {},

  controller: class mainController {
    // I've seen a recommendation to inject like this when using components in ES6 style
    // some styles have this at the bottom but I prefer it at the top for readability
    static get $inject() {
      return ['$log', 'indexRedactorService', 'keyPhraseService', 'sampleTextService']; // keep it alphabetical
    }
    constructor($log, indexRedactorService, keyPhraseService, sampleTextService) {
      this.$log = $log;
      this.indexRedactorService = indexRedactorService;
      this.keyPhraseService = keyPhraseService;
      this.sampleTextService = sampleTextService;
    }
    $onInit() {
      this.title = 'TOP SECRET FILE REDACTORATORINATOR';
      this.indexRedacted = '';
      this.caseSensitive = true;
      this.keys = `Lorem Hello world "Boston Red Sox", "Red Sox Fans", "Pepperoni, Pizza" ‘Cheese Pizza’, beer 'cheesey nachos',, banana,sundae,,`;
      // preload some lorem ipsum
      this.inputText = '';
    }

    loadSampleText() {
      //this.$log.info(this.keyPhraseService.parse(this.keys));
        this.sampleTextService.getSampleText().then(response => {
          this.inputText = response.data;
        });
    }

    goIndexRedact() {
      const phrases = this.keyPhraseService.parse(this.keys);
      this.indexRedactorService
        .redact({
          inputText: this.inputText,
          phrases: phrases,
          caseSensitive: this.caseSensitive
        })
        .then(data => {
          this.indexRedacted = data;
        });
    }
  }
};
