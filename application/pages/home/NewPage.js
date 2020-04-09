/**
 * @ Author: zhenghui
 * @ Create Time: 2020-04-01 10:55:08
 * @ Modified by: zhenghui
 * @ Modified time: 2020-04-09 16:41:43
 * @ Description:
 */

import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Longlist} from 'beeshell/dist/components/Longlist';
import axios from '../../request/http';
import variables from '../../common/style/index';
import SwiperComponent from "../../component/Swiper";
class NewsIndexPage extends React.Component {

  componentDidMount() {
    this.refreshState(1);
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
    const {pageNo} = params;

    return new Promise((resolve) => {
      axios.get('lyrics/getlyrics', {
        pageNum: pageNo,
      }).then((data) => {
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
        const {list, total} = resData;
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
    const {route, navigation} = this.props;

    console.log(navigation, 'navigationnavigationnavigation');
    const {list, total, pageNo} = this.state;
    return (
      <View style={{flex: 1}}>
        <Longlist
          ref={(c) => {
            this._longlist = c;
          }}
          total={total}
          data={list}
          renderItem={({item, index}) => {
            return (
              <View style={styles.content_body}>
                <Text
                  style={{
                    color: variables.mtdGrayColors,
                    fontWeight: 'normal',
                    lineHeight: 20,
                  }}>
                  {item.content}
                </Text>
                <Text
                  style={{
                    color: variables.mtdGrayDark,
                    fontWeight: 'normal',
                    marginVertical: 10,
                    textAlign: 'right',
                    fontSize: variables.mtdFontSizeL,
                  }}>
                  — {item.source}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: 4,
                  }}>
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
                  <Icon
                    name="clock-o"
                    color={variables.mtdGrayDark}
                    size={variables.mtdFontSizeS}
                  />
                </View>
              </View>
            );
          }}
          onEndReached={() => {
            return this.refreshState();
          }}
          onRefresh={() => {
            return this.refreshState(1);
          }}
          ListHeaderComponent={() => {
            return (
              <View style={{height: 200}}>
                <SwiperComponent/>
              </View>
            )
          }}
        />
      </View>
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
export default NewsIndexPage;
