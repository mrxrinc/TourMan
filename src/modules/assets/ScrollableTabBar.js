const React = require('react');
const ReactNative = require('react-native');
const createReactClass = require('create-react-class');
const {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback
} = ReactNative;
import r from '../styles/Rinc';

const TabBar = createReactClass({
  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    return <TouchableWithoutFeedback
      style={styles.flexOne}
      key={name}
      onPress={() => onPressHandler(page)}>
      <View style={styles.tab}>
        <Text style={[r.bold,{color: textColor, fontSize: 12}]}>
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>;
  },

  render() {
    const containerWidth = 180;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      bottom: 1,
      alignSelf: 'center'
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ]
    });
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View style={[tabUnderlineStyle, { transform:[{translateX: left}] }]} />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1,
  },
  tabs: {
    height: 30,
    width: 180,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-end'
  },
});

module.exports = TabBar;
