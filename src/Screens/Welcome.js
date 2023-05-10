// Imports the necessary components and styles needed for a React Native screen.
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

import globalStyles from '../styles/Global';

export default class WelcomeScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={globalStyles.container1}>

        {/* simple header that goes accorss the screen */}
        <View style={[globalStyles.header, styles.header]}>
          <Text style={styles.headerTitle}>Qwixx</Text>
        </View>

        {/* loads all the buttons and sets up their navigations  */}
        <View style={styles.ButtonLayout}>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('HowToPlay')}>
            <Text style={styles.buttonText}>How to Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('TwoPlayers')}>
            <Text style={styles.buttonText}>2 Players</Text>
          </TouchableOpacity>
          {/* the 'OnPress' is what hannddles the navigation accorss the pages  */}
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('ThreePlayers')}>
            <Text style={styles.buttonText}>3 Players</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('FourPlayers')}>
            <Text style={styles.buttonText}>4 Players</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('FivePlayers')}>
            <Text style={styles.buttonText}>5 Players</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  Button: {
    borderColor: 'black',
    borderWidth: 0,
    borderRadius: 25,
    backgroundColor: '#63CAD8',
    textAlign: 'center',
    padding: 10,
    marginTop: 15,
    margin: 70,
    marginBottom: 15,
  },
  ButtonLayout: {
    justifyContent: 'center',
    paddingTop: 180,
  },
});
