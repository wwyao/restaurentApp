angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicHistory, $ionicViewSwitcher, $ionicScrollDelegate, $cordovaBarcodeScanner) {
	// $cordovaStatusbar.overlaysWebView(true);
	// $cordovaStatusbar.style(1);
	// $cordovaStatusbar.styleColor('blue');
	$scope.isItemSort = false;
	$scope.items = [{
		id: 1
	}, {
		id: 2
	}, {
		id: 3
	}, {
		id: 4
	}, {
		id: 5
	}, {
		id: 6
	}, {
		id: 7
	}, {
		id: 8
	}, {
		id: 1
	}, {
		id: 2
	}, {
		id: 3
	}, {
		id: 4
	}, {
		id: 5
	}, {
		id: 6
	}, {
		id: 7
	}];
	$scope.forwardAnim = function() {
		$ionicViewSwitcher.nextDirection("forward");
	};
	$scope.top = function() {
		$ionicScrollDelegate.scrollTop(true);
	};

	$scope.showNav = function($event) {
		// console.log(window.getComputedStyle(document.querySelector('.scroll')).transform);
		var sTop = $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top;
		console.log(sTop > 171);
		if (sTop > 171) {
			$scope.isItemSort = true;
		} else {
			$scope.isItemSort = false;
		}
	};
	$scope.ist = true;
	$scope.loadMore = function() {
		// alert('bottom');
	};

	$scope.scan = function() {
		$cordovaBarcodeScanner
			.scan()
			.then(function(barcodeData) {
				// Success! Barcode data is here 扫描数据：barcodeData.text
			}, function(error) {
				// An error occurred
			});

	};

	// document.querySelector('.bigScroll').style.height = window.screen.height + 'px';
})

.controller('DetailCtrl', function($scope, $stateParams, $state, $ionicViewSwitcher) {
	$scope.id = $stateParams.id;
	console.log($state);
	$scope.goBack = function() {
		$state.go('tab.home');
		$ionicViewSwitcher.nextDirection("back");
	};
})

.controller('SearchCtrl', function($scope, $stateParams, $state, $ionicViewSwitcher, $ionicHistory) {
	$scope.goBack = function() {
		// $state.go('tab.home');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.searchData = [];
})



.controller('OrdersCtrl', function($scope, $cordovaBarcodeScanner) {

	$scope.scan = function() {
		$cordovaBarcodeScanner
			.scan()
			.then(function(barcodeData) {
				// Success! Barcode data is here 扫描数据：barcodeData.text
			}, function(error) {
				// An error occurred
			});

	};


})



.controller('MeCtrl', function($scope, $rootScope, $stateParams, $state, $ionicViewSwitcher) {
	$rootScope.isLogined = true;
	$scope.userImg = 'img/img1.jpg';
	$rootScope.loginedText = '登录/注册';
	$scope.meItems1 = [{
		href: '#/tab/userprotocol',
		show: false,
		otherMsg: "18826255298",
		tagText: '推荐餐厅'
	}, {
		href: '#/tab/userprotocol',
		show: false,
		otherMsg: "18826255298",
		tagText: '我的关注'
	}];
	$scope.meItems2 = [{
		href: 'tel:18826255298',
		show: true,
		otherMsg: "18826255298",
		tagText: '联系客服'
	}, {
		href: 'tel:18826255298',
		show: true,
		otherMsg: "18826255298",
		tagText: '加价投诉'
	}];
	$scope.meItems3 = [{
		href: '#/tab/about',
		show: false,
		otherMsg: "18826255298",
		tagText: '关于小明点餐'
	}, {
		href: '#/tab/userprotocol',
		show: false,
		otherMsg: "18826255298",
		tagText: '小明点餐用户协议'
	}];
	$rootScope.toLogin = function() {
		if (!$rootScope.isLogined) {
			$state.go('login');
			$ionicViewSwitcher.nextDirection("forward");
		}
	};
	$rootScope.settingClick = function() {
		console.log('setting');
		if ($rootScope.isLogined) {
			$state.go('setting');
			$ionicViewSwitcher.nextDirection("forward");
		}
	};

})



.controller('page1', function($scope) {

})



.controller('page2', function($scope) {

})



.controller('page3', function($scope) {

})




.controller('LoginCtrl', function($scope, $rootScope, $state, $ionicViewSwitcher, $cordovaToast) {
	// $rootScope.username = '';
	$scope.msg = {
		username: '',
		password: ''
	};
	$scope.v = '';
	$rootScope.goBack = function() {
		$state.go('tab.me');
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.login = function() {
		console.log($scope.msg);
		if ($scope.msg.username !== '' && $scope.msg.password !== '') {
			if ($scope.msg.username == "admin" && $scope.msg.password == "admin") {
				$rootScope.loginedText = $scope.msg.username;
				$rootScope.isLogined = true;
				$rootScope.toLogin = null;
				$scope.goBack();
			} else {
				$cordovaToast
					.show('账户、密码输入错误!', 'short', 'bottom')
					.then(function() {
						// alert('success');
					}, function() {
						// alert('fail');
					});
			}
		}
	};
})



.controller('SettingCtrl', function($scope, $rootScope, $state, $ionicViewSwitcher, $ionicHistory, $ionicLoading, $cordovaProgress) {
	$scope.slItem1 = [{
		href: '#/tab/userprotocol',
		show: false,
		otherMsg: "",
		tagText: '账号'
	}];
	// ['修改头像', '昵称', '性别', '生日'];
	// $scope.slItem2 = ['修改头像', '昵称', '性别', '生日','修改登录密码', '修改支付密码'];
	$scope.slItem2 = [{
		href: '#/tab/fedback',
		show: false,
		otherMsg: "708919996@qq.com",
		tagText: '意见反馈'
	}, {
		tag: 'clearcache',
		show: true,
		otherMsg: "1.0MB",
		tagText: '清除缓存'
	}, {
		tag: 'update',
		show: true,
		otherMsg: "v1.0.0",
		tagText: '检查更新'
	}];
	$rootScope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};

	$scope.listItem2Cilck = function(tag) {
		if (tag == "clearcache") {
			alert('clearcache');
		} else if (tag == "update") {
			// alert('update');
			$cordovaProgress.showDeterminateWithLabel(true, 50000, 'update');
			// 	$ionicLoading.show({
			// 		template: 'update...'
			// 	});
			// 	setTimeout(function() {
			// 		$ionicLoading.hide();
			// 	}, 2000);
		}
	}
})



.controller('UserProtocolCtrl', function($scope, $rootScope, $state, $ionicHistory, $ionicViewSwitcher) {

	$rootScope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.protocolText = ["一、总则",
		"1.1、 用户在使用点餐猫服务前， 应当仔细阅读《 点餐猫用户协议》（ 以下简称“ 本协议”） 的全部内容， 对于本协议中的加重字体、 斜体、 下划线、 颜色标记等条款需重点阅读、 理解。",
		"1.2、 用户应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序。 用户在进行注册程序过程中点击'注册'", "按钮即表示用户与点餐猫达成以下协议， 完全接受本协议项下的全部条款， 本协议即在用户与点餐猫之间产生法律效力， 对双方均具有法律约束力。",
		"1.3、 用户注册成功后， 点餐猫将给予每个用户一个用户帐号及相应的密码， 该用户帐号和密码由用户负责保管； 用户应当对以其用户帐号进行的所有活动和事件负法律责任。",
		"1.4、 点餐猫用户协议、各个频道单项服务条款、全部活动条款及公告可由点餐猫随时更新，且无需另行通知。点餐猫有权对上述条款进行修改，修改后的协议一旦公布即有效替代原有协议。用户可随时查询最新协议。用户在使用点餐猫提供的各项服务之前，应仔细阅读本协议及本协议不可分割的各项服务协议。用户在使用相关服务时,应关注并遵守其所适用的相关条款。用户如不同意本服务协议及/或随时对其的修改，可以主动取消点餐猫提供的服务；用户一旦使用点餐猫服务，即视为用户已了解并完全同意本协议及其他服务条款中的各项内容，包括点餐猫对本协议及其他服务条款随时所做的任何修改，并成为点餐猫用户。",
		"二、相关定义",
		"2.1、 点餐猫：指重庆浩品峰电子商务有限公司运营和所有的网络交易服务平台。重庆浩品峰电子商务有限公司通过点餐猫平台向用户和商户提供相关互联网端及移动端交易服务。",
		"2.2、 消费： 指商户通过点餐猫平台发布其商品信息，用户通过点餐猫网平台购买消费，并以在线支付的方式进行结账的消费行为。"
	];
})


.controller('AboutlCtrl', function($scope, $rootScope, $state, $ionicHistory, $ionicViewSwitcher) {
		$rootScope.goBack = function() {
			// $state.go('tab.me');
			$ionicHistory.goBack();
			$ionicViewSwitcher.nextDirection("back");
		};
		$scope.aboutText = ["小明点餐系统支持在线预定、电子菜单、到店扫码点菜/结账等功能，顾客通过手机端可以全程自助完成预定+点菜+结账，降低每个环节的等待时间，提升餐馆服务效率。",
			"同时为了满足不同用户的需求点餐猫还支持iPad点菜、微信预定/点菜功能。",
			"真正实现一个系统支持多端融合的“互联网+”餐馆。"
		];
	})
	.controller('FedbackCtrl', function($scope, $rootScope, $state, $ionicViewSwitcher, $ionicHistory) {
		$rootScope.goBack = function() {
			// $state.go('setting');
			// $ionicNavBarDelegate.back();
			$ionicHistory.goBack();
			$ionicViewSwitcher.nextDirection("back");
		};

	})



;
