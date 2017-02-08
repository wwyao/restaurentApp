angular.module('starter.controllers', [])

//tabs页面
.controller('tabsCtrl', function($scope, $rootScope, datas, $state, $ionicHistory, $ionicViewSwitcher) {
	$rootScope.isLogined = true;
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
	//返回按钮
	$rootScope.goBack = function(target) {
		if (target) {
			$state.go(target);
		} else {
			$ionicHistory.goBack();
		}
		$ionicViewSwitcher.nextDirection("back");
	};
})

//主页页面
.controller('HomeCtrl', function($scope, datas, $rootScope, $stateParams, $http, $cordovaGeolocation, $ionicHistory, $ionicViewSwitcher, $ionicScrollDelegate, $cordovaBarcodeScanner, $timeout, $state, $location) {
	$rootScope.currentCity = "";
	$scope.start = 0;
	$scope.count = 6;
	$scope.isDatas = true;
	$scope.values = {
		classifyValue: '所有分类',
		rankValue: '综合评分优先',
		placeValue: '全部'
	};
	// $scope.classifyValue = '所有分类';
	// $scope.rankValue = '综合评分优先';
	// $scope.placeValue = '全部';
	$scope.classifyName = ['火锅', '川菜', '海鲜', '烧烤', '西餐', '粤菜', '快餐', '干锅'];
	$scope.rankName = ['综合评分优先', '服务优先', '口味优先', '环境优先'];
	$scope.placeName = ['全部', '海珠区', '天河区'];
	//定位
	//通过经纬度查询城市的地址:https://api.thinkpage.cn/v3/location/search.json?key=mqzzrlzwvkgw0762&q=39.93:116.40
	var posOptions = {
		timeout: 100000,
		enableHighAccuracy: true
	};
	if ($stateParams.tag == 1) {
		document.addEventListener("deviceready", function() {
			$cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(function(position) {
					var lat = position.coords.latitude
					var long = position.coords.longitude
						// alert(lat + ":" + long);
					var url = 'https://api.thinkpage.cn/v3/location/search.json?key=mqzzrlzwvkgw0762&q=' + lat + ':' + long;
					$http.get(url).success(function(data) {
						// alert(data.results[0].name);
						$rootScope.currentCity = data.results[0].name;
						datas.setLocationCity(data.results[0].name);
					}).error(function(data) {
						// alert(data);
					});
				}, function(err) {
					// alert(err);
				});
		}, false);
	} else if ($stateParams.tag == 2) {
		$rootScope.currentCity = $stateParams.city;
	}


	$scope.isItemSort = false;
	$scope.items = [];
	//获取餐厅数据
	function getRestaurentData(start, count) {
		$scope.start += 6;
		var url = 'http://localhost/restaurent/allRestaurent.php?start=' + start + '&count=' + count;
		$http.get(url).success(function(data) {
			console.log(data.length != 0);
			if (data.length != 0) {
				$scope.items = $scope.items.concat(data);
			} else {
				$scope.isDatas = false;
				console.log('没有更多数据了');
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	}
	getRestaurentData($scope.start, $scope.count);
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
		$timeout(function() {
			getRestaurentData($scope.start, $scope.count);
			// $scope.$broadcast('scroll.infiniteScrollComplete');
		}, 1400);
		// getRestaurentData($scope.start, $scope.count);
		// $scope.$broadcast('scroll.infiniteScrollComplete');

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
	//选择分类
	$scope.kindClick = function(value) {
		$ionicScrollDelegate.scrollTo(0, 229, true);
		$scope.values.classifyValue = value;
	};
	//选择地区
	$scope.placeChange = function() {
		alert($scope.values.placeValue);
	};
	//分类改变
	$scope.classifyChange = function() {
		alert($scope.values.classifyValue);
	};
	//排序改变
	$scope.rankChange = function() {
		alert($scope.values.rankValue);
	};
	// document.querySelector('.bigScroll').style.height = window.screen.height + 'px';
})

//餐厅详细页页面
.controller('DetailCtrl', function($scope, $rootScope, $stateParams, $state, $ionicViewSwitcher, $http, datas) {
	// $scope.id = $stateParams.id;
	$scope.restaurentData = {};
	$scope.userData = datas.getUserDatas();
	$scope.restaurentId = $stateParams.id;
	var url = 'http://localhost/restaurent/detail.php?restaurentId=' + $scope.restaurentId;
	$http.get(url).success(function(data) {
		$scope.restaurentData = data;
	});
	$scope.isMore = false;
	$scope.isShare = false;
	$scope.shareClick = function() {
		$scope.isShare = !$scope.isShare;
		$scope.isMore = !$scope.isMore;
	};
	$scope.hideShare = function() {
		$scope.isShare = !$scope.isShare;
	};
	$scope.wxClick = function(e) {
		e.stopPropagation();
	};
	$scope.concernClick = function() {
		$scope.isMore = !$scope.isMore;
		var concernUrl = 'http://localhost/restaurent/concern.php?restaurentId=' + $scope.restaurentId + '&userId=' + $scope.userData.userId;
		$http.get(concernUrl).success(function(data) {
			if (data.result) {
				alert('关注成功');
			}
		});
	};
})

//搜索页面
.controller('SearchCtrl', function($scope, $stateParams, $state, $ionicViewSwitcher, $ionicHistory, $timeout, $http) {
	$scope.searchData = [];
	$scope.searchText = "";
	$scope.search = function() {
		console.log($scope.searchText, $scope.searchText != "");
		$timeout(function() {
			var url = "http://localhost/restaurent/search.php?text=" + $scope.searchText;
			url = encodeURI(url);
			if ($scope.searchText) {
				$http.get(url).success(function(data) {
					console.log(data);
					$scope.searchData = data;
				});
			}
		}, 1000);
	};
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
.controller('page1', function($scope, $rootScope, $http, $cordovaDialogs) {
	$scope.datas = [];
	var start = 0;
	var statu = '未付款';
	var url = 'http://localhost/restaurent/getOrders.php?start=' + start + '&count=6&statu=' + statu;
	$http.get(url).success(function(data) {
		console.log(data);
		$scope.datas = data;
	});
	var i = 0;
	$scope.cancel = function(e, orderId) {
		// e.stopPropagation();
		// console.log(i++,'cancel');

		var isCancel = $cordovaDialogs.confirm('确定取消订单？', '');
		// alert(orderId+':'+isCancel);
		if (isCancel == 1) {
			$http.get('http://localhost/restaurent/cancelOrder.php?orderId=' + orderId).success(function(data) {
				console.log(data);
				if (data.result) {
					$http.get(url).success(function(data) {
						// console.log(data);
						$scope.datas = data;
					});
				}
			});
		}
	};
})

//就餐中页面
.controller('page2', function($scope, $rootScope, $http) {
	$scope.datas = [];
	var start = 0;
	var statu = '就餐中';
	var url = 'http://localhost/restaurent/getOrders.php?start=' + start + '&count=6&statu=' + statu;
	$http.get(url).success(function(data) {
		$scope.datas = data;
	});
})

//已消费页面
.controller('page3', function($scope, $rootScope, $http, $location, $ionicViewSwitcher) {
	$scope.datas = [];
	var start = 0;
	var statu = '已消费';
	var url = 'http://localhost/restaurent/getOrders.php?start=' + start + '&count=6&statu=' + statu;
	$http.get(url).success(function(data) {
		$scope.datas = data;
	});
	$scope.toWrite = function(orderId) {
		// alert(orderId);
		var writeUrl = '/writeComment/' + orderId;
		$location.path(writeUrl);
		$ionicViewSwitcher.nextDirection("forward");
	};
})

//登录页面
.controller('LoginCtrl', function($scope, $rootScope, $http, datas, $state, $ionicViewSwitcher, $cordovaToast) {
	$scope.msg = {
		username: '',
		password: ''
	};
	//登录事件
	$scope.login = function() {
		console.log($scope.msg);
		if ($scope.msg.username !== '' && $scope.msg.password !== '') {
			var url = 'http://localhost/restaurent/login.php';
			$http({
				method: 'post',
				url: url,
				data: {
					username: $scope.msg.username,
					password: $scope.msg.password
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				transformRequest: function(obj) {
					var str = [];
					for (var p in obj) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");
				}
			}).success(function(data) {
				if (data.result) {
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
						.show('账户或密码输入错误!', 'short', 'bottom')
						.then(function() {
							// alert('success');
						}, function() {
							// alert('fail');
						});
				}
			});
			// if ($scope.msg.username == "admin" && $scope.msg.password == "admin") {
			// 	$rootScope.isLogined = true;
			// 	var tempObj = {
			// 		name: $scope.msg.username,
			// 		date: '2011-6-6',
			// 		avatar: 'img/img2.jpg',
			// 		phone: "12345678912"
			// 	}
			// 	datas.setUserDatas(tempObj);
			// 	$state.go('tab.me');
			// 	$ionicViewSwitcher.nextDirection("back");
			// } else {
			// 	$cordovaToast
			// 		.show('账户或密码输入错误!', 'short', 'bottom')
			// 		.then(function() {
			// 			// alert('success');
			// 		}, function() {
			// 			// alert('fail');
			// 		});
			// }
		} else {
			$cordovaToast
				.show('请输入账户、密码', 'short', 'bottom')
				.then(function() {
					// alert('success');
				}, function() {
					// alert('fail');
				});
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
.controller('SettingCtrl', function($scope, $rootScope, datas, $state, $ionicViewSwitcher, $ionicHistory, $cordovaProgress, $cordovaToast) {
	//缓存大小
	$scope.cache = (Math.random()).toFixed(2) + 'MB';
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
.controller('UserProtocolCtrl', function($scope, $rootScope, datas, $state, $ionicHistory, $ionicViewSwitcher) {
	$scope.protocolText = datas.getProtocol();
})

//关于小明点餐页面
.controller('AboutlCtrl', function($scope, $rootScope, datas, $state, $ionicHistory, $ionicViewSwitcher) {
	$scope.aboutText = datas.getAboutText();
})

//意见反馈页面
.controller('FedbackCtrl', function($scope, $rootScope, $state, $ionicViewSwitcher, $ionicHistory) {})

//消息页面
.controller('MsgCtrl', function($scope, $rootScope, $state, $ionicViewSwitcher, $ionicHistory) {
	$scope.msgDatas = [];
})

//我的关注页面
.controller('MyconcernCtrl', function($scope, $rootScope, $ionicViewSwitcher, $state, $ionicHistory, datas, $http, $location) {
	$scope.userData = datas.getUserDatas();
	$scope.items = [];
	var start = 0;
	var count = 6;
	var url = 'http://localhost/restaurent/getConcern.php?userId=' + $scope.userData.userId + '&start=' + start + '&count=' + count;
	$http.get(url).success(function(data) {
		$scope.items = data;
	});
	$scope.cancel = function(e, restaurentId) {
		e.stopPropagation();
		var isCancel = confirm('确定取消关注？');
		if (isCancel) {
			var delUrl = 'http://localhost/restaurent/delConcern.php?userId=' + $scope.userData.userId + '&restaurentId=' + restaurentId;
			$http.get(delUrl).success(function(data) {
				if (data.result) {
					$http.get(url).success(function(data) {
						$scope.items = data;
					});
				}
			});
		}
		// return false;
	};
	$scope.forwardClick = function(restaurentId) {
		var itemUrl = '/tab/home/' + restaurentId;
		$location.path(itemUrl);
		$ionicViewSwitcher.nextDirection("forward");
	};
})

//邀请页面
.controller('InviteCtrl', function($scope, $rootScope, $ionicViewSwitcher, $state, $ionicHistory) {})

//预约订座页面
.controller('BookTableCtrl', function($scope, $rootScope, $stateParams, $state, $ionicViewSwitcher, $ionicHistory, $cordovaDatePicker, datas, $location) {
	// $scope.bookDatas1 = [];
	$scope.deskData = [{
		deskId: 1,
		deskNum: 1
	}, {
		deskId: 2,
		deskNum: 2
	}, {
		deskId: 3,
		deskNum: 3
	}, {
		deskId: 4,
		deskNum: 4
	}, {
		deskId: 5,
		deskNum: 5
	}];
	$scope.dateText = "请选择就餐时间";
	var userData = datas.getUserDatas();
	$rootScope.order = {
		userId: userData.userId,
		restaurentId: $stateParams.restaurentId,
		orderId: datas.getOrderNumber(),
		time: "",
		numOfPeople: 1,
		isRoom: false,
		contacter: userData.name,
		phone: userData.phone,
		remark: "",
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
	}, {
		title: "餐桌位置随机",
		isDesk: true,
		chooseDesk: true
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
	//显示桌子
	$scope.showDesk = function(e) {
		// alert(e.target.checked);
		// if (!e.target.checked) {
		// 	$('#book-table .desk-box').slideDown();
		// }else{
		//
		// }
		$('#book-table .desk-box').slideToggle();
	};
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
	//选择桌子
	$('.desk').on('click', function(e) {
		console.log(e.target.id);
		// this.addClass('desk-active');
	});
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
		datas.setCurrentOrder($rootScope.order);
		// $state.go('menu');
		$location.path('/tab/menu/' + $stateParams.restaurentId);
		// $ionicHistory.goBack();
		$ionicViewSwitcher.nextDirection("forward");
	};
})

//账户页面
.controller('AccountCtrl', function($scope, $rootScope, $cordovaDialogs, datas, $state, $cordovaImagePicker, $ionicViewSwitcher, $ionicHistory, $cordovaDatePicker) {
	$scope.editText = '编辑';
	$scope.isEditable = true;
	$scope.isPasswordBox = false;
	$scope.pswMsg = {
			psw1: '',
			psw2: ''
		}
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
		// clickEvent: 'openPicker()',
		isDate: true,
	}, {
		tag: '修改登录密码',
		clickEvent: 'editPsw()',
	}];
	// 修改密码
	$scope.changPsw = function() {
		console.log($scope.pswMsg.psw1, $scope.pswMsg.psw2);
		$('#passwordBox').fadeOut();
		if ($scope.pswMsg.psw1 == '' || $scope.pswMsg.psw2 == '') {
			alert('密码不能为空！');
		} else {
			if ($scope.pswMsg.psw1 != $scope.pswMsg.psw2) {
				alert('密码不一致！');
			} else {
				//提交到服务器，修改数据
			}
		}
	};
	$scope.cancelOpart = function() {
		$('#passwordBox').fadeOut();
	};
	$scope.editPsw = function() {
		$('#passwordBox').fadeIn();
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
			// $cordovaImagePicker.getPictures(imgoptions)
			// 	.then(function(results) {
			// 		$cordovaFile.readAsText(cordova.file.dataDirectory, $scope.readFile)
			// 			.then(function(success) {
			// 				// success
			// 			}, function(error) {
			// 				// error
			// 			});
			// 		alert(results)
			// 		$scope.userData.avatar = results[0];
			// 		//*******************
			// 		datas.setUserDatas($scope.userData);
			// 	}, function(error) {
			// 		// error getting photos
			// 	});
			$('#file').trigger('click');
			// $scope.userData.avatar = $('#file').files[0];

		}
	};

	$('#file').on('change', function(e) {
		var file = e.target.files || e.dataTransfer.files;
		console.log(file);
		// var reader = new FileReader();
		// reader.onload = function() {
		// 	$scope.userData.avatar = $('#file')[0].files['0'];
		// 	$scope.$apply();
		// }
		// reader.readAsDataURL(file);

	});

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
	$scope.itemDatas = [{
		name: '11'
	}, {
		name: '22'
	}, {
		name: '33'
	}, {
		name: '44'
	}];

})

//菜单
.controller('MenuCtrl', function(datas, $scope, $rootScope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $http, $location) {
	// alert($stateParams.restaurentId);
	$scope.restaurentName = '小明餐厅';
	$scope.deskNum = 10;
	$scope.totleMoney = 0;
	$scope.numOfMenu = 0;
	$scope.activeClass = "item-selected";
	$scope.restaurentId = $stateParams.restaurentId;
	$scope.detailMenuData = {
		id: 2,
		img: 'img/img1.jpg',
		name: '大烫阿萨德',
		descript: '大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德'
	};
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
	$scope.allMenu = [];
	// $scope.detailDatas = $scope.allMenu;
	//获取菜单
	// getMenu();
	// function getMenu(){
	$http.get('http://localhost/restaurent/getMenu.php?restaurentId=' + $scope.restaurentId).success(function(data) {
		console.log(data);
		$scope.allMenu = data;
		$scope.detailDatas = data;
	});
	// }
	// alert($scope.restaurentId);
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
				if ($scope.allMenu[i].classify.indexOf(tag) != -1) {
					tempArr.push($scope.allMenu[i]);
				}
			}
			$scope.detailDatas = tempArr;
		}

	};
	// 隐藏菜式详细页
	$scope.hideDetail = function() {
		$('.detail-box').fadeOut();
	};
	//减菜
	$scope.dec = function(id, $event) {
		$event.stopPropagation();
		for (var i = 0; i < $scope.detailDatas.length; i++) {
			if ($scope.detailDatas[i].menuId == id && $scope.detailDatas[i].num > 0) {
				$scope.detailDatas[i].num--;
				$scope.numOfMenu--;
				$scope.totleMoney -= parseInt($scope.detailDatas[i].price);
				break;
			}
		}
	};
	//加菜
	$scope.add = function(id, $event) {
		$event.stopPropagation();
		for (var i = 0; i < $scope.detailDatas.length; i++) {
			if ($scope.detailDatas[i].menuId == id) {
				$scope.detailDatas[i].num++;
				$scope.totleMoney += parseInt($scope.detailDatas[i].price);
				// break;
			}
		}
		$scope.numOfMenu++;
	};
	// //购物车
	// $scope.shoppingCarClick = function() {
	// 	// $scope.myOrders = [];
	// 	// for (var i = 0; i < $scope.allMenu.length; i++) {
	// 	// 	if ($scope.allMenu[i].num > 0) {
	// 	// 		$scope.myOrders.push($scope.allMenu[i]);
	// 	// 	}
	// 	// }
	// 	$scope.showOrderBox = !$scope.showOrderBox;
	//
	// };
	//清空购物车
	$scope.clearCar = function($event) {
		$event.stopPropagation();
		for (var i = 0; i < $scope.allMenu.length; i++) {
			$scope.allMenu[i].num = 0;
		}
		$scope.totleMoney = 0;
		$scope.numOfMenu = 0;
	};
	$scope.locationClick = function() {
		$scope.showLocation = !$scope.showLocation;
	};
	// 选好了
	$scope.goHadOrders = function() {
		var tempMenu = [];
		for (var i = 0; i < $scope.allMenu.length; i++) {
			if ($scope.allMenu[i].num != 0) {
				tempMenu.push($scope.allMenu[i]);
			}
		}
		datas.setMenuMsg(tempMenu);
		$state.go('shoppingCar');
		// $location.path('/tab/shoppingCar/'+);
		$ionicViewSwitcher.nextDirection("forward");
	};
})


//商家营业资质
.controller('EnterpriseCtrl', function($scope, $rootScope, $ionicHistory, $ionicViewSwitcher) {
	$scope.imgDatas = ['img/img1.jpg', 'img/img2.jpg'];
})

//已点菜单
.controller('ShoppingCarCtrl', function(datas, $scope, $rootScope, $ionicHistory, $ionicViewSwitcher) {
	console.log(datas.getCurrentOrder(), datas.getMenuMsg());
	$scope.orderMsg = datas.getCurrentOrder();
	$scope.allMenu = datas.getMenuMsg();
})

//写评论
.controller('writeCommentCtrl', function($scope, $rootScope, $ionicHistory, $ionicViewSwitcher, $stateParams) {
	$scope.sscore = 5;
	$scope.tscore = 5;
	$scope.escore = 5;
	$scope.orderId = $stateParams.orderId;
})

//顾客评论
.controller('EvaluationCtrl', function($scope, $rootScope, $stateParams, $ionicHistory, $ionicViewSwitcher, $http) {
	$scope.restaurentId = $stateParams.restaurentId;
	$scope.evaluationDatas = [
		// {
		// 	evaluationId: 1,
		// 	time: '2017-01-17',
		// 	name: '小明1',
		// 	avatar: "img/img1.jpg",
		// 	content: '阿萨德法师打算打算打算打算打算打算打算打算打算打算打算打打',
		// 	useful: 0,
		// 	useless: 0,
		// }
	];
	var start = 0;
	var url = 'http://localhost/restaurent/commet.php?start=' + start + '&count=10&restaurentId=' + $scope.restaurentId;
	$http.get(url).success(function(data) {
		$scope.evaluationDatas = data;
	});
})

//城市选择
.controller('SelectCityCtrl', function($scope, $rootScope, $state, datas, $location, $ionicHistory, $ionicViewSwitcher, $ionicScrollDelegate) {
	$scope.citys = datas.getCitys();
	$scope.alphabet = datas.getAlphabet();
	$scope.currentAlphabet = 0;
	$scope.hotCity = ['广州市', '北京市', '珠海市'];
	$scope.locationCity = datas.getLocationCity();
	//城市列表拖动
	$scope.alphabetMove = function(e) {
		for (var i = 0; i < $('.alphabet li').length; i++) {
			var top = $('.alphabet li').eq(i).position().top;
			var height = $('.alphabet li').eq(i).height();
			if (top < Math.abs(e.gesture.touches[0].clientY) && Math.abs(e.gesture.touches[0].clientY) < top + height) {
				$scope.currentAlphabet = $('.alphabet li').eq(i).html();
				for (var j = 0; j < $scope.citys.length; j++) {
					if ($scope.citys[j].cityName.trim() == $('.alphabet li').eq(i).html().trim()) {
						$location.hash($('.alphabet li').eq(i).html().trim());
						$ionicScrollDelegate.$getByHandle('cityScroll').anchorScroll();
						break;
					}
				}
				// $location.hash($('.alphabet li').eq(i).html().trim());
				// $ionicScrollDelegate.$getByHandle('cityScroll').anchorScroll();
				break;
			}
		}
	};
	//点击切换
	$scope.alphabetClick = function(tag) {
		// console.log(tag);
		$scope.currentAlphabet = tag;
		for (var j = 0; j < $scope.citys.length; j++) {
			if ($scope.citys[j].cityName.trim() == tag.trim()) {
				$location.hash(tag.trim());
				$ionicScrollDelegate.$getByHandle('cityScroll').anchorScroll();
				break;
			}
		}
	};
	//选择城市
	$scope.citySelected = function(text) {
		if ($scope.alphabet.indexOf(text) == -1) {
			$state.go('tab.home', {
				tag: 2,
				city: text
			});
			$ionicViewSwitcher.nextDirection("back");
		}

	};
})

//用户注册
.controller('RegisterCtrl', function($scope, $state, $rootScope, $ionicHistory, $ionicViewSwitcher, $http, $cordovaToast) {
	$scope.btnType1 = 'password';
	$scope.btnType2 = 'password';
	$scope.psw1 = false;
	$scope.psw2 = false;
	$scope.isResult = false;
	$scope.isRight = false;
	$scope.registerMsg = {
		name: '',
		psw1: '',
		psw2: ''
	};
	//查看密码
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
	//检查用户名是否已存在
	$scope.checkName = function() {
		var url = 'http://www.wy.cn:8888/restaurent/checkName.php?username=' + $scope.registerMsg.name;
		$http.get(url).success(function(data) {
			$scope.isResult = true;
			if (data.result == 0) {
				$scope.isRight = true;
			} else {
				$scope.isRight = false;
			}
		});
	};
	//注册
	$scope.register = function() {
		var url = 'http://www.wy.cn:8888/restaurent/register.php';
		$http({
			method: 'post',
			url: url,
			data: {
				username: $scope.registerMsg.name,
				password: $scope.registerMsg.psw1
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			transformRequest: function(obj) {
				var str = [];
				for (var p in obj) {
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				}
				return str.join("&");
			}
		}).success(function(data) {
			var resultText = "";
			if (data.result) {
				resultText = '注册成功';

				$state.go('login');
				$ionicViewSwitcher.nextDirection("back");
			} else {
				resultText = '服务器错误，请重新注册';
			}
			$cordovaToast
				.show(resultText, 'short', 'bottom')
				.then(function() {
					// alert('success');
				}, function() {
					// alert('fail');
				});
		});
	};
});
