/* eslint-disable no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
} from 'react-native';

import globalStyles from '../styles/Global';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={globalStyles.container}>

        <View style={[globalStyles.header, styles.header]}>
          <Text style={styles.headerTitle}>Welcome </Text>
          <Text style={styles.headerTitle}>Qwixx</Text>
        </View>

            <View style={styles.ButtonLayout}>
                     <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('TwoPlayers')}>
                        <Text style={styles.buttonText}>2 Players</Text>
                    </TouchableOpacity>
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
    // width: '75%', // add this line to make the button take up full width of container
    textAlign: 'center',
    padding: 10,
    marginTop: 15,
    margin:70,
    marginBottom: 15,
  },
ButtonLayout:{
    // alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 180,
},
});
