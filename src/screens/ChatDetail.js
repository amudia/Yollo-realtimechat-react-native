import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import {Left, Right, Button} from 'native-base';
import {withNavigation} from 'react-navigation';
// import {GiftedChat} from 'react-native-gifted-chat';

class ChatDetailOriginal extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    // this.onSend = this.onSend.bind(this);
  }
  // componentWillMount() {
  //   this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: 'Hello developer',
  //         createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar:
  //             'https://github.com/amudia/fooddelivery-native/blob/master/src/assets/images/user.jpg',
  //         },
  //       },
  //     ],
  //   });
  // }
  // onSend(messages = []) {
  //   this.setState(previousState => {
  //     return {
  //       messages: GiftedChat.append(previousState.messages, messages),
  //     };
  //   });
  // }
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
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ProfileFriend')
                    }>
                    <View style={styles.wrapimg}>
                      <Image
                        source={require('../assets/img/mawareva.jpg')}
                        style={styles.img}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.textheader}>Selingkuhan</Text>
                </View>
                <Right style={styles.rightico}>
                  <Text />
                </Right>
              </View>
            </LinearGradient>
          </View>

          {/* Message */}
          <View style={styles.wrapmsg}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1.5, y: 0}}
              colors={['#fff', '#FFF']}
              style={styles.borderRadius}>
              <View style={styles.msg}>
                <Text style={styles.textmsg}>Hi</Text>
              </View>
            </LinearGradient>
          </View>

          {/* IncommingMessage */}
          <View style={styles.wrapincomingmsg}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1.5, y: 0}}
              colors={['#757EE3', '#A972F4']}
              style={styles.borderRadius}>
              <View style={styles.incomingmsg}>
                <Text style={styles.textincomingmsg}>Hi, juga</Text>
              </View>
            </LinearGradient>
          </View>

          {/* <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={{
              _id: 1,
            }}
          /> */}

          {/* Compose */}
        </View>
        <View style={styles.wrapcompose}>
          <TextInput placeholder="Message.." style={styles.compose} />
          <View style={styles.btnsend}>
            <Button transparent rounded iconLeft onPress={this.submit}>
              <IconA name="send" size={20} color="#fff" />
            </Button>
          </View>
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
    width: '70%',
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginVertical: 10,
    elevation: 3,
  },
  msg: {
    height: 45,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 12,
  },
  textmsg: {color: '#000'},
  wrapincomingmsg: {
    marginRight: 10,
    width: '70%',
    borderRadius: 12,
    alignSelf: 'flex-end',
    marginVertical: 10,
    elevation: 5,
  },
  incomingmsg: {
    height: 45,
    justifyContent: 'center',
    paddingLeft: 20,
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
