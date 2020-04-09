/**
 * @ Author: zhenghui
 * @ Create Time: 2020-04-01 10:57:32
 * @ Modified by: zhenghui
 * @ Modified time: 2020-04-09 15:25:51
 * @ Description: 我的
 */
import {
	View,
	SafeAreaView,
	StyleSheet,
	Image,
	TouchableOpacity,
	Text,
	ScrollView
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";


export default class MyIndexPage extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			islogin: false,
			user: "还没有登录呢",
			setingdata: [
				{name: "flag", text: "目标"},
				{name: "thumbs-o-up", text: "给个好评"},
				{name: "beer", text: "一起喝啤酒"},
				{name: "venus", text: "关于我"},
				{name: "glide-g",text: "ZINETE"},
				{name: "gear", text: "设置"},
			]
		}
	}

	_goLoginPage(islogin) {
		const {navigation} = this.props;
		if(islogin) {
			alert("登录ok")
		} else {
			navigation.navigate('LoginScreen', {
				onCallBack:(user) => {
					this.setState({
						user,
						islogin: true
					})
				}
			});
		}
	}

	returnData(id, name) {
		this.setState({id: id, name: name});
	}
	render() {
		const { setingdata, user } = this.state
		const ddd =  this.props.route;
		console.log(ddd, 'ddddddddddddddd')
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView style={styles.use_body}>
					<View style={styles.use_info_list}>
						<Image
							source={{ uri: "https://www.zinete.com/images/p2.jpg" }}
							style={styles.use_img} />
						<View style={styles.use_des}>
							<Text style={styles.use_name}>{user}</Text>
							<TouchableOpacity onPress={() => this._goLoginPage(this.state.islogin)} activeOpacity={0.5}>
								<Text style={styles.user_seting}>{this.state.islogin === false ? "马上登录" : "查看或修改个人资料"}</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.user_fans_body}>
						<View style={styles.user_fans_bar}>
							<Text style={styles.user_fans_bar_num}>44</Text>
							<Text style={styles.user_fans_bar_title}>装b</Text>
						</View>
						<View style={styles.user_fans_bar_lint}>
							<Text style={styles.user_fans_bar_num}>13</Text>
							<Text style={styles.user_fans_bar_title}>粉丝</Text>
						</View>
						<View style={styles.user_fans_bar}>
							<Text style={styles.user_fans_bar_num}>24</Text>
							<Text style={styles.user_fans_bar_title}>收藏</Text>
						</View>
					</View>

					<View style={styles.use_seting_list}>
						{
						  setingdata.map((items, index) => (
								<TouchableOpacity style={styles.use_seting_box} key={index} activeOpacity={.5}>
									<Icon name={items.name} size={24} color="#c5c6c7" style={{width: 24}}/>
									<Text style={styles.use_seting_title}>{items.text}</Text>
							</TouchableOpacity>
							))
						}
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	use_body: {
		marginTop: 20,
		marginHorizontal: 8,
	},
	use_img: {
		height: 60,
		width: 60,
		borderRadius: 30
	},
	use_info_list: {
		marginHorizontal: 8,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	use_des: {
		flex: 2,
		marginLeft: 16
	},
	use_name: {
		fontSize: 28,
		fontWeight: "600",
		color: "#1b2c45",
		marginBottom: 4,
	},
	user_seting: {
		fontSize: 15,
		fontWeight: "500",
		color: "#c5c6c7",
		marginTop: 4,
	},
	user_fans_body: {
		height: 80,
		borderRadius: 10,
		backgroundColor: "#fff",
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center"
	},
	user_fans_bar_lint: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderRightColor: "#efefef",
		borderLeftColor: "#efefef"
	},
	user_fans_bar: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	user_fans_bar_num: {
		fontSize: 20,
		fontWeight: "700",
		color: "#000",
		marginBottom: 4
	},
	user_fans_bar_title: {
		fontWeight: "700",
		color: "#c5c6c7",
		fontSize: 12,
		marginTop: 4
	},
	use_seting_list: {
		borderRadius: 10,
		marginTop: 14,
		backgroundColor: "#fff"
	},
	use_seting_box: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 20,
		marginHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#efefef",
	},
	use_seting_title: {
		flex: 1,
		marginLeft: 20,
		fontSize: 16
	}
})