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
	$rootScope.isLogined = false;
	$scope.userImg = 'img/img1.jpg';
	$rootScope.loginedText = '登录/注册';
	$scope.meItems = ['推荐餐厅', '我的关注', '意见反馈', '清除缓存', '检查更新', '联系客服', '加价投诉', '关于小明点餐', '小明点餐用户协议'];
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
		$scope.goBack = function() {
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
	.controller('SettingCtrl', function($scope, $state, $ionicViewSwitcher) {
		$scope.slItem1 = ['修改头像', '昵称', '性别', '生日'];
		$scope.slItem2 = ['修改登录密码', '修改支付密码'];

		$scope.goBack = function() {
			$state.go('tab.me');
			$ionicViewSwitcher.nextDirection("back");
		};
	});
