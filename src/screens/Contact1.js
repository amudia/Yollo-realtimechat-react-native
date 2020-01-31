import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'native-base';
import Header from '../components/Contact/Header';
import Icon from 'react-native-vector-icons/Feather';

const contact = [
  {
    id: 1,
    name: 'User 1',
    status: 'Available',
  },
  {
    id: 2,
    name: 'User 2',
    status: 'Busy',
  },
  {
    id: 3,
    name: 'User 3',
    status: 'Busy',
  },
  {
    id: 4,
    name: 'User 4',
    status: 'Available',
  },
  {
    id: 5,
    name: 'User 5',
    status: 'Available',
  },
  {
    id: 6,
    name: 'User 2',
    status: 'Busy',
  },
  {
    id: 7,
    name: 'User 3',
    status: 'Busy',
  },
  {
    id: 8,
    name: 'User 4',
    status: 'Available',
  },
  {
    id: 9,
    name: 'User 5',
    status: 'Available',
  },
  {
    id: 10,
    name: 'User 4',
    status: 'Available',
  },
  {
    id: 11,
    name: 'User 5',
    status: 'Available',
  },
  {
    id: 12,
    name: 'User 4',
    status: 'Available',
  },
  {
    id: 13,
    name: 'User 5',
    status: 'Available',
  },
];
class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <Header />
          <View>
            <FlatList
              data={contact}
              onRefresh={() => console.log('refresh')}
              refreshing={this.state.refreshing}
              renderItem={({item}) => (
                <View style={styles.listChat}>
                  <View style={styles.profilePic}>
                    <Image
                      source={require('../assets/img/profile.jpg')}
                      style={styles.imguser}
                    />
                  </View>
                  <View style={styles.wrapchat}>
                    <TouchableOpacity>
                      <Text style={styles.personName}>{item.name}</Text>
                      <Text style={styles.personStatus}>{item.status}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        <View style={styles.btnplus}>
          <TouchableOpacity>
            <Button transparent rounded iconLeft onPress={this.submit}>
              <Icon name="plus" size={20} color="#fff" />
            </Button>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff', paddingBottom: 60},
  profilePic: {
    height: 50,
    width: 50,
    backgroundColor: '#4A675A',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imguser: {height: 50, width: 50, borderRadius: 50},
  listChat: {
    padding: 20,
    marginBottom: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapchat: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: '#eee',
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    height: 60,
  },
  personName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  personStatus: {
    color: '#ACB5A0',
  },
  btnplus: {
    height: 50,
    width: 50,
    backgroundColor: '#757EE3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 5,
    position: 'absolute',
    top: 630,
    left: 310,
  },
});

export default Contact;
