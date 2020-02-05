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
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {Spinner} from 'native-base';

class ListChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true,
      userList: [],
      uid: '',
    };
  }
  componentDidMount = async () => {
    const uid = await AsyncStorage.getItem('userid');
    this.setState({uid: uid, refreshing: true});
    await firebase
      .database()
      .ref('/user')
      .on('child_added', data => {
        let person = data.val();
        // eslint-disable-next-line eqeqeq
        if (person.id != uid) {
          this.setState(prevData => {
            return {userList: [...prevData.userList, person]};
          });
          this.setState({refreshing: false});
        }
      });
  };

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('ChatDetail', {item})}
      onLongPress={() =>
        this.props.navigation.navigate('ProfileFriend', {item})
      }>
      <ListItem
        title={item.name}
        titleStyle={styles.personName}
        subtitle={item.email}
        subtitleStyle={styles.email}
        leftAvatar={{
          source: item.photo && {uri: item.photo},
        }}
        bottomDivider
        // eslint-disable-next-line eqeqeq
        badge={item.status == 'Online'}
        onPress={() => this.props.navigation.navigate('ChatDetail', {item})}
        onLongPress={() =>
          this.props.navigation.navigate('ProfileFriend', {item})
        }
      />
    </TouchableOpacity>
  );
  // keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <Header />
          <View>
            {this.state.userList.length < 1 && <Spinner />}
            <FlatList
              data={this.state.userList}
              onRefresh={() => console.log('refresh')}
              refreshing={this.state.refreshing}
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
