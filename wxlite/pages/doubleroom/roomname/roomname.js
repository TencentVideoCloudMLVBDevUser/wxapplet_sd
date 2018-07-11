// pages/doubleroom/roomname/roomname.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		roomName: '',	// 房间名称
    roomID: '',	// 房间ID
		userName: '',	// 用户名称
		tapTime: ''		// 防止两次点击操作间隔太快
	},
	
	/**
	 * [bindRoomName 绑定输入框]
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	bindRoomName: function (e) {
		var self = this;
		self.setData({
			roomName: e.detail.value
		});
	},

  /**
	 * [bindRoomID 绑定输入框]
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
  bindRoomID: function (e) {
    var self = this;
    self.setData({
      roomID: e.detail.value
    });
  },
	
	/**
	 * [create 进入rtcroom页面]
	 * @return {[type]} [description]
	 */
	create: function () {
		var self = this;
		// 防止两次点击操作间隔太快
		var nowTime = new Date();
		if (nowTime - this.data.tapTime < 1000) {
			return;
		}
    if (!self.data.roomName) {
      self.data.roomName = "新建双人音视频";
    }
    if (!self.data.roomID) {
      self.data.roomID = 'room_' + (((1 + Math.random()) * 0x10000) | 0).toString(16) + '_' + (((1 + Math.random()) * 0x10000) | 0).toString(16) + '_' + (((1 + Math.random()) * 0x10000) | 0).toString(16);
    }
		if (/[<>*{}()^%$#@!~&= ]/.test(self.data.roomName)) {
			wx.showModal({
				title: '提示',
        content: '名称不能为空或包含特殊字符',
				showCancel: false
			});
			return;
		};
    var url = '../room/room?roomID=' + self.data.roomID + '&roomName=' + self.data.roomName + '&userName=' + this.data.userName;
		wx.redirectTo({
			url: url
		});
		wx.showToast({
			title: '进入房间',
			icon: 'success',
			duration: 1000
		})
		self.setData({ 'tapTime': nowTime });
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			userName: options.userName || ''
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
    return {
      // title: '双人音视频',
      // path: '/pages/doubleroom/roomlist/roomlist',
      path: '/pages/main/main',
      imageUrl: 'https://mc.qcloudimg.com/static/img/dacf9205fe088ec2fef6f0b781c92510/share.png'
    }
	}
})