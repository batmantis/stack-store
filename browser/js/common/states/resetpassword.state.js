app.config(function($stateProvider) {
    $stateProvider.state('resetpassword', {
        url: '/resetpassword',
        templateUrl: 'js/common/states/resetpassword.html',
        controller: 'ResetCtrl'
    })
})
