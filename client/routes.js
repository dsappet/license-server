// angular inject
routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  });
}
