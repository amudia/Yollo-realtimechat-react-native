import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Button} from 'react-native-paper';
const styles = StyleSheet.create({
  root: {backgroundColor: '#fff', flex: 1},
  wrapcard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
    borderColor: '#eee',
  },
  btnlogin: {borderColor: '#757EE3', backgroundColor: '#757EE3', marginTop: 20},
  inputstyle: {borderBottomWidth: 1},
});

class AddFriendOriginal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.wrapcard}>
          <TextInput
            keyboardType="email-address"
            placeholder="Add Friend .."
            style={styles.inputstyle}
          />
          <Button
            mode="outlined"
            color="#fff"
            loading={this.state.isLoading}
            style={styles.btnlogin}
            // onPress={event => this.onSubmit(event)}>
          >
            ADD FRIEND
          </Button>
        </View>
      </View>
    );
  }
}
const AddFriend = withNavigation(AddFriendOriginal);
export default AddFriend;
