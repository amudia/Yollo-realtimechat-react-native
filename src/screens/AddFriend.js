import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';

class AddFriendOriginal extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
const AddFriend = withNavigation(AddFriendOriginal);
export default AddFriend;
