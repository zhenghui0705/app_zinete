/**
 * @ Author: zhenghui
 * @ Create Time: 2020-04-01 10:55:08
 * @ Modified by: zhenghui
 * @ Modified time: 2020-04-09 16:41:59
 * @ Description:
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Longlist } from 'beeshell/dist/components/Longlist';
import axios from '../../request/http';
import variables from '../../common/style/index';
import { NavigationBar } from 'beeshell/dist/components/NavigationBar';
class HotIndexPage extends React.Component {

	componentDidMount() {
		this.refreshState();
	}

	constructor(props) {
		super(props);
		this.fetchListTimes = 0;
		this.state = {
			pageNo: 0,
			pagesize: 1,
			list: [],
			total: 0,
		};
	}

	fetchList(params) {
		const { pageNo } = params;
		return new Promise((resolve) => {
		  axios.get('reptile/news').then((data) => {
				resolve(data);
			});
		}).catch((e) => {
			console.log(e);
		});
	}
	modifyList(list) {
		return list.map((item) => {
			return {
				...item,
			};
		});
	}

	refreshState(pageNo) {
		pageNo = pageNo || this.state.pageNo + 1;
		const params = {
			pageNo,
			pagesize: this.state.pagesize,
		};
		this.fetchListTimes++;
		const tmpFetchListTimes = this.fetchListTimes;
		return this.fetchList(params)
			.then((resData) => {
				// Promise 一旦发起不能终止，通过请求数据的次数，判断请求是否有效
				if (tmpFetchListTimes !== this.fetchListTimes) {
					return;
				}
				const pageNo = params.pageNo;
				const { list, total } = resData;
				const newList = this.modifyList(list, pageNo);
				const oldList =
					pageNo === 1 || this.state.list == null ? [] : this.state.list;
				this.setState({
					pageNo,
					total,
					list: oldList.concat(newList),
				});
			})
			.catch((e) => {
				console.log(e);
			});    
	}
	render() {
		const { route, navigation } = this.props;
		const { list, total, pageNo } = this.state;
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Longlist
					ref={(c) => {
						this._longlist = c;
					}}
					total={total}
					data={list}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								activeOpacity={0.5}
								style={styles.content_body}
								onPress={() => {
									navigation.navigate('WebViewScreen', {
										uri: item.link,
										title: "最热",
									});
								}}>
								<Image
									style={{ width: 50, height: 50, borderRadius: 25 }}
									source={{
										uri: item.avatar,
									}}
								/>
								<Text
									style={{
										color: variables.mtdGrayColors,
										fontWeight: 'normal',
										lineHeight: 20,
										marginVertical: 10,
									}}>
									{item.text}
								</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'flex-end',
										marginTop: 4,
									}}>
									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<Icon
											name="eye"
											color={variables.mtdGrayDark}
											size={variables.mtdFontSizeS}
										/>
										<Text
											style={{
												color: variables.mtdGrayDark,
												fontWeight: '400',
												lineHeight: 18,
												fontSize: variables.mtdFontSizeS,
												marginHorizontal: 2,
											}}>
											{item.visits}
										</Text>

									</View>
									<View style={{ flexDirection: "row", alignItems: "center", marginLeft: 6 }}>
										<Icon
											name="clock-o"
											color={variables.mtdGrayDark}
											size={variables.mtdFontSizeS}
										/>
										<Text
											style={{
												color: variables.mtdGrayDark,
												fontWeight: '400',
												lineHeight: 18,
												fontSize: variables.mtdFontSizeS,
												marginHorizontal: 2,
											}}>
											{item.time}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						);
					}}
					onEndReached={() => {
						return this.refreshState();
					}}
					onRefresh={() => {
						return this.refreshState(1);
					}}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	content_body: {
		marginBottom: 12,
		paddingVertical: 20,
		paddingHorizontal: variables.mtdHSpacingXL,
		backgroundColor: '#fff',
	},
});
export default HotIndexPage;
