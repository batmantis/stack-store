app.config(function ($stateProvider) {
	$stateProvider.state('notLoggedIn', {
		url: '/notloggedin',
		template: `	<div class="container">
						<h1>You cannot access this without being logged in!
						</h1>
					</div>`
	})
})