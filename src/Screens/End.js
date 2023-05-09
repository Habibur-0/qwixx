import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import globalStyles from '../styles/Global';

export default class EndScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: '',
    };
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={globalStyles.container1}>

        <View style={[globalStyles.header, styles.header]}>
          <Text style={styles.headerTitle}>Game Over</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>The winner is: {this.state.winner}</Text>
        </View>

        <View style={styles.ButtonLayout}>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Welcome')}>
            <Text style={styles.buttonText}>Play Again</Text>
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
  text: {
    fontWeight: 'bold',
    fontSize: 30,
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
