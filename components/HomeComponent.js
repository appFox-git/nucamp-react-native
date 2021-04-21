import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';

const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    promotions: state.promotions,
    partners: state.partners,
  };
};

function RenderItem(props) {
  const { item } = props;

  if (props.isLoading) {
    return <Loading />;
  }

  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }

  if (item) {
    return (
      <Card featuredTitle={item.name} image={{ uri: baseUrl + item.image }}>
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  }
  return <View />;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleValue: new Animated.Value(0),
    };
  }

  animate() {
    // call Animated's timing method and pass 2 arguments,
    // 1st is the name of variable we want to change
    // 2nd argument contains final value to reach (1 = 100%)
    // duration is time to perform animation (1500ms)
    // useNativeDriver sends everything about the animation to
    // native prior to starting.
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  componentDidMount() {
    this.animate();
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <ScrollView>
        <Animatable.View animation='fadeInRightBig' duration={500}>
          <RenderItem
            item={
              this.props.campsites.campsites.filter(
                campsite => campsite.featured
              )[0]
            }
            isLoading={this.props.campsites.isLoading}
            errMess={this.props.campsites.errMess}
          />
        </Animatable.View>
        <Animatable.View animation='fadeInLeftBig' duration={500}>
          <RenderItem
            item={
              this.props.promotions.promotions.filter(
                promotion => promotion.featured
              )[0]
            }
            isLoading={this.props.promotions.isLoading}
            errMess={this.props.promotions.errMess}
          />
        </Animatable.View>
        <Animatable.View animation='fadeInRightBig' duration={500}>
          <RenderItem
            item={
              this.props.partners.partners.filter(
                partner => partner.featured
              )[0]
            }
            isLoading={this.props.partners.isLoading}
            errMess={this.props.partners.errMess}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
