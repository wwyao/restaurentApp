angular.module('starter.controllers', [])

//tabs页面
.controller('tabsCtrl', function($scope, $rootScope, datas, $state) {
	$rootScope.isLogined = false;
	$scope.goLogin = function() {
		var tempUser = datas.getUserDatas();
		console.log(!tempUser, tempUser);
		if (!tempUser) {
			$state.go('login');
			$rootScope.isLogined = false;
		} else {
			$state.go('tab.me');
			$rootScope.isLogined = true;
		}
	};
})

//主页页面
.controller('HomeCtrl', function($scope, $ionicHistory, $ionicViewSwitcher, $ionicScrollDelegate, $cordovaBarcodeScanner, $timeout, $state, $location) {
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
		if (sTop > 228) {
			$scope.isItemSort = true;
			$scope.$apply();
		} else {
			$scope.isItemSort = false;
			$scope.$apply();
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
				$location.path(url);
			}, function(error) {
				// An error occurred
			});

	};

	// document.querySelector('.bigScroll').style.height = window.screen.height + 'px';
})

//餐厅详细页页面
.controller('DetailCtrl', function($scope, $rootScope, $stateParams, $state, $ionicViewSwitcher) {
	$scope.id = $stateParams.id;
	$rootScope.restaurentData = {
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

//扫码进入的页面
.controller('QrcodewelcomeCtrl', function($scope, $stateParams, $state, $ionicViewSwitcher, $timeout) {
	console.log($stateParams);
	$scope.text1 = $stateParams.name;
	$scope.text2 = $stateParams.deskId;
	$timeout(function() {
		$state.go('menu');
		$ionicViewSwitcher.nextDirection("forward");
	}, 3000);
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
.controller('page1', function($scope, $rootScope) {

})

//就餐中页面
.controller('page2', function($scope, $rootScope) {

})

//已消费页面
.controller('page3', function($scope, $rootScope) {

})

//登录页面
.controller('LoginCtrl', function($scope, $rootScope, datas, $state, $ionicViewSwitcher, $cordovaToast) {
	$scope.msg = {
		username: '',
		password: ''
	};
	$scope.v = '';
	$scope.goBack = function() {
		$state.go('tab.home');
		$ionicViewSwitcher.nextDirection("back");
	};
	//登录事件
	$scope.login = function() {
		console.log($scope.msg);
		if ($scope.msg.username !== '' && $scope.msg.password !== '') {
			if ($scope.msg.username == "admin" && $scope.msg.password == "admin") {
				$rootScope.isLogined = true;
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
	$scope.psw = false;
	$scope.btnType = 'password';
	//密码显示
	$scope.eyeClick = function() {
		if ($scope.psw) {
			$scope.btnType = 'password';
			$scope.psw = false;
		} else {
			$scope.btnType = 'text';
			$scope.psw = true;
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
.controller('BookTableCtrl', function($scope, $rootScope, $state, $ionicViewSwitcher, $ionicHistory, $cordovaDatePicker, datas) {
	$scope.bookDatas1 = [];
	$scope.dateText = "请选择就餐时间";
	$scope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	var userData = datas.getUserDatas();
	$rootScope.order = {
		time: "",
		numOfPeople: 1,
		isRoom: false,
		contacter: userData.name,
		phone: userData.phone,
		remark: ""
	}
	$scope.bookDatas1 = [{
		title: "就餐日期",
		isDate: true,
		placeText: "请选择就餐时间"
	}, {
		title: "就餐人数",
		isPeopleNum: true
	}, {
		title: "是否需要包房",
		isCheckbox: true
	}];
	$scope.bookDatas2 = [{
		title: "联系人",
		hadInput: true,
		value: $rootScope.order.contacter
	}, {
		title: "联系电话",
		hadInput: true,
		value: $rootScope.order.phone
	}, {
		title: "备注",
		hadInput: true,
		value: ""
	}];
	//选择就餐时间
	$scope.selectTime = function() {
		var options = {
			date: new Date(),
			mode: 'date', // or 'time'
			minDate: new Date() - 10000,
			allowOldDates: false,
			allowFutureDates: true,
			doneButtonLabel: 'DONE',
			doneButtonColor: '#F2F3F4',
			cancelButtonLabel: 'CANCEL',
			cancelButtonColor: '#000000'
		};
		var timeOptions = {
			date: new Date(),
			mode: 'time',
			minDate: new Date() - 10000,
			allowOldDates: false,
			allowFutureDates: true,
			doneButtonLabel: 'DONE',
			doneButtonColor: '#F2F3F4',
			cancelButtonLabel: 'CANCEL',
			cancelButtonColor: '#000000'
		};
		var tempStr = "";
		$cordovaDatePicker.show(options).then(function(date) {
			tempStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "  ";
			// $scope.order.time = date;
			// $scope.bookDatas1.placeText = date;
			// alert(date);
			$cordovaDatePicker.show(timeOptions).then(function(date) {
				// alert(date);
				tempStr = tempStr + date.getHours() + ":" + date.getMinutes();
				// alert(tempStr);
				$rootScope.order.time = tempStr;
				$scope.dateText = tempStr;
				// $scope.$apply();
			});
		});
	};
	//减少就餐人数
	$scope.decPeople = function() {
		if ($rootScope.order.numOfPeople > 1) {
			$rootScope.order.numOfPeople--;
		}
	};
	//添加就餐人数
	$scope.addPeople = function() {
		$rootScope.order.numOfPeople++;
	};
	//继续点菜
	$scope.orderClick = function() {
		$rootScope.order.contacter = $scope.bookDatas2[0].value;
		$rootScope.order.phone = $scope.bookDatas2[1].value;
		$rootScope.order.remark = $scope.bookDatas2[2].value;
		// for (var key in $scope.order) {
		// 	alert($scope.order[key]);
		// }
		$state.go('menu');
		// $ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("forward");
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

})

//菜单
.controller('MenuCtrl', function($scope, $rootScope, $ionicViewSwitcher, $state, $ionicHistory) {
	$scope.restaurentName = '小明餐厅';
	$scope.deskNum = 10;
	$scope.totleMoney = 0;
	$scope.numOfMenu = 0;
	$scope.activeClass = "item-selected";
	$rootScope.orderMenus = [];
	$scope.showOrderBox = false;
	//是否显示当前的位置
	$scope.showLocation = false;
	//已点的菜单
	$scope.myOrders = [];
	$scope.listDatas = [{
		name: '全部',
		isFocus: true
	}, {
		name: '特色菜',
		isFocus: false
	}, {
		name: '蒸菜',
		isFocus: false
	}, {
		name: '凉菜',
		isFocus: false
	}, {
		name: '热荤菜',
		isFocus: false
	}, {
		name: '热素菜',
		isFocus: false
	}, {
		name: '酒水',
		isFocus: false
	}, {
		name: '饮料',
		isFocus: false
	}, {
		name: '标准餐',
		isFocus: false
	}];
	$scope.detailDatas = [];
	$scope.allMenu = [{
		menuId: 1,
		name: '江团',
		priceText: '￥20/份',
		price: 20,
		num: 0,
		img: 'img/img2.jpg',
		tag: '特色菜'
	}, {
		menuId: 2,
		name: '江团2',
		priceText: '￥21/份',
		price: 21,
		num: 0,
		img: 'img/img2.jpg',
		tag: '蒸菜'
	}, {
		menuId: 3,
		name: '江团3',
		priceText: '￥23/份',
		price: 23,
		num: 0,
		img: 'img/img2.jpg',
		tag: '特色菜'
	}, {
		menuId: 4,
		name: '江团4',
		priceText: '￥24/份',
		price: 24,
		num: 0,
		img: 'img/img2.jpg',
		tag: '特色菜'
	}, {
		menuId: 5,
		name: '江团5',
		priceText: '￥25/份',
		price: 25,
		num: 0,
		img: 'img/img2.jpg',
		tag: '蒸菜'
	}, {
		menuId: 6,
		name: '江团6',
		priceText: '￥26/份',
		price: 26,
		num: 0,
		img: 'img/img2.jpg',
		tag: '蒸菜'
	}, {
		menuId: 7,
		name: '江团7',
		priceText: '￥27/份',
		price: 27,
		num: 0,
		img: 'img/img2.jpg',
		tag: '蒸菜'
	}, {
		menuId: 8,
		name: '江团8',
		priceText: '￥28/份',
		price: 28,
		num: 0,
		img: 'img/img2.jpg',
		tag: '蒸菜'
	}, {
		menuId: 9,
		name: '江团9',
		priceText: '￥29/份',
		price: 29,
		num: 0,
		img: 'img/img2.jpg',
		tag: '蒸菜'
	}];
	$scope.detailDatas = $scope.allMenu;
	$scope.listClick = function(index, tag) {
		for (var i = 0; i < $scope.listDatas.length; i++) {
			$scope.listDatas[i].isFocus = false;
		}
		$scope.listDatas[index].isFocus = true;
		if (tag == '全部') {
			$scope.detailDatas = $scope.allMenu;
		} else {
			var tempArr = [];
			for (var i = 0; i < $scope.allMenu.length; i++) {
				if ($scope.allMenu[i].tag == tag) {
					tempArr.push($scope.allMenu[i]);
				}
			}
			$scope.detailDatas = tempArr;
		}

	};
	//减菜
	$scope.dec = function(id) {
		for (var i = 0; i < $scope.detailDatas.length; i++) {
			if ($scope.detailDatas[i].menuId == id && $scope.detailDatas[i].num > 0) {
				$scope.detailDatas[i].num--;
				$scope.numOfMenu--;
				$scope.totleMoney -= $scope.detailDatas[i].price;
				break;
			}
		}
	};
	//加菜
	$scope.add = function(id) {
		for (var i = 0; i < $scope.detailDatas.length; i++) {
			if ($scope.detailDatas[i].menuId == id) {
				$scope.detailDatas[i].num++;
				$scope.totleMoney += $scope.detailDatas[i].price;
				break;
			}
		}
		$scope.numOfMenu++;
	};
	$scope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.locationClick = function() {
		$scope.showLocation = !$scope.showLocation;
	};
})


//商家营业资质
.controller('EnterpriseCtrl', function($scope, $ionicHistory, $ionicViewSwitcher) {
	$scope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
	$scope.imgDatas = ['img/img1.jpg', 'img/img2.jpg'];
})

//顾客评论
.controller('EvaluationCtrl', function($scope, $ionicHistory, $ionicViewSwitcher) {
	$scope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
})

//城市选择
.controller('SelectCityCtrl', function($scope, $ionicHistory, $ionicViewSwitcher) {
	$scope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
})

//用户注册
.controller('RegisterCtrl', function($scope, $ionicHistory, $ionicViewSwitcher) {
	$scope.btnType1 = 'password';
	$scope.btnType2 = 'password';
	$scope.psw1 = false;
	$scope.psw2 = false;
	$scope.registerMsg = {
		name: '',
		psw1: '',
		psw2: ''
	};

	$scope.eyeClick = function(index) {
		if (index == '1') {
			if ($scope.psw1) {
				$scope.btnType1 = 'password';
				$scope.psw1 = false;
			} else {
				$scope.btnType1 = 'text';
				$scope.psw1 = true;
			}
		} else if (index == '2') {
			if ($scope.psw2) {
				$scope.btnType2 = 'password';
				$scope.psw2 = false;
			} else {
				$scope.btnType2 = 'text';
				$scope.psw2 = true;
			}
		}
	};

	$scope.goBack = function() {
		// $state.go('tab.me');
		$ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("back");
	};
});
