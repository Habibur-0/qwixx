// Imports the necessary components and styles needed for a React Native screen.
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, FlatList
} from 'react-native';

import globalStyles from '../styles/Global';

//loads the images and adds a comment to each one 
const data = [
  { id: '1', image: require('../Images/Objective.jpg'), text: 'Score the most points by crossing out as many numbers in the four colour-rows as possible while avoiding penalty points.' },
  { id: '2', image: require('../Images/GamePlay.jpg'), text: 'The first player to roll a 6 takes on the role of "active player". The active player rolls all six dice. The following two actions are now carried out in order, always one after the other:' },
  { id: '3', image: require('../Images/Dice.jpg'), text: 'The active player adds up the two white dice and announces out loud, theresulting sum.All players may then (but are not required to) cross out the number that the active player announced in any (but only one) of the color-rows.' },
  { id: '4', image: require('../Images/Dice2.jpg'), text: 'The active player (but not the others) may then (but is not required to) add one of the white dice together with any one (and only one) of the coloured dice and cross out the number corresponding to this sum in the colour row corresponding to the colour of the chosen die.' },
  { id: '5', image: require('../Images/Penalty.jpg'), text: 'If, after the two actions, the active player doesnt cross out at least one number, he must cross out one of the penalty boxes. Each penalty box is worth 75 points at the end of the game. (The non-active players do not take a penalty if they choose not to cross out a number).' },
  { id: '6', image: require('../Images/Lock.jpg'), text: 'If you wish to cross out the number at the extreme right end of a colour-row (red 1 2, yellow 1 2, green 2, blue 2) you must have first crossed out at least five numbers in that row. If you cross out the number on the extreme right, then also cross off the lock symbol directly next to it. This indicates that the colour-row is now locked for all players and numbers of this colour cannot be crossed out in future rounds.' },
  { id: '7', image: require('../Images/End.jpg'), text: 'The game ends immediately as soon as either someone has crossed out his fourth penalty box or as soon as two dice have been removed from the game (two colourrows have been locked).' },

];

export default class WelcomeScreen extends Component {
  //This function defines how to render each item in a list.
  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.image} source={item.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  )
  

  render() {
    const { navigation } = this.props;
    return (
      <View style={globalStyles.container1}>

        {/* simple header that goes accross the screen */}
        <View style={[globalStyles.header, styles.header]}>
          <Text style={styles.headerTitle}>How to play </Text>
        </View>

        {/* FlatList displays data with renderItem and unique keys using the style prop. */}
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />

        {/* simplete button to go back to the welcome screen */}
        <View style={styles.ButtonLayout}>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Back</Text>
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
    margin:70,
    marginBottom: 15,
  },
  ButtonLayout:{
    justifyContent: 'center',
    paddingTop: 20,
  },
  flatList: {
    flex:1,
    padding: 10,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  image: {
    width: 375,
    height: 75,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
