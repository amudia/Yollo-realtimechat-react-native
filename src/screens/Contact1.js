import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
  TextInput,
  Alert,
  Spinner,
} from 'react-native';
import {Button} from 'native-base';
import Header from '../components/Contact/Header';
import Icon from 'react-native-vector-icons/Feather';
import {ListItem} from 'react-native-elements';
import {db, setData, pushData, setListener, users} from '../utils/initialize';

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      modalVisible: false,
      isAuth: null,
      uid: null,
      email: null,
      fullname: null,
      friendList: [],
      modalRefresh: false,
      emailAddFriend: null,
      isLoading: false,
    };
  }

  async componentDidMount() {
    await users().onAuthStateChanged(async user => {
      if (user) {
        await this.setState({
          isAuth: true,
          uid: user.uid,
          email: user.email,
        });
        await setListener('messages/' + this.state.uid, async snapshot => {
          if (typeof snapshot.val().friendList !== 'undefined') {
            const keyFriendList = await Object.keys(snapshot.val().friendList);
            const valueFriendList = await Object.values(
              snapshot.val().friendList,
            );
            await valueFriendList.map(async (item, index) => {
              const uid = await keyFriendList[index];
              await db()
                .ref('users/' + uid)
                // eslint-disable-next-line no-shadow
                .on('value', async snapshot => {
                  await this.state.friendList.push({
                    uid: uid,
                    data: snapshot.val(),
                  });
                });
            });
          }
        });
      } else {
        await this.props.navigation.navigate('Chat');
      }
    });
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  onSubmitAddFriend = event => {
    db()
      .ref('users')
      .once('value')
      .then(async snapshot => {
        const db_users = await Object.values(snapshot.val());
        const friend = await db_users.find(
          item => item.email === this.state.emailAddFriend,
        );
        if (friend.uid !== undefined) {
          db()
            .ref('messages/' + this.state.uid)
            // eslint-disable-next-line no-shadow
            .once('value', async snapshot => {
              if (typeof snapshot.val().friendList !== 'undefined') {
                const friendList = Object.keys(snapshot.val().friendList);
                const cekFriendList = friendList.find(
                  item => item === friend.uid,
                );
                if (cekFriendList !== undefined) {
                  Alert.alert(
                    'Oops..',
                    'Ternyata anda sudah berteman.',
                    [
                      {
                        text: 'Ok',
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  await setData(
                    'messages/' + this.state.uid + '/friendList/' + friend.uid,
                    {
                      data: true,
                    },
                  );
                  await pushData(
                    'messages/' +
                      this.state.uid +
                      '/friendList/' +
                      friend.uid +
                      '/data',
                    {
                      incoming: false,
                      message: false,
                    },
                  );

                  await setData(
                    'messages/' + friend.uid + '/friendList/' + this.state.uid,
                    {
                      data: true,
                    },
                  );
                  await pushData(
                    'messages/' +
                      friend.uid +
                      '/friendList/' +
                      this.state.uid +
                      '/data',
                    {
                      incoming: true,
                      message: true,
                    },
                  );

                  Alert.alert(
                    'Success',
                    'Selamat anda sudah bisa mengobrol dengan teman yang anda tambahkan.',
                    [
                      {
                        text: 'Kembali Ke Home',
                        onPress: () =>
                          this.setModalVisible(!this.state.modalVisible),
                      },
                      {
                        text: 'Tambah Lagi',
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                }
              } else {
                await setData(
                  'messages/' + this.state.uid + '/friendList/' + friend.uid,
                  {
                    data: true,
                  },
                );
                await pushData(
                  'messages/' +
                    this.state.uid +
                    '/friendList/' +
                    friend.uid +
                    '/data',
                  {
                    incoming: false,
                    message: false,
                  },
                );

                await setData(
                  'messages/' + friend.uid + '/friendList/' + this.state.uid,
                  {
                    data: true,
                  },
                );
                await pushData(
                  'messages/' +
                    friend.uid +
                    '/friendList/' +
                    this.state.uid +
                    '/data',
                  {
                    incoming: true,
                    message: false,
                  },
                );

                Alert.alert(
                  'Success',
                  'Selamat anda sudah bisa mengobrol dengan teman yang anda tambahkan.',
                  [
                    {
                      text: 'Kembali Ke Home',
                      onPress: () =>
                        this.setModalVisible(!this.state.modalVisible),
                    },
                    {
                      text: 'Tambah Lagi',
                      style: 'cancel',
                    },
                  ],
                  {cancelable: false},
                );
              }
            });
        } else {
          Alert.alert(
            'Error',
            'Oops... sesuatu terjadi dan saya tidak mengerti...',
            [
              {
                text: 'Ok',
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(message => {
        Alert.alert(
          'Tidak Ditemukan',
          'Pengguna dengan email tersebut tidak terdaftar, Silahkan coba lagi.',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      });
  };
  keyExtractor = (item, index) => index.toString();
  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('ChatDetail')}>
      {this.state.friendList !== null ? (
        this.state.friendList.map((item, index) => {
          return (
            <ListItem
              key={index}
              title={item.data.email}
              // subtitle={item.status}
              // subtitleStyle={styles.personStatus}
              leftAvatar={{
                source: item.avatar_url && {uri: item.avatar_url},
                title: item.data.email[0],
              }}
              bottomDivider
              onPress={() => this.props.navigation.navigate('ChatDetail')}
            />
          );
        })
      ) : (
        <Text style={{color: '#000'}}>Data Kosong</Text>
      )}
    </TouchableOpacity>
  );
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <Header />
          <View>
            {this.state.isLoading && <Spinner />}
            <FlatList
              data={this.state.friendList}
              onRefresh={() => console.log('refresh')}
              refreshing={this.state.refreshing}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={styles.wrapcard}>
            <View>
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Ex: example@email.com"
                value={this.state.emailAddFriend}
                onChangeText={value =>
                  this.setState({
                    emailAddFriend: value,
                  })
                }
                style={styles.inputstyle}
              />
              <Button
                mode="outlined"
                color="#fff"
                loading={this.state.isLoading}
                style={styles.btnlogin}
                onPress={event => this.onSubmitAddFriend(event)}>
                <Text style={styles.textbtn}>ADD FRIEND</Text>
              </Button>
              <Button
                mode="outlined"
                color="#fff"
                loading={this.state.isLoading}
                style={styles.btnlogin1}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.textbtn}>CLOSE</Text>
              </Button>
            </View>
          </View>
        </Modal>
        <View style={styles.btnplus}>
          <TouchableOpacity>
            <Button
              transparent
              rounded
              iconLeft
              onPress={() => {
                this.setModalVisible(true);
              }}>
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
  wrapcard: {
    marginHorizontal: 20,
    marginTop: 150,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: '#ACB5A0',
    backgroundColor: '#fff',
  },
  inputstyle: {borderBottomWidth: 1, borderBottomColor: '#ACB5A0'},
  btnlogin: {
    borderColor: '#757EE3',
    backgroundColor: '#757EE3',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnlogin1: {
    borderColor: '#757EE3',
    backgroundColor: 'orange',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbtn: {textAlign: 'center', color: '#fff'},
});

export default Contact;
