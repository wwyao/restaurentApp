// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngTouch'])

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
		$cordovaStatusbar.styleHex('#1362A8');
	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');

	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');

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
		templateUrl: 'templates/tabs.html',
		controller: 'tabsCtrl'
	})


	// Each tab has its own nav history stack:
	//首页
	.state('tab.home', {
		url: '/home/:tag/:city',
		views: {
			'tab-home': {
				templateUrl: 'templates/tab-home.html',
				controller: 'HomeCtrl'
			}
		}
	})

	//搜索
	.state('search', {
		url: '/tab/search',
		templateUrl: 'templates/search.html',
		controller: 'SearchCtrl'
	})

	//扫码跳转的页面
	.state('qrcodewelcome', {
		cache: false,
		url: '/tab/qrcodewelcome/:name/:deskId',
		templateUrl: 'templates/qrcode_welcome.html',
		controller: 'QrcodewelcomeCtrl'
	})

	//餐厅详细页
	.state('detail', {
		url: '/tab/home/:id',
		templateUrl: 'templates/itemDetail.html',
		controller: 'DetailCtrl'
	})

	//菜单
	.state('menu', {
		url: '/tab/menu/:restaurentId',
		templateUrl: 'templates/menu.html',
		controller: 'MenuCtrl'
	})

	//已点菜单
	.state('shoppingCar', {
		url: '/tab/shoppingCar/:orderId',
		templateUrl: 'templates/shoppingCar.html',
		controller: 'ShoppingCarCtrl'
	})

	//订单
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

	//未付款
	.state('tab.order.page1', {
		url: '/page1',
		cache: false,
		views: {
			'page1': {
				templateUrl: 'templates/orderPage1.html',
				controller: 'page1'
			}
		}
	})

	//就餐中
	.state('tab.order.page2', {
		url: '/page2',
		cache: false,
		views: {
			'page2': {
				templateUrl: 'templates/orderPage2.html',
				controller: 'page2'
			}
		}
	})

	//写评论
	.state('writeComment', {
		url: '/writeComment/:orderId/:restaurentId/:title',
		templateUrl: 'templates/writeComment.html',
		controller: 'writeCommentCtrl'
	})

	//已消费
	.state('tab.order.page3', {
		url: '/page3',
		cache: false,
		views: {
			'page3': {
				templateUrl: 'templates/orderPage3.html',
				controller: 'page3'
			}
		}
	})

	//我的
	.state('tab.me', {
		url: '/me',
		views: {
			'tab-me': {
				templateUrl: 'templates/tab-me.html',
				controller: 'MeCtrl'
			}
		}
	})

	//登录
	.state('login', {
		url: '/tab/login',
		cache: false,
		templateUrl: 'templates/login.html',
		controller: 'LoginCtrl'
	})

	//设置
	.state('setting', {
		url: '/tab/setting',
		templateUrl: 'templates/setting.html',
		controller: 'SettingCtrl'
	})

	//意见反馈
	.state('fedback', {
		url: '/tab/fedback',
		templateUrl: 'templates/fedback.html',
		controller: 'FedbackCtrl'
	})

	//消息
	.state('msg', {
		url: '/tab/msg',
		templateUrl: 'templates/msg.html',
		controller: 'MsgCtrl'
	})

	//我的关注
	.state('myconcern', {
		url: '/tab/myconcern',
		cache: false,
		templateUrl: 'templates/myConcern.html',
		controller: 'MyconcernCtrl'
	})

	//推荐餐厅
	.state('recommendRestaurent', {
		url: '/tab/RecommendRestaurent',
		templateUrl: 'templates/recommendRestaurent.html',
		controller: 'RecommendRestaurentCtrl'
	})

	//账户
	.state('account', {
		url: '/tab/account',
		templateUrl: 'templates/account.html',
		controller: 'AccountCtrl'
	})

	//邀请
	.state('invite', {
		url: '/tab/invite',
		templateUrl: 'templates/invite.html',
		controller: 'InviteCtrl'
	})

	//预约
	.state('bookTable', {
		url: '/tab/bookTable/:restaurentId',
		templateUrl: 'templates/bookTable.html',
		controller: 'BookTableCtrl'
	})

	//商家营业资质
	.state('enterprise', {
		url: '/tab/enterprise',
		templateUrl: 'templates/enterprise.html',
		controller: 'EnterpriseCtrl'
	})

	//顾客评价
	.state('evaluation', {
		url: '/tab/evaluation/:restaurentId',
		templateUrl: 'templates/evaluation.html',
		controller: 'EvaluationCtrl'
	})

	//选择城市
	.state('selectCity', {
		url: '/tab/selectCity',
		templateUrl: 'templates/selectCity.html',
		controller: 'SelectCityCtrl'
	})

	//用户注册
	.state('register', {
		url: '/tab/register',
		templateUrl: 'templates/register.html',
		controller: 'RegisterCtrl'
	})

	//小明点餐用户协议
	.state('userprotocol', {
		url: '/tab/userprotocol',
		templateUrl: 'templates/userProtocol.html',
		controller: 'UserProtocolCtrl'
	})

	//支付
	.state('pay', {
		url: '/tab/pay/:orderId/:backTarget',
		templateUrl: 'templates/pay.html',
		controller: 'PayCtrl'
	})

	//关于
	.state('about', {
		url: '/tab/about',
		templateUrl: 'templates/about.html',
		controller: 'AboutlCtrl'
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/home/1/city');

});
