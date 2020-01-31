import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/ListChat/Header';
import {ListItem} from 'react-native-elements';

const contact = [
  {
    id: 1,
    name: 'User 1',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',

    chat: 'Hello',
    badge: '5',
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

  {
    id: 6,
    name: 'User 3',
    chat: 'Bonjour',
  },
  {
    id: 7,
    name: 'User 4',
    chat: 'Namaste',
  },
  {
    id: 8,
    name: 'User 5',
    chat: 'Ni Hao',
  },
];

class ListChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('ChatDetail')}>
      <ListItem
        title={item.name}
        titleStyle={styles.personName}
        subtitle={item.chat}
        subtitleStyle={styles.personChat}
        leftAvatar={{
          source: item.avatar_url && {uri: item.avatar_url},
          title: item.name[0],
        }}
        bottomDivider
        badge={{
          value: item.badge,
          status: 'success',
        }}
        onPress={() => this.props.navigation.navigate('ChatDetail')}
      />
    </TouchableOpacity>
  );
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
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </View>
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
  personChat: {
    color: '#585c5e',
  },
});

export default ListChat;
