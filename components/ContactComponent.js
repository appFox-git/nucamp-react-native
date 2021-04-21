import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {
  address = '1 Nucamp Way\nSeattle, WA 98001\nU.S.A.';
  phone = '1-206-555-1234';
  email = 'campsites@nucamps.co';

  // configure text for DirectoryNavigatorScreen title
  static navigationOptions = {
    title: 'Contact Us',
  };

  render() {
    return (
      <ScrollView>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <Card title={'Contact Information'} wrapperStyle={{ margin: 20 }}>
            <Text style={{ marginBottom: 10 }}>{this.address}</Text>
            <Text>Phone: {this.phone}</Text>
            <Text>Email: {this.email}</Text>
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Contact;
