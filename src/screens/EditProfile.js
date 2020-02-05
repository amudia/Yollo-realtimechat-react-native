import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Alert} from 'react-native';
import Header from '../components/EditProfile/Header';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput, Button} from 'react-native-paper';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: '',
      phone: '',
    };
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount() {
    const id = firebase.auth().currentUser.uid;
    const db = firebase.database().ref('user/' + id);
    db.once('value').then(data => {
      const item = data.val();
      this.setState({
        name: item.name,
        phone: item.phone,
      });
    });
  }
  handleEdit = () => {
    const {name, phone} = this.state;
    this.setState({
      isLoading: true,
    });
    if (!name) {
      // eslint-disable-next-line no-alert
      alert('Semua isi form harus di isi');
    } else {
      const id = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref('user/' + id)
        .update({
          name,
          phone,
        })
        .then(data => {
          AsyncStorage.setItem('user.name', name);
          AsyncStorage.setItem('user.phone', phone);
          Alert.alert(
            'Succes!',
            'Your data changed!',
            [
              {
                text: 'OK',
                onPress: () => this.props.navigation.push('Profile'),
              },
            ],
            {cancelable: false},
          );
        })
        .catch(error => {
          //error callback
          // eslint-disable-next-line no-alert
          alert(error);
          console.log('error ', error);
        });
    }
  };

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <Header />
          <View>
            <View style={styles.wrapitems}>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                label="Full Name"
                mode="outlined"
                style={styles.textInput}
                onChangeText={name => this.setState({name})}
                value={this.state.name}
                theme={{
                  colors: {
                    primary: '#757EE3',
                    underlineColor: 'transparent',
                  },
                }}
              />
            </View>
            <View style={styles.wrapitems}>
              <TextInput
                autoCapitalize="none"
                keyboardType="number-pad"
                label="No Hanphone"
                mode="outlined"
                style={styles.textInput}
                onChangeText={phone => this.setState({phone})}
                value={this.state.phone}
                theme={{
                  colors: {
                    primary: '#757EE3',
                    underlineColor: 'transparent',
                  },
                }}
              />
            </View>
            <Button
              mode="outlined"
              color="#fff"
              loading={this.state.isLoading}
              disabled={this.state.isLoading}
              style={styles.btnlogin}
              onPress={this.handleEdit}>
              SAVE
            </Button>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff'},
  wrapimgprofile: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  wrapimgprofile1: {
    height: 150,
    width: 150,
    backgroundColor: '#eee',
    borderRadius: 100,
  },
  imgprofile: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  wrapcamera: {position: 'absolute', top: 80, left: 110},
  wrapcamera1: {
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: '#847FE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapitems: {
    alignItems: 'center',
    marginVertical: 0,
    marginHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 0,
    paddingBottom: 10,
    borderColor: '#eee',
  },
  wrapitems2: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    paddingBottom: 10,
    borderColor: '#eee',
  },
  wrapitems1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#eee',
  },
  textitems: {paddingLeft: 20, color: '#4a675a'},
  textitems1: {paddingLeft: 10, color: 'blue', fontWeight: 'bold'},
  textInput: {
    backgroundColor: '#FFF',
    height: 45,
    width: '100%',
    marginTop: 20,
    color: '#eee',
    marginBottom: 5,
    fontSize: 12,
  },
  btnlogin: {
    borderColor: '#757EE3',
    backgroundColor: '#757EE3',
    marginTop: 20,
    marginHorizontal: 40,
  },
});

export default EditProfile;
