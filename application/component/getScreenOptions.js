import {TransitionPresets} from '@react-navigation/stack';

const getScreenOptions = () => {
  return {
    headerStyle: {
      backgroundColor: '#f4511e',
    }, // 一个应用于 header 的最外层 View 的 样式对象
    headerTintColor: '#fff', // 返回按钮和标题都使用这个属性作为它们的颜色
    headerTitleStyle: {
      fontWeight: 'bold',
    },

    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    cardStyle: {
      flex: 1,
      backgroundColor: '#fff',
    },
    ...TransitionPresets.DefaultTransition,
  };
};

export default getScreenOptions;
