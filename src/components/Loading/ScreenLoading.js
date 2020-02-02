import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Header, Content, View, Spinner} from 'native-base';

class ScreenLoading extends Component {
  render() {
    return (
      <Container>
        <Header transparent  />
        <Content padder>
          <View
            style={{
              marginTop: 200,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:"rgba(0,0,0,0):transparent"
            }}>
            <Spinner />
          </View>
        </Content>
      </Container>
    );
  }
}

export default ScreenLoading;
