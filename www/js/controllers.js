angular.module('starter.controllers', [])

//tabs页面
.controller('tabsCtrl', function($scope, datas, $state) {
	$scope.goLogin = function() {
		var tempUser = datas.getUserDatas();
		console.log(!tempUser, tempUser);
		if (!tempUser) {
			$state.go('login');
		} else {
			$state.go('tab.me');
		}
	};
})

//主页页面
.controller('HomeCtrl', function($scope, $ionicHistory, $ionicViewSwitcher, $ionicScrollDelegate, $cordovaBarcodeScanner, $timeout, $state) {
	$scope.currentCity = "广州";
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
	}];
	$scope.itemIndex = 8;
	$scope.forwardAnim = function() {
		$ionicViewSwitcher.nextDirection("forward");
	};
	$scope.top = function() {
		$ionicScrollDelegate.scrollTop(true);
	};
	$scope.showNav = function($event) {
		var sTop = $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top;
		console.log(sTop > 171);
		if (sTop > 171) {
			$scope.isItemSort = true;
		} else {
			$scope.isItemSort = false;
		}
	};
	$scope.ist = true;
	//下拉加载更多的数据
	$scope.loadMoreData = function() {
		var tempArr = [];
		for (var i = 0; i < 4; i++) {
			$scope.itemIndex++;
			var obj = {
				id: $scope.itemIndex
			}
			tempArr.push(obj);
		}
		$timeout(function() {
			$scope.items = $scope.items.concat(tempArr);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}, 1400);

	};
	//扫二维码
	$scope.scan = function() {
		$cordovaBarcodeScanner
			.scan()
			.then(function(barcodeData) {
				var url = barcodeData.text;
				$state.go(url);
			}, function(error) {
				// An error occurred
			});

	};

	// document.querySelector('.bigScroll').style.height = window.screen.height + 'px';
})

//餐厅详细页页面
.controller('DetailCtrl', function($scope, $stateParams, $state, $ionicViewSwitcher) {
	$scope.id = $stateParams.id;
	$scope.restaurentData = {
		id: $stateParams.id,
		title: "小明餐厅",
		img: "",
		address: "天河区 正阳二路199号",
		time: "10:00 - 22:00",
		phone: "020-1234567",
		describe: "餐厅描述餐厅描述餐厅描述餐厅描述餐厅描述餐厅描述餐厅描述餐厅描述餐厅描述餐厅描述餐厅描述",
		eScore: "4.0",
		tScore: "4.0",
		sScore: "4.0"
	}
	$scope.goBack = function() {
		$state.go('tab.home');
		$ionicViewSwitcher.nextDirection("back");
	};
})

//搜索页面
.controller('SearchCtrl', function($scope, $stateParams, $state, $ionicViewSwitcher, $ionicHistory) {
	$scope.goBack = function() {
		// $state.go('tab.home');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.searchData = [];
})

//订单页面
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

//我的页面
.controller('MeCtrl', function($scope, datas, $stateParams, $state, $ionicViewSwitcher) {
	// $rootScope.isLogined = false;
	// $scope.userData = {
	// 	name: '登录/注册',
	// 	avatar: 'img/noimg.jpg',
	// 	date: '2011-6-6',
	// 	phone: "12345678912"
	// }
	$scope.userData = datas.getUserDatas();
	$scope.meItems1 = [{
		href: '#/tab/RecommendRestaurent',
		show: false,
		otherMsg: "18826255298",
		tagText: '推荐餐厅'
	}, {
		href: '#/tab/myconcern',
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
	$scope.settingClick = function() {
		$state.go('setting');
		$ionicViewSwitcher.nextDirection("forward");
	};
})

//未消费页面
.controller('page1', function($scope) {

})

//就餐中页面
.controller('page2', function($scope) {

})

//已消费页面
.controller('page3', function($scope) {

})

//登录页面
.controller('LoginCtrl', function($scope, datas, $state, $ionicViewSwitcher, $cordovaToast) {
	$scope.msg = {
		username: '',
		password: ''
	};
	$scope.v = '';
	$scope.goBack = function() {
		$state.go('tab.home');
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.login = function() {
		console.log($scope.msg);
		if ($scope.msg.username !== '' && $scope.msg.password !== '') {
			if ($scope.msg.username == "admin" && $scope.msg.password == "admin") {
				var tempObj = {
					name: $scope.msg.username,
					date: '2011-6-6',
					avatar: 'img/img2.jpg',
					phone: "12345678912"
				}
				datas.setUserDatas(tempObj);
				$state.go('tab.me');
				$ionicViewSwitcher.nextDirection("back");
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

//设置页面
.controller('SettingCtrl', function($scope, datas, $state, $ionicViewSwitcher, $ionicHistory, $cordovaProgress, $cordovaToast) {
	//缓存大小
	$scope.cache = "1.0MB";
	//版本号
	$scope.version = "v1.0.0";
	$scope.slItem1 = [{
		href: '#/tab/account',
		show: false,
		tagText: '账号'
	}];
	$scope.slItem2 = [{
		href: '#/tab/fedback',
		show: false,
		otherMsg: "708919996@qq.com",
		tagText: '意见反馈'
	}, {
		tag: 'clearcache',
		tagText: '清除缓存'
	}, {
		tag: 'update',
		show: true,
		tagText: '检查更新'
	}];
	$scope.goBack = function() {
		$state.go('tab.me');
		// $ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.listItem2Cilck = function(tag) {
		//清除缓存
		if (tag == "clearcache") {
			$cordovaProgress.showSimpleWithLabel(true, "正在清除...") // .hide()
			setTimeout(function() {
				$cordovaProgress.hide();
				$cordovaToast
					.show('已清除' + $scope.cache, 'short', 'bottom')
					.then(function() {
						// alert('success');
					}, function() {
						// alert('fail');
					});
			}, 1000);
		} else if (tag == "update") {
			//检查版本
			$cordovaProgress.showSimpleWithLabel(true, "正在查找新版本") // .hide()
			setTimeout(function() {
				$cordovaProgress.hide();
				$cordovaToast
					.show('没有更新的版本了', 'short', 'bottom')
					.then(function() {
						// alert('success');
					}, function() {
						// alert('fail');
					});
			}, 1300);

		}
	};
	//退出登录
	$scope.loginOut = function() {
		datas.setUserDatas(null);
		$state.go('tab.home');
		$ionicViewSwitcher.nextDirection("back");
	}
})

//小明点餐协议页面
.controller('UserProtocolCtrl', function($scope, datas, $state, $ionicHistory, $ionicViewSwitcher) {
	$scope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.protocolText = datas.getProtocol();
})

//关于小明点餐页面
.controller('AboutlCtrl', function($scope, datas, $state, $ionicHistory, $ionicViewSwitcher) {
	$scope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.aboutText = datas.getAboutText();
})

//意见反馈页面
.controller('FedbackCtrl', function($scope, $rootScope, $state, $ionicViewSwitcher, $ionicHistory) {
	$scope.goBack = function() {
		// $state.go('setting');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
})

//消息页面
.controller('MsgCtrl', function($scope, $rootScope, $state, $ionicViewSwitcher, $ionicHistory) {
	$scope.msgDatas = [];
	$scope.goBack = function() {
		$state.go('tab.me');
		// $ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
})

//我的关注页面
.controller('MyconcernCtrl', function($scope, $rootScope, $ionicViewSwitcher, $state, $ionicHistory) {
	$scope.goBack = function() {
		$state.go('tab.me');
		// $ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
})

//邀请页面
.controller('InviteCtrl', function($scope, $rootScope, $ionicViewSwitcher, $state, $ionicHistory) {
	$scope.goBack = function() {
		$state.go('tab.me');
		// $ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
})

//预约订座页面
.controller('BookTableCtrl', function($scope, $rootScope, $state, $ionicViewSwitcher, $ionicHistory, $cordovaDatePicker) {
	$scope.bookDatas1 = [];
	$scope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.order = {
		time: "",
		numOfPeople: "",
		isRoom: "",
		contacter: "",
		phone: "",
		remark: ""
	}
	$scope.bookDatas1 = [{
		title: "就餐时间",
		hadInput: true,
		placeText: "请选择就餐时间"
	}, {
		title: "就餐人数",
	}, {
		title: "是否需要包房"
	}];
	$scope.bookDatas2 = [{
		title: "联系人",
		hadInput: true,
		value: "admin"
	}, {
		title: "联系电话",
		hadInput: true,
	}, {
		title: "备注",
		hadInput: true
	}];
	$scope.selectTime = function() {
		var options = {
			date: new Date(),
			mode: 'date', // or 'time'
			minDate: "",
			allowOldDates: false,
			allowFutureDates: true,
			doneButtonLabel: 'DONE',
			doneButtonColor: '#F2F3F4',
			cancelButtonLabel: 'CANCEL',
			cancelButtonColor: '#000000'
		};
		//打开日期选择器
		$scope.openPicker = function() {
			$cordovaDatePicker.show(options).then(function(date) {
				$scope.order.time = date;
			});
		};
	};
})

//账户页面
.controller('AccountCtrl', function($scope, datas, $state, $cordovaImagePicker, $ionicViewSwitcher, $ionicHistory, $cordovaDatePicker) {
	$scope.editText = '编辑';
	$scope.isEditable = true;
	//获取已登录的用户信息
	$scope.userData = datas.getUserDatas();
	$scope.accountData = [{
		tag: '修改头像',
		isAvatar: true
	}, {
		tag: '昵称',
		isShow: true,
	}, {
		tag: '性别',
		isSex: true
	}, {
		tag: '生日',
		clickEvent: 'openPicker()',
		isDate: true,
	}, {
		tag: '修改登录密码',

	}, {
		tag: '修改支付密码',
	}];
	//返回按钮
	$scope.goBack = function() {
		$state.go('setting');
		// $ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	var options = {
		date: new Date(),
		mode: 'date', // or 'time'
		minDate: "1970-1-1",
		allowOldDates: true,
		allowFutureDates: true,
		doneButtonLabel: 'DONE',
		doneButtonColor: '#F2F3F4',
		cancelButtonLabel: 'CANCEL',
		cancelButtonColor: '#000000'
	};
	//打开日期选择器
	$scope.openPicker = function() {
		if (!$scope.isEditable) {
			$cordovaDatePicker.show(options).then(function(date) {
				var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				$scope.userData.date = dateStr;
			});
		}
	};
	var imgoptions = {
		maximumImagesCount: 10,
		width: 800,
		height: 800,
		quality: 80
	};
	//打开相册
	$scope.imgPicker = function() {
		if (!$scope.isEditable) {
			$cordovaImagePicker.getPictures(imgoptions)
				.then(function(results) {
					$scope.userData.avatar = results[0];
					//*******************
					datas.setUserDatas($scope.userData);
				}, function(error) {
					// error getting photos
				});
		}
	};
	//编辑按钮
	$scope.editClick = function() {
		if ($scope.isEditable) {
			$scope.editText = '完成';
			$scope.isEditable = false;
		} else {
			datas.setUserDatas($scope.userData);
			$scope.editText = '编辑';
			$scope.isEditable = true;
		}
	};
})

//推荐餐厅页面
.controller('RecommendRestaurentCtrl', function($scope, $rootScope, $state, $ionicViewSwitcher, $ionicHistory) {
	// $scope.msgDatas = [];
	$scope.goBack = function() {
		$state.go('tab.me');
		// $ionicNavBarDelegate.back();
		// $ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.itemDatas = [{
		tag: '餐厅名称',
		text: '请填写餐厅名称'
	}, {
		tag: '餐厅类型',
		text: '请填写餐厅类型'
	}, {
		tag: '餐厅地址',
		text: '请填写餐厅地址'
	}, {
		tag: '餐厅电话',
		text: '请填写餐厅电话'
	}];

});
