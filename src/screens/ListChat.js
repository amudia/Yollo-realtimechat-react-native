import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar, FlatList, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../components/ListChat/Header';

const contact = [
  {
    id: 1,
    name: 'User 1',
    chat: 'Hello',
  },
  {
    id: 2,
    name: 'User 2',
    chat: 'Hi',
  },
  {
    id: 3,
    name: 'User 3',
    chat: 'Bonjour',
  },
  {
    id: 4,
    name: 'User 4',
    chat: 'Namaste',
  },
  {
    id: 5,
    name: 'User 5',
    chat: 'Ni Hao',
  },
];
class ListChat extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <Header />
          <View>
            <FlatList
              data={contact}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ChatDetail')}>
                  <View style={styles.listChat}>
                    <View style={styles.profilePic}>
                      <Image
                        source={require('../assets/img/profile.jpg')}
                        style={styles.imguser}
                      />
                    </View>
                    <View style={styles.wrapchat}>
                      <Text style={styles.personName}>{item.name}</Text>
                      <Text style={styles.personChat}>{item.chat}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff'},
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
  personChat: {
    color: '#1f1f1f',
  },
});

export default ListChat;
