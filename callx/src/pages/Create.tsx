import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import {useHistory} from '../components/Router';
import Checkbox from '../subComponents/Checkbox';
import {gql, useMutation} from '@apollo/client';
import Logo from '../subComponents/Logo';
// import OpenInNativeButton from '../subComponents/OpenInNativeButton';
import Share from '../components/Share';
// import ColorContext from '../components/ColorContext';
// import Illustration from '../subComponents/Illustration';
// import {textInput} from '../../theme.json';
import PrimaryButton from '../atoms/PrimaryButton';
import SecondaryButton from '../atoms/SecondaryButton';
import HorizontalRule from '../atoms/HorizontalRule';
import TextInput from '../atoms/TextInput';
import Error from '../subComponents/Error';
import Toast from '../../react-native-toast-message';
import hasBrandLogo from '../utils/hasBrandLogo';
import LandingNavbar from '../components/LandingNavbar';
import ReactGA from 'react-ga';
import { FaWeight } from 'react-icons/fa';

type PasswordInput = {
  host: string;
  view: string;
};

const CREATE_CHANNEL = gql`
  mutation CreateChannel(
    $title: String!
    $backendURL: String!
    $enablePSTN: Boolean
  ) {
    createChannel(
      title: $title
      backendURL: $backendURL
      enablePSTN: $enablePSTN
    ) {
      passphrase {
        host
        view
      }
      channel
      title
      pstn {
        number
        dtmf
      }
    }
  }
`;

const Create = () => {
  // const {primaryColor} = useContext(ColorContext);
  const history = useHistory();
  const [roomTitle, onChangeRoomTitle] = useState('');
  const [pstnCheckbox, setPstnCheckbox] = useState(false);
  const [hostControlCheckbox, setHostControlCheckbox] = useState(true);
  const [urlView, setUrlView] = useState(null);
  const [urlHost, setUrlHost] = useState(null);
  const [pstn, setPstn] = useState(null);
  const [roomCreated, setRoomCreated] = useState(false);
  const [joinPhrase, setJoinPhrase] = useState(null);
  const [createChannel, {data, loading, error}] = useMutation(CREATE_CHANNEL);

  console.log('mutation data', data);

  const TRACKING_ID = "G-0Y7FB4Z3LE"; //
  ReactGA.initialize(TRACKING_ID);

  ReactGA.event({
    category: 'User',
    action: 'Page visit'
  });

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = $config.APP_NAME;
    }
  }, []);

  const createRoom = () => {
    if (roomTitle !== '') {
      console.log('Create room invoked');
      createChannel({
        variables: {
          title: roomTitle,
          backendURL: $config.BACKEND_ENDPOINT,
          enablePSTN: pstnCheckbox,
        },
      })
        .then((res: any) => {
          Toast.show({
            text1: 'Created: ' + roomTitle,
            visibilityTime: 1000,
          });
          console.log('promise data', res);
          setUrlView(res.data.createChannel.passphrase.view);
          setUrlHost(res.data.createChannel.passphrase.host);
          setPstn(res.data.createChannel.pstn);
          setJoinPhrase(res.data.createChannel.passphrase.host);
          setRoomCreated(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  let onLayout = (e: any) => {
    setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };

  return (
    // <ImageBackground
    //   style={style.full}
    //   resizeMode={'cover'}>
    // <KeyboardAvoidingView behavior={'height'} style={style.main}>
    <ScrollView contentContainerStyle={style.main}>
      <LandingNavbar/>
      <View style={style.nav}>
        {error ? <Error error={error} /> : <></>}
        {/* <OpenInNativeButton /> */}
      </View>
      {!roomCreated ? (
        <View style={style.content} onLayout={onLayout}>
          <View style={style.leftContent}>
            <Text style={style.heading}>Simple, fast and reliable conferencing</Text>
            <Text style={style.headline}>CallX provides a simple video conferencing, live chat and instant <br/> recording platform for all your meetings and events</Text>
            <View style={style.inputs}>
              <TextInput
                value={roomTitle}
                onChangeText={(text) => onChangeRoomTitle(text)}
                onSubmitEditing={() => createRoom()}
                placeholder="Name your meeting"
              />
              <View style={{paddingVertical: 10}}>
                <View style={style.checkboxHolder}>
                  {$config.EVENT_MODE ? (
                    <></>
                  ) : (
                    <>
                      <Checkbox
                        disabled={$config.EVENT_MODE}
                        value={hostControlCheckbox}
                        onValueChange={setHostControlCheckbox}
                      />
                      <Text style={style.checkboxTitle}>
                        Restrict Host Controls (Separate host link)
                      </Text>
                    </>
                  )}
                </View>
                {$config.PSTN ? (
                  <View style={style.checkboxHolder}>
                    <Checkbox
                      value={pstnCheckbox}
                      onValueChange={setPstnCheckbox}
                    />
                    <Text style={style.checkboxTitle}>
                      Use PSTN (Join by dialing a number)
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
              <PrimaryButton
                disabled={roomTitle === '' || loading}
                onPress={() => createRoom()}
                text={loading ? 'Loading...' : 'Create Meeting'}
              />
              <HorizontalRule />
              <SecondaryButton
                onPress={() => history.push('/join')}
                text={'Have a Meeting ID?'}
              />
            </View>
          </View>
          
        </View>
      ) : (
        <Share
          urlView={urlView}
          urlHost={urlHost}
          pstn={pstn}
          hostControlCheckbox={hostControlCheckbox}
          joinPhrase={joinPhrase}
          roomTitle={roomTitle}
        />
      )}
      <View style={style.footerDiv}>
            <Text>Copyright © CallX 2022</Text>
          </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  main: {
    
  },
  footerDiv: {
    backgroundColor: 'white',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: '700',
    padding: '20px',
  },
  nav: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  content: {flex: 6, flexDirection: 'row'},
  leftContent: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    marginBottom: '13%',
    marginTop: '7%',
    minHeight: 350,
    // marginRight: '5%',
    marginHorizontal: 'auto',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: $config.PRIMARY_FONT_COLOR,
    marginBottom: 20,
  },
  headline: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: $config.PRIMARY_FONT_COLOR,
    marginBottom: 40,
  },
  inputs: {
    flex: 1,
    // marginVertical: '2%',
    width: '100%',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  // textInput: textInput,
  checkboxHolder: {
    marginVertical: 0,
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 20,
    // flex: .2,
    // height: 10,
    // justifyContent: 'center',
    // alignContent: 'center',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  checkboxTitle: {
    color: $config.PRIMARY_FONT_COLOR + '60',
    paddingHorizontal: 5,
    alignSelf: 'center',
    // marginVertical: 'auto',
    // fontWeight: '700',
  },
  checkboxCaption: {
    color: $config.PRIMARY_FONT_COLOR + '60',
    paddingHorizontal: 5,
  },
  checkboxTextHolder: {
    marginVertical: 0, //check if 5
    flexDirection: 'column',
  },
  // urlTitle: {
  //   color: '#fff',
  //   fontSize: 14,
  // },
  urlHolder: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: 'center',
    maxWidth: 400,
    minHeight: 45,
  },
  // url: {
  //   color: '#fff',
  //   fontSize: 18,
  //   fontWeight: '700',
  //   textDecorationLine: 'underline',
  // },
  pstnHolder: {
    flexDirection: 'row',
    width: '80%',
  },
  pstnMargin: {
    marginRight: '10%',
  },
});

export default Create;
