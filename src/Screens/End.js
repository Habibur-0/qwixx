// Imports the necessary components and styles needed for a React Native screen.
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
      //loads in the final player scores from the player that met the end conditions 
      playerScores: this.props.route.params.playerScores // Initialize playerScores state with the prop from previous screen
    };
  }

  render() {
    const { navigation } = this.props;
    const { playerScores } = this.state;

    // Calculate the highest score and the winner
    const maxScore = Math.max(...playerScores);
    const winnerIndex = playerScores.indexOf(maxScore);
    const winner = `Player ${winnerIndex + 1}`;

    // Render the component with winner information and scores list
    return (
      <View style={globalStyles.container1}>

        {/* simple head that goes accorss the top */}
        <View style={[globalStyles.header, styles.header]}>
          <Text style={styles.headerTitle}>Game Over</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>Congratulations: {winner}</Text>
          {/* loads each players scores  */}
          {playerScores.map((score, index) => (
            <Text key={index} style={styles.text}>
              Player {index + 1}: {score}
            </Text>
          ))}
        </View>

        {/* button to go back to the welcome screen */}
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
    color:'black',
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
    paddingTop:150
  },
});
