appConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function appConfig($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true); // yeah lets roll with html5
  $urlRouterProvider.otherwise('/'); // set the default route
}
