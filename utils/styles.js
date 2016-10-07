import {
  StyleSheet,
} from 'react-native-responsive-styles'
import {
  Dimensions,
} from 'react-native'
const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'rgb(17, 150, 182)',
  },
  navBarTitle: {
    color: 'rgb(255,255,255)',
    fontWeight:'bold',
    fontFamily:'HelveticaNeue',
    fontSize:19, 
  },
  barButtonTextStyle: {
    color: 'rgb(0,0,0)',
  },
  barButtonIconStyle: {
    tintColor: 'rgb(255,255,255)',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    paddingTop: 65,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: 'rgb(234,251,253)',
    /*portrait: {
      backgroundColor: 'rgb(234,251,253)'
    },
    landscape: {
    backgroundColor: 'red'
    }*/
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container4: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: 'rgb(234,251,253)',
  },
  loginbutton: {
    backgroundColor: 'rgb(224, 110, 56)',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgb(224, 110, 56)',
    width: 100,
    marginTop: 20,
    alignItems: 'center',
  },
  signin: {
    fontSize: 18,
    color: '#FFF',
    margin: 4,
    fontFamily:'HelveticaNeue',
  },
  registertext: {
    fontSize: 12,
    color: '#000',
    fontFamily:'HelveticaNeue',
  },
  registerbuttontext: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'blue',
    fontFamily: 'HelveticaNeue',
  },
  registerbutton: {
    position: 'absolute', 
    right: 20,
    bottom: 0,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container3: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgb(17, 150, 182)',
    backgroundColor: 'rgb(234,251,253)',      
    width: width - 130,
    padding:6,
  },
  textColor: {
    color: '#000',
    lineHeight: 25,
    fontFamily:'HelveticaNeue',
    fontSize:15,   
  },
  text: {
    color: '#000',
    alignSelf: 'center',
    lineHeight: 25,
    fontFamily:'HelveticaNeue',
    fontSize:15,       
  },
  box: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgb(17, 150, 182)',
    width: Dimensions.get('window').height*0.15,
    height: Dimensions.get('window').height*0.15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  logo: {
    width: 28,
    height: 28,
    marginTop:4,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 10,
    bottom: 10,
    right: 10,
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: 'rgb(234,251,253)',
  },
  welcome: {
    fontSize: 20,
    color: '#000',
    marginTop: 20,
    fontFamily:'HelveticaNeue',    
  },
  contentImage: {
    width: 300,
    height: 250,
    marginTop: 30,
  },
  button: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgb(17, 150, 182)',
    padding: 5,
  },
})

export default styles
