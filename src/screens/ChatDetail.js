import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {Left, Right} from 'native-base';
import {withNavigation} from 'react-navigation';
// import {GiftedChat} from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {GiftedChat, Send, Bubble, Composer} from 'react-native-gifted-chat';

class ChatDetailOriginal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageList: [],
      person: this.props.navigation.getParam('item'),
      userId: AsyncStorage.getItem('userid'),
      userName: AsyncStorage.getItem('user.name'),
      userAvatar: AsyncStorage.getItem('user.photo'),
    };
  }
  onSend = async () => {
    if (this.state.message.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.userId)
        .child(this.state.person.id)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.message,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.userId,
          name: this.state.userName,
          avatar: this.state.userAvatar,
        },
      };
      updates[
        'messages/' +
          this.state.userId +
          '/' +
          this.state.person.id +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.person.id +
          '/' +
          this.state.userId +
          '/' +
          msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({message: ''});
    }
  };

  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userName = await AsyncStorage.getItem('user.name');
    const userAvatar = await AsyncStorage.getItem('user.photo');
    this.setState({userId, userName, userAvatar});
    firebase
      .database()
      .ref('messages')
      .child(this.state.userId)
      .child(this.state.person.id)
      .on('child_added', val => {
        this.setState(previousState => ({
          messageList: GiftedChat.append(previousState.messageList, val.val()),
        }));
      });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#757EE3',
          },
        }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View
          style={{
            marginRight: 15,
            width: 35,
            height: 35,
          }}>
          <Icon name="send" size={20} color="#847FE5" />
        </View>
      </Send>
    );
  }
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <View style={styles.wrapheader}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1.5, y: 0}}
              colors={['#757EE3', '#A972F4']}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Left style={styles.leftico}>
                    <Icon name="arrow-left-circle" size={24} color="#fff" />
                  </Left>
                </TouchableOpacity>
                <View style={styles.wraptextheader}>
                  <TouchableOpacity>
                    <View style={styles.wrapimg}>
                      <Image
                        source={{
                          uri: this.state.person.photo,
                        }}
                        style={styles.img}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.textheader}>
                    {this.state.person.name}
                  </Text>
                </View>
                <Right style={styles.rightico}>
                  <Text />
                </Right>
              </View>
            </LinearGradient>
          </View>

          <GiftedChat
            renderSend={this.renderSend}
            renderBubble={this.renderBubble}
            text={this.state.message}
            onInputTextChanged={val => {
              this.setState({message: val});
            }}
            messages={this.state.messageList}
            onSend={() => this.onSend()}
            user={{
              _id: this.state.userId,
            }}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff'},
  wrapheader: {marginBottom: 10, elevation: 5},
  header: {
    height: 55,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  wraptextheader: {
    alignItems: 'center',
    paddingLeft: 15,
    width: '70%',
    flexDirection: 'row',
  },
  textheader: {color: '#fff', fontSize: 16, paddingLeft: 15},
  rightico: {
    alignItems: 'flex-end',
    paddingRight: 30,
  },
  leftico: {paddingLeft: 20, alignItems: 'center', justifyContent: 'center'},
  wrapimg: {
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {width: 40, height: 40, borderRadius: 50},
  wrapmsg: {
    marginLeft: 10,
    width: 'auto',
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginVertical: 10,
    elevation: 3,
    marginRight: '20%',
  },
  msg: {
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 12,
    padding: 10,
  },
  textmsg: {color: '#000'},
  wrapincomingmsg: {
    marginRight: 10,
    width: 'auto',
    borderRadius: 12,
    alignSelf: 'flex-end',
    marginVertical: 10,
    elevation: 5,
    marginLeft: '20%',
  },
  incomingmsg: {
    justifyContent: 'center',
    padding: 10,
  },
  textincomingmsg: {color: '#fff'},
  borderRadius: {borderRadius: 12},
  wrapcompose: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  compose: {
    backgroundColor: '#fff',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#757EE3',
    borderRadius: 12,
    paddingHorizontal: 15,
    flex: 1,
  },
  btnsend: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: '#757EE3',
    elevation: 2,
  },
});

const ChatDetail = withNavigation(ChatDetailOriginal);

export default ChatDetail;
