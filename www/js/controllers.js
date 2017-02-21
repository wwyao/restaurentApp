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
			$ionicHistory.goBack(-1);
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
		rankValue: '默认',
		placeValue: '全部'
	};
	// $scope.classifyValue = '所有分类';
	// $scope.rankValue = '综合评分优先';
	// $scope.placeValue = '全部';
	$scope.classifyName = ['火锅', '川菜', '海鲜', '烧烤', '西餐', '粤菜', '快餐', '干锅'];
	$scope.rankName = ['默认', '环境优先', '服务优先', '味道优先'];                                                                                                                                                                                                                                                                                                                                                              
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
	// function getRestaurentData(start, count) {
	// 	$scope.start += 6;
	// 	var url = 'http://localhost/restaurent/allRestaurent.php?start=' + start + '&count=' + count;
	// 	$http.get(url).success(function(data) {
	// 		console.log(data.length != 0);
	// 		if (data.length != 0) {
	// 			$scope.items = $scope.items.concat(data);
	// 		} else {
	// 			$scope.isDatas = false;
	// 			// console.log('没有更多数据了');
	// 		}
	// 		$scope.$broadcast('scroll.infiniteScrollComplete');
	// 	});
	// }
	function getRestaurentData(start, count) {
		$http({
			method: 'GET',
			url: 'http://localhost/restaurent/allRestaurent.php',
			params: {
				start: start,
				count: count,
				classifyValue: $scope.values.classifyValue,
				rankValue: $scope.values.rankValue,
				placeValue: $scope.values.placeValue
			}
		}).success(function(data, header, config, status) {
			//响应成功
			if (data.length != 0) {
				$scope.items = $scope.items.concat(data);
			} else {
				$scope.isDatas = false;
				// console.log('没有更多数据了');
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.start += 6;
		}).error(function(data, header, config, status) {
			//处理响应失败
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
				alert(barcodeData.text);
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
		$scope.start = 0;
		$http({
			method: 'GET',
			url: 'http://localhost/restaurent/particularResData.php',
			params: {
				text: $scope.values.classifyValue,
				start: $scope.start
			}
		}).success(function(data, header, config, status) {
			//响应成功
			// console.log(data);
			$scope.items = data;
			$scope.start += 6;
		}).error(function(data, header, config, status) {
			//处理响应失败
		});
		// alert($scope.values.classifyValue);
	};
	//排序改变
	$scope.rankChange = function() {
		alert($scope.values.rankValue);
	};
	// document.querySelector('.bigScroll').style.height = window.screen.height + 'px';
})

//餐厅详细页面
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
		$('.share').fadeToggle();
		$scope.isMore = !$scope.isMore;
	};
	$scope.hideShare = function() {
		$('.share').fadeToggle();
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
	$scope.more = function() {
		$('.more-list').slideToggle();
	};
	// 点菜
	$scope.toMenu = function() {
		$state.go('menu', {
			restaurentId: $scope.restaurentId,
			from: 'detail'
		});
	};
	// 预约
	$scope.book = function() {
		$state.go('bookTable', {
			restaurentId: $scope.restaurentId,
			from: 'detail'
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
		href: 'recommendRestaurent',
		show: false,
		otherMsg: "18826255298",
		tagText: '推荐餐厅'
	}, {
		href: 'myconcern',
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
		href: 'about',
		show: false,
		otherMsg: "18826255298",
		tagText: '关于小明点餐'
	}, {
		href: 'userprotocol',
		show: false,
		otherMsg: "18826255298",
		tagText: '小明点餐用户协议'
	}];
	$scope.settingClick = function() {
		$state.go('setting');
		$ionicViewSwitcher.nextDirection("forward");
	};
	$scope.itemClick = function(url) {
		$state.go(url);
		$ionicViewSwitcher.nextDirection("forward");
	};
})

//未消费页面
.controller('page1', function(datas, $scope, $rootScope, $http, $cordovaDialogs, $state, $ionicViewSwitcher) {
	$scope.datas = [];
	$scope.start = 0;

	$scope.isBottom = true;
	$scope.loadMore = function() {
		$http({
			method: 'GET',
			url: 'http://localhost/restaurent/getOrders.php',
			params: {
				start: $scope.start,
				count: 4,
				statu: '未付款',
				userId: datas.getUserDatas().userId
			}
		}).success(function(data, header, config, status) {
			//响应成功
			// console.log(data);
			$scope.datas = $scope.datas.concat(data);
			$scope.start += data.length;
			if (data.length < 4) {
				$scope.isBottom = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function(data, header, config, status) {
			//处理响应失败
		});
	};
	$scope.loadMore();
	var i = 0;
	$scope.cancel = function(e, orderId) {
		e.stopPropagation();
		// console.log(i++,'cancel');

		// var isCancel = $cordovaDialogs.confirm('确定取消订单？', '');
		var isCancel = confirm('确定取消订单？', '');
		// alert(orderId+':'+isCancel);
		console.log(isCancel);
		if (isCancel) {
			$http.get('http://localhost/restaurent/cancelOrder.php?orderId=' + orderId).success(function(data) {
				console.log(data);
				if (data.result) {
					$http({
						method: 'GET',
						url: 'http://localhost/restaurent/getOrders.php',
						params: {
							start: 0,
							count: 4,
							statu: '未付款',
							userId: datas.getUserDatas().userId
						}
					}).success(function(data, header, config, status) {
						//响应成功
						// console.log(data);
						$scope.datas = data;
						// $scope.$apply();
						$scope.start += data.length;
						if (data.length < 4) {
							$scope.isBottom = false;
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}).error(function(data, header, config, status) {
						//处理响应失败
					});
				}
			});
		}
	};
	$scope.toPay = function(orderId) {
		$state.go('pay', {
			orderId: orderId,
			from: 'orders'
		});
		$ionicViewSwitcher.nextDirection("forward");
	};
})

//就餐中页面
.controller('page2', function(datas, $scope, $rootScope, $http, $state, $ionicViewSwitcher) {
	$scope.datas = [];
	$scope.start = 0;
	$scope.isBottom = true;
	$scope.loadMore = function() {
		$http({
			method: 'GET',
			url: 'http://localhost/restaurent/getOrders.php',
			params: {
				start: $scope.start,
				count: 4,
				statu: '就餐中',
				userId: datas.getUserDatas().userId
			}
		}).success(function(data, header, config, status) {
			//响应成功
			// console.log(data);
			$scope.datas = $scope.datas.concat(data);
			$scope.start += data.length;
			if (data.length < 4) {
				$scope.isBottom = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function(data, header, config, status) {
			//处理响应失败
		});
	};
	$scope.loadMore();
	$scope.toPay = function(orderId) {
		$state.go('pay', {
			orderId: orderId,
			from: 'orders'
		});
		$ionicViewSwitcher.nextDirection("forward");
	};
	$scope.addMenu = function(orderId) {
		$state.go('menu', {
			restaurentId: null,
			from: 'orders'
		});
		$ionicViewSwitcher.nextDirection("forward");
	};
})

//已消费页面
.controller('page3', function($scope, datas, $rootScope, $http, $location, $ionicViewSwitcher) {
	$scope.datas = [];
	$scope.start = 0;
	$scope.isBottom = true;
	$scope.loadMore = function() {
		$http({
			method: 'GET',
			url: 'http://localhost/restaurent/getOrders.php',
			params: {
				start: $scope.start,
				count: 4,
				statu: '已消费',
				userId: datas.getUserDatas().userId
			}
		}).success(function(data, header, config, status) {
			//响应成功
			// console.log(data);
			$scope.datas = $scope.datas.concat(data);
			$scope.start += data.length;
			if (data.length < 4) {
				$scope.isBottom = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function(data, header, config, status) {
			//处理响应失败
		});
	};
	$scope.loadMore();
	$scope.toWrite = function(orderId, restaurentId, title) {
		// alert(orderId);
		var writeUrl = '/writeComment/' + orderId + '/' + restaurentId + '/' + title;
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
		desk: '',
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
	$scope.deskClick = function(deskId, index) {
		for (var i = 0; i < $('.desk').length; i++) {
			$('.desk').eq(i).removeClass('desk-active');
		}
		$('.desk').eq(index).addClass('desk-active');
		$rootScope.order.desk = deskId;
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
		console.log($rootScope.order);
		datas.setCurrentOrder($rootScope.order);
		if ($stateParams.from == 'detail') {
			$state.go('menu', {
				restaurentId: $stateParams.restaurentId,
				from: 'booktable'
			});
		} else if ($stateParams.from == 'menu') {
			$state.go('shoppingCar', {
				orderId: $rootScope.order.orderId
			});
		}
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
	//提交用户信息
	$scope.updateUserData = function() {
		alert('submit');
	};
	// 修改密码
	$scope.changPsw = function() {
		console.log($scope.pswMsg.psw1, $scope.pswMsg.psw2);
		if ($scope.pswMsg.psw1 == '' || $scope.pswMsg.psw2 == '') {
			alert('密码不能为空！');
		} else {
			if ($scope.pswMsg.psw1 != $scope.pswMsg.psw2) {
				alert('密码不一致！');
			} else {
				//提交到服务器，修改数据
				$.ajax({
					type: 'POST',
					url: 'http://localhost/restaurent/updatePassword.php',
					dataType: 'json',
					data: {
						userId: $scope.userData.userId,
						password: $scope.pswMsg.psw1
					},
					success: function(data) {
						if (data.result) {
							$('#passwordBox').fadeOut();
						}
					},
				});
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
		name: '请选择要推荐的餐厅'
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
		// id: 2,
		// img: 'img/img1.jpg',
		// name: '大烫阿萨德',
		// descript: '大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德大烫阿萨德'
	};
	$rootScope.orderMenus = [];
	$scope.showOrderBox = false;
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
	//查看菜式详情
	$scope.detailMenuClick = function(menuId) {
		$http.get('http://localhost/restaurent/detailMenu.php?menuId=' + menuId).success(function(data) {
			$scope.detailMenuData = data;
		});
		$('.detail-box').fadeIn();
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
	$scope.shoppingCar = function() {
		$scope.showOrderBox = !$scope.showOrderBox;
		// $('.my-order').slideToggle();
	};
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
		$('.location-box').slideToggle();
	};
	// 选好了
	$scope.goHadOrders = function() {
		var tempMenu = [];
		for (var i = 0; i < $scope.allMenu.length; i++) {
			if ($scope.allMenu[i].num != 0) {
				tempMenu.push($scope.allMenu[i]);
			}
		}
		console.log(tempMenu);
		datas.setMenuMsg(tempMenu);
		if ($stateParams.from == 'booktable') {
			$state.go('shoppingCar', {
				orderId: datas.getCurrentOrder().orderId
			});
		} else if ($stateParams.from == 'detail') {
			$state.go('bookTable', {
				restaurentId: $scope.restaurentId,
				from: 'menu'
			});
		}

		// $location.path('/tab/shoppingCar/'+);
		$ionicViewSwitcher.nextDirection("forward");
	};
})


//商家营业资质
.controller('EnterpriseCtrl', function($scope, $rootScope, $ionicHistory, $ionicViewSwitcher) {
	$scope.imgDatas = ['img/img1.jpg', 'img/img2.jpg'];
})

//订单信息
.controller('ShoppingCarCtrl', function(datas, $scope, $rootScope, $ionicHistory, $state, $ionicViewSwitcher, $location) {
	console.log(datas.getCurrentOrder(), datas.getMenuMsg());
	$scope.orderMsg = datas.getCurrentOrder();
	$scope.orderMsg.money = '￥' + Math.ceil(Math.random() * 40 + 10);
	$scope.orderMsg.statu = '未付款';
	$scope.orderMsg.orderMenuId = $scope.orderMsg.orderId;
	$scope.allMenu = datas.getMenuMsg();
	//确定下单
	$scope.makeOrder = function() {
		// console.log(datas.getCurrentOrder(), datas.getMenuMsg());
		$.ajax({
			method: 'post',
			url: 'http://localhost/restaurent/addOrders.php',
			data: $scope.orderMsg,
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if (data.result) {
					$state.go('pay', {
						orderId: $scope.orderMsg.orderId
					});
					$ionicViewSwitcher.nextDirection("forward");
				}
			},
			error: function(data) {
				console.log(data);
			}
		});
	};
	//删除订单
	$scope.delOrder = function() {
		datas.setCurrentOrder('');
		datas.setMenuMsg('');
		$ionicHistory.goBack(-3);
		$ionicViewSwitcher.nextDirection("back");
	};
})

//写评论
.controller('writeCommentCtrl', function($scope, datas, $rootScope, $ionicHistory, $ionicViewSwitcher, $stateParams) {
	$scope.commentData = {
		orderId: $stateParams.orderId,
		restaurentId: $stateParams.restaurentId,
		userId: datas.getUserDatas.userId,
		sscore: 10,
		tscore: 10,
		escore: 10,
		text: '',
		time: ''
	}
	$scope.title = $stateParams.title;
	$scope.addComment = function() {
		if ($scope.commentData.text == "") {
			alert("评论不能为空");
		} else {
			var date = new Date();
			$scope.commentData.time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			$.ajax({
				type: 'POST',
				url: 'http://localhost/restaurent/addComment.php',
				dataType: 'json',
				data: $scope.commentData,
				success: function(data) {
					console.log(data);
					if (data.result) {
						alert('success');
					}
				},
			});
		}
	};
})

//支付
.controller('PayCtrl', function($scope, $rootScope, $ionicHistory, $ionicViewSwitcher, $stateParams, $location, $state) {
	$scope.orderData = {
		money: '￥30',
		name: '小明餐厅',
		orderId: '12312312312'
	};
	$scope.payData = [{
		imgsrc: 'img/wxpay.png',
		title: '微信支付',
		value: '微信'
	}, {
		imgsrc: 'img/yinlian.png',
		title: '银联支付',
		value: '银联'
	}, {
		imgsrc: 'img/zhifubao.png',
		title: '支付宝支付',
		value: '支付宝'
	}];
	$scope.stopPay = function() {
		if ($stateParams.from == 'orders') {
			$ionicHistory.goBack(-1);
		} else {
			$ionicHistory.goBack(-4);
		}
		$ionicViewSwitcher.nextDirection("back");
	};
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
	$scope.usefulClick = function(id) {
		$http.get('http://localhost/restaurent/addUseful.php?commetId=' + id).success(function(data) {
			if (data.result) {
				for (var i = 0; i < $scope.evaluationDatas.length; i++) {
					if ($scope.evaluationDatas[i].commetId == id) {
						$scope.evaluationDatas[i].useful = parseInt($scope.evaluationDatas[i].useful) + 1;
						break;
					}
				}
			}
		});

	};
	$scope.uselessClick = function(id) {
		$http.get('http://localhost/restaurent/useless.php?commetId=' + id).success(function(data) {
			if (data.result) {
				for (var i = 0; i < $scope.evaluationDatas.length; i++) {
					if ($scope.evaluationDatas[i].commetId == id) {
						$scope.evaluationDatas[i].useless = parseInt($scope.evaluationDatas[i].useless) + 1;
						break;
					}
				}
			}
		});
	};
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

// 扫二维码自动支付
.controller('QrcodepayCtrl', function($scope, $state, $rootScope) {

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
