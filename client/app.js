// THIS IS THE ENTRY POINT FOR WEBPACK

// vendor stuff
import angular from 'angular';
import uirouter from '@uirouter/angularjs';
//import bootstrap from 'bootstrap'; // don't need this right now, needs popper and jquery
import './app.sass';

// config stuff
import appConfig from './app.config';
import routing from './routes';

// components
import main from './components/main/main.component';

//services
import indexRedactorService from './services/redactorServices/indexRedactorService';
import keyPhraseService from './services/keyPhrasesService/keyPhraseService';
import sampleTextService from './services/dataServices/sampleTextService';

// styles
import './app.css';

const MODULE_NAME = 'app';

angular
  .module(MODULE_NAME, [uirouter])
  .config(appConfig)
  .config(routing) // just need the one route config
  .component('main', main)
  .service('indexRedactorService', indexRedactorService)
  .service('keyPhraseService', keyPhraseService)
  .service('sampleTextService', sampleTextService);

export default MODULE_NAME;
