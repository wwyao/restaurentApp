angular.module('starter.services', [])

.factory('datas', function() {
	// Might use a resource here that returns a JSON array

	//城市
	var citys = [{
		id: 'A',
		cityName: 'A',
		isHeader: true
	}, {
		id: 'A1',
		cityName: '安庆市'
	}, {
		id: 'A2',
		cityName: '安庆市'
	}, {
		id: 'A3',
		cityName: '安庆市'
	}, {
		id: 'A4',
		cityName: '安庆市'
	}, {
		id: 'A5',
		cityName: '安庆市'
	}, {
		id: 'A6',
		cityName: '安庆市'
	}, {
		id: 'B',
		cityName: 'B',
		isHeader: true
	}, {
		id: 'B1',
		cityName: '安庆市'
	}, {
		id: 'B2',
		cityName: '安庆市'
	}, {
		id: 'B3',
		cityName: '安庆市'
	}, {
		id: 'B4',
		cityName: '安庆市'
	}, {
		id: 'B5',
		cityName: '安庆市'
	}, {
		id: 'C',
		cityName: 'C',
		isHeader: true
	}, {
		id: 'C1',
		cityName: '安庆市'
	}, {
		id: 'C2',
		cityName: '安庆市'
	}, {
		id: 'C3',
		cityName: '安庆市'
	}, {
		id: 'C4',
		cityName: '安庆市'
	}, {
		id: 'D',
		cityName: 'D',
		isHeader: true
	}, {
		id: 'D1',
		cityName: '安庆市'
	}, {
		id: 'D2',
		cityName: '安庆市'
	}, {
		id: 'D3',
		cityName: '安庆市'
	}, {
		id: 'E',
		cityName: 'E',
		isHeader: true
	}, {
		id: 'E1',
		cityName: '安庆市'
	}, {
		id: 'E2',
		cityName: '安庆市'
	}, {
		id: 'F',
		cityName: 'F',
		isHeader: true
	}, {
		id: 'F1',
		cityName: '安庆市'
	}, {
		cid: 'F2',
		cityName: '安庆市'
	}, {
		id: 'G',
		cityName: 'G',
		isHeader: true
	}, {
		id: 'G1',
		cityName: '安庆市'
	}, {
		id: 'G2',
		cityName: '安庆市'
	}, {
		id: 'H'.trim(),
		cityName: 'H',
		isHeader: true
	}, {
		id: 'H1',
		cityName: '安庆市'
	}, {
		id: 'H2',
		cityName: '安庆市'
	}, {
		id: 'I',
		cityName: 'I',
		isHeader: true
	}, {
		id: 'I1',
		cityName: '安庆市'
	}, {
		id: 'I2',
		cityName: '安庆市'
	}, {
		id: 'J',
		cityName: 'J',
		isHeader: true
	}, {
		id: 'J1',
		cityName: '安庆市'
	}, {
		id: 'J2',
		cityName: '安庆市'
	}, {
		id: 'K',
		cityName: 'K',
		isHeader: true
	}, {
		id: 'K1',
		cityName: '安庆市'
	}, {
		id: 'K2',
		cityName: '安庆市'
	}, {
		id: 'L',
		cityName: 'L',
		isHeader: true
	}, {
		id: 'L1',
		cityName: '安庆市'
	}, {
		id: 'L2',
		cityName: '安庆市'
	}, {
		id: 'M',
		cityName: 'M',
		isHeader: true
	}, {
		id: 'M1',
		cityName: '安庆市'
	}, {
		id: 'M2',
		cityName: '安庆市'
	}, {
		id: 'N',
		cityName: 'N',
		isHeader: true
	}, {
		id: 'N1',
		cityName: '安庆市'
	}, {
		id: 'N2',
		cityName: '安庆市'
	}, {
		id: 'O',
		cityName: 'O',
		isHeader: true
	}, {
		id: 'O1',
		cityName: '安庆市'
	}, {
		id: 'O2',
		cityName: '安庆市'
	}, {
		id: 'P',
		cityName: 'P',
		isHeader: true
	}, {
		id: 'P1',
		cityName: '安庆市'
	}, {
		id: 'P2',
		cityName: '安庆市'
	}];
	//字母表
	var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	// 已登录的用户信息
	var userDatas = {
		name: 'admin',
		date: '2011-6-6',
		avatar: 'img/img2.jpg',
		phone: "12345678912"
	};
	// var userDatas = null;

	//协议文本
	var protocolText = ["一、总则",
		"1.1、 用户在使用点餐猫服务前， 应当仔细阅读《 点餐猫用户协议》（ 以下简称“ 本协议”） 的全部内容， 对于本协议中的加重字体、 斜体、 下划线、 颜色标记等条款需重点阅读、 理解。",
		"1.2、 用户应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序。 用户在进行注册程序过程中点击'注册'", "按钮即表示用户与点餐猫达成以下协议， 完全接受本协议项下的全部条款， 本协议即在用户与点餐猫之间产生法律效力， 对双方均具有法律约束力。",
		"1.3、 用户注册成功后， 点餐猫将给予每个用户一个用户帐号及相应的密码， 该用户帐号和密码由用户负责保管； 用户应当对以其用户帐号进行的所有活动和事件负法律责任。",
		"1.4、 点餐猫用户协议、各个频道单项服务条款、全部活动条款及公告可由点餐猫随时更新，且无需另行通知。点餐猫有权对上述条款进行修改，修改后的协议一旦公布即有效替代原有协议。用户可随时查询最新协议。用户在使用点餐猫提供的各项服务之前，应仔细阅读本协议及本协议不可分割的各项服务协议。用户在使用相关服务时,应关注并遵守其所适用的相关条款。用户如不同意本服务协议及/或随时对其的修改，可以主动取消点餐猫提供的服务；用户一旦使用点餐猫服务，即视为用户已了解并完全同意本协议及其他服务条款中的各项内容，包括点餐猫对本协议及其他服务条款随时所做的任何修改，并成为点餐猫用户。",
		"二、相关定义",
		"2.1、 点餐猫：指重庆浩品峰电子商务有限公司运营和所有的网络交易服务平台。重庆浩品峰电子商务有限公司通过点餐猫平台向用户和商户提供相关互联网端及移动端交易服务。",
		"2.2、 消费： 指商户通过点餐猫平台发布其商品信息，用户通过点餐猫网平台购买消费，并以在线支付的方式进行结账的消费行为。"
	];

	//关于小明点餐的文本
	var aboutText = ["小明点餐系统支持在线预定、电子菜单、到店扫码点菜/结账等功能，顾客通过手机端可以全程自助完成预定+点菜+结账，降低每个环节的等待时间，提升餐馆服务效率。",
		"同时为了满足不同用户的需求点餐猫还支持iPad点菜、微信预定/点菜功能。",
		"真正实现一个系统支持多端融合的“互联网+”餐馆。"
	];

	return {
		//获取登录的用户的信息
		getUserDatas: function() {
			return userDatas;
		},
		//修改用户信息
		setUserDatas: function(obj) {
			userDatas = obj;
		},
		//获取协议文本
		getProtocol: function() {
			return protocolText;
		},
		//获取关于小明点餐的文本
		getAboutText: function() {
			return aboutText;
		},

		//获取城市
		getCitys: function() {
			return citys;
		},
		//获取字母表
		getAlphabet: function() {
			return alphabet;
		}
	};
});
