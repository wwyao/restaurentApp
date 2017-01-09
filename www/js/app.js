// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaStatusbar) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}

		$cordovaStatusbar.overlaysWebView(true);
		$cordovaStatusbar.style(1);
		$cordovaStatusbar.styleHex('#801A93FF');



	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');

	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('left');

	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
		.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'

	})


	// Each tab has its own nav history stack:

	.state('tab.home', {
		url: '/home',
		views: {
			'tab-home': {
				templateUrl: 'templates/tab-home.html',
				controller: 'HomeCtrl'
			}
		}
	})


	.state('search', {
		url: '/tab/search',
		templateUrl: 'templates/search.html',
		controller: 'SearchCtrl'
	})

	.state('detail', {
		url: '/tab/home/:id',
		templateUrl: 'templates/itemDetail.html',
		controller: 'DetailCtrl'
	})



	// .state('detail', {
	//   url: '/detail',
	//   abstract: false,
	//   templateUrl: 'templates/itemDetail.html'
	// })

	// .state('tab.orders', {
	//     url: '/orders',
	//     views: {
	//       'tab-orders': {
	//         templateUrl: 'templates/tab-orders.html',
	//         controller: 'OrdersCtrl'
	//       }
	//     }
	//   })

	.state('tab.order', {
		url: '/order',
		// abstract: true,
		views: {
			'tab-order': {
				templateUrl: 'templates/tab-orders.html',
				controller: 'OrdersCtrl'
			}
		}
	})

	.state('tab.order.page1', {
		url: '/page1',
		views: {
			'page1': {
				templateUrl: 'templates/orderPage1.html',
				controller: 'page1'
			}
		}
	})

	.state('tab.order.page2', {
		url: '/page2',
		views: {
			'page2': {
				templateUrl: 'templates/orderPage2.html',
				controller: 'page2'
			}
		}
	})

	.state('tab.order.page3', {
		url: '/page3',
		views: {
			'page3': {
				templateUrl: 'templates/orderPage3.html',
				controller: 'page3'
			}
		}
	})


	.state('tab.me', {
		url: '/me',
		views: {
			'tab-me': {
				templateUrl: 'templates/tab-me.html',
				controller: 'MeCtrl'
			}
		}
	})

	.state('login', {
		url: '/tab/login',
		templateUrl: 'templates/login.html',
		controller: 'LoginCtrl'
	})

	.state('setting', {
		url: '/tab/setting',
		templateUrl: 'templates/setting.html',
		controller: 'SettingCtrl'
	})

	.state('fedback', {
		url: '/tab/fedback',
		templateUrl: 'templates/fedback.html',
		controller: 'FedbackCtrl'
	})

	.state('msg', {
		url: '/tab/msg',
		templateUrl: 'templates/msg.html',
		controller: 'MsgCtrl'
	})

	.state('myconcern', {
		url: '/tab/myconcern',
		templateUrl: 'templates/myConcern.html',
		controller: 'MyconcernCtrl'
	})

	.state('recommendRestaurent', {
		url: '/tab/RecommendRestaurent',
		templateUrl: 'templates/recommendRestaurent.html',
		controller: 'RecommendRestaurentCtrl'
	})




	.state('userprotocol', {
			url: '/tab/userprotocol',
			templateUrl: 'templates/userProtocol.html',
			controller: 'UserProtocolCtrl'
		})
		.state('about', {
			url: '/tab/about',
			templateUrl: 'templates/about.html',
			controller: 'AboutlCtrl'
		});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/home');

});
