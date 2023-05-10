// Imports the necessary components and styles needed for a React Native screen.
import React, { Component } from 'react';
import {
   Text, View, TouchableOpacity, Animated,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faLock, faDice, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { CheckBox } from 'react-native-elements';

import globalStyles from '../styles/Global';

//Color values for the 4 players' colors are defined as constants.
const colors = {
  red: '#D82E3F',
  yellow: '#f7d511',
  green: '#28CC2D',
  blue: '#3581D8',
};

class AnimatedDice extends Component {
  //Initializes state variables for managing dice animation and roll value.
  state = {
    rotation: new Animated.Value(0),
    value: 'roll',
    rolled: false,
  };

  // This function animates the dice roll by using the Animated API to change the rotation of the dice
  animateDice = () => {
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // generates a random number between 1 and 6 and updates the value of the dice
      const value = Math.floor(Math.random() * 6) + 1;
      this.setState({ value });
      this.state.rotation.setValue(0);
    });
  };

  // Sets the colour of the dice
  // The style object is selected from an array of dice color styles
  getDiceColor = () => {
    const { index } = this.props;
    const diceColors = [
      globalStyles.redDice,
      globalStyles.yellowDice,
      globalStyles.greenDice,
      globalStyles.blueDice,
      globalStyles.whiteDice,
      globalStyles.whiteDice,
    ];
    return diceColors[index] || {};
  };

  render() {
    const { rotation, value } = this.state;
    // Creates a style object for the Animated.View component that represents the dice. 
    const animatedStyle = {
      transform: [
        {
          rotate: this.state.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'], // rotates the dice in a full circle
          }),
        },
      ],
    };
    return (
      //loads the dice 
      <TouchableOpacity style={[globalStyles.dice, this.getDiceColor()]} onPress={this.animateDice}>
        <Animated.View style={[animatedStyle]}>
          {/*loades images as the dice */}
          <FontAwesomeIcon icon={faDice} size={30} color="#000" />
        </Animated.View>
        <Text style={globalStyles.value}>{value}</Text>
      </TouchableOpacity>
    );
  }
}

class DiceRow extends Component {
  // Constructor that creates an array of six references for the dice.
  constructor(props) {
    super(props);
    this.diceRefs = Array(6).fill(0).map(() => React.createRef());
  }

  //rolls all 6 dice at once 
  rollAll = () => {
    this.diceRefs.forEach((diceRef) => {
      diceRef.current.animateDice();
    });
  };

  render() {
    return (
      <View style={globalStyles.diceRow}>
        {/* loads all 6 dice and the rollall button into the screen */}
        {[...Array(6)].map((_, i) => (
          <AnimatedDice key={i} index={i} ref={this.diceRefs[i]} />
        ))}
        {/* created the format of the roll all button */}
        <TouchableOpacity style={[globalStyles.dice, { backgroundColor: 'black' }]} onPress={this.rollAll}>
          <Text style={[globalStyles.rollAllButtonText, { color: 'white' }]}>Roll All</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default class QwixxBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //sets up the rows with the required variables
      rows: [
        { color: 'red', selectedNumbers: [], redCount: 0 },
        { color: 'yellow', selectedNumbers: [], yellowCount: 0 },
        { color: 'green', selectedNumbers: [], greenCount: 0 },
        { color: 'blue', selectedNumbers: [], blueCount: 0 },
      ],
      //keeps track of moves 
      moves: 0,
      selectedCount: 0,
      //loads the player score and lockStatuses from the preious screens or sets to default values
      playerScores: this.props.route.params?.playerScores || [0, 0, 0, 0, 0],
      lockStatuses: this.props.route.params?.lockStatuses || [false, false, false, false],
    };
  }

  //adds a listener to detect when the component comes into focus and triggers the Pass() function  
  componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        this.Pass();
      });
    }

  // It unsubscribes the component from any listeners or observers it has subscribed to in order to prevent memory leaks.
  componentWillUnmount() {
    this.unsubscribe();
  }

  //checks to see if the passed in locks from the previous screen were set to true or false
  Pass = () => {
    for (let i = 0; i < this.state.lockStatuses.length; i++) {
      if (this.state.lockStatuses[i]) {
        //will highlight the entire row if the lock was true 
        this.passLockStatus(12, i);
      }
    }
  };

  //will highlight the numbers to the left of the one clciked 
  handleNumberPress = (number, rowIndex) => {
    // will only allow 6 clicks per turn 
    if (this.state.selectedCount >= 6) {
      return;
    }

    this.setState((prevState) => {
      const { rows, selectedCount } = prevState;
      const newRows = [...rows];
      const { selectedNumbers, color } = newRows[rowIndex];
      selectedNumbers.push(number);
      // Highlight numbers to the left in a different color
      for (let i = 0; i < number - 2; i++) {
        selectedNumbers.push(i + 2);
      }

      const newSelectedCount = selectedCount + 1;
      // Update count for red, yellow, green, blue
      newRows[rowIndex][`${color}Count`] += 1;

      return { rows: newRows, selectedCount: newSelectedCount };
    });
  };

  //when a lock is clicked it will highlight the entire row 
  handleLockPress = (number, rowIndex) => {
    this.setState((prevState) => {
      const { rows } = prevState;
      const newRows = [...rows];
      const { color } = newRows[rowIndex];

      //it will only execute if the amount selected is above 6 
      if (newRows[rowIndex][`${color}Count`] < 6) {
        return;
      }
      newRows[rowIndex].selectedNumbers.push(number);
      // Highlight numbers to the left in a different color
      for (let i = 0; i < number - 2; i++) {
        newRows[rowIndex].selectedNumbers.push(i + 2);
      }
      return { rows: newRows };
    });
  };

    //when a lock is clicked it will highlight the entire row 
  passLockStatus = (number, rowIndex) => {
    this.setState((prevState) => {
      const { rows } = prevState;
      const newRows = [...rows];

      newRows[rowIndex].selectedNumbers.push(number);
      // Highlight numbers to the left in a different color
      for (let i = 0; i < number - 2; i++) {
        newRows[rowIndex].selectedNumbers.push(i + 2);
      }
      return { rows: newRows };
    });
  };

  //It takes in the score for a row and will return the corrosponding score accordiing to the game rules 
  handleScore = (score) => {
    const scoreValues = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
    return scoreValues[score];
  };

  //hadles the check boxes on the screen
  handleCheckBoxes = () => {
    const checkboxes = [this.state.checkbox1, this.state.checkbox2, this.state.checkbox3, this.state.checkbox4];
    let totalCheckScore = 0;

    //everytime one is clciked it will minus 5 from the total score 
    checkboxes.forEach((checked) => {
      if (checked) {
        totalCheckScore -= 5;
      }
    });
    return totalCheckScore;
  };

  // This function checks whether a specific number is already selected in a given row of the game board
  isNumberSelected = (number, rowIndex) => this.state.rows[rowIndex].selectedNumbers.includes(number);

  handleEndTurn = () => {
    const { navigation } = this.props;
    // Add 6 moves and reset selected count
    this.setState((prevState) => ({ selectedCount: 0, moves: prevState.moves + 6 }));

    // Construct an array of lock statuses for each row
    this.state.lockStatuses = this.state.rows.map((row) => row.selectedNumbers.includes(12));

    // Check if there are 2 or more 'true' values in lockStatuses, or if all 4 checkboxes have been selected
    if (this.state.lockStatuses.filter((status) => status === true).length >= 2
        || (this.state.checkbox1 && this.state.checkbox2 && this.state.checkbox3 && this.state.checkbox4)) {
      //navigates to the end screen with the final players scores
      navigation.navigate('End', { playerScores: this.state.playerScores });
    } else {
      //navigates to the next player with the final scores
      navigation.navigate('Player4', { playerScores: this.state.playerScores, lockStatuses: this.state.lockStatuses });
    }
  };

  render() {
    const { rows } = this.state;
    //calculates the scores for each row
    const redScore = this.handleScore(rows[0].redCount);
    const yellowScore = this.handleScore(rows[1].yellowCount);
    const greenScore = this.handleScore(rows[2].greenCount);
    const blueScore = this.handleScore(rows[3].blueCount);
    const checkScore = this.handleCheckBoxes();
    //calcualtes the total score and sets it 
    const totalScore = redScore + yellowScore + greenScore + blueScore + checkScore;
    this.state.playerScores[2] = totalScore;

    return (
      <View style={globalStyles.container}>
        {this.state.rows.map((row, index) => (
          <View key={index} style={[globalStyles.row, globalStyles[`${row.color}Row`]]}>
            {/* loads 11 numbers that go accross the screen */}
            {[...Array(11)].map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  globalStyles.number,
                  { backgroundColor: this.isNumberSelected(i + 2, index) ? '#fff' : colors[row.color] },
                ]}
                onPress={() => this.handleNumberPress(i + 2, index)}
                disabled={this.state.selectedCount >= 6 && !this.isNumberSelected(i + 2, index)}
              >
                <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>{row.color === 'red' || row.color === 'yellow' ? i + 2 : 12 - i}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={[globalStyles.number, { backgroundColor: colors[row.color] }]} />

            {/* loads the lock icon within a touchable opacity to make it a button */}
            <TouchableOpacity style={globalStyles.lockIcon} onPress={() => this.handleLockPress(12, index)}>
              <FontAwesomeIcon icon={faLock} color="#000" size={60} />
            </TouchableOpacity>
          </View>
        ))}
        <View style={globalStyles.buttonRow}>
          <TouchableOpacity style={globalStyles.endTurnButton} onPress={this.handleEndTurn}>
            <Text style={globalStyles.endTurnButtonText}>End Turn</Text>
          </TouchableOpacity>

          <Text style={globalStyles.score}>{totalScore}</Text>

          <DiceRow />

          {/* loads all 4 check boxes  */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <CheckBox
              checked={this.state.checkbox1}
              // checks to see if it has already been clciked before proceeding
              onPress={() => this.setState({ checkbox1: this.state.checkbox1 ? true : !this.state.checkbox1 })}
              checkedColor="#000"
              uncheckedColor="#000"
              //if clicked it will change to a 'x' icon 
              checkedIcon={<FontAwesomeIcon icon={faTimes} size={18} color="#000" />}
              containerStyle={{ marginHorizontal: 0, padding: 0 }}
            />
            <CheckBox
              checked={this.state.checkbox2}
              // checks to see if it has already been clciked before proceeding
              onPress={() => this.setState({ checkbox2: this.state.checkbox2 ? true : !this.state.checkbox2 })}
              checkedColor="#000"
              uncheckedColor="#000"
              //if clicked it will change to a 'x' icon 
              checkedIcon={<FontAwesomeIcon icon={faTimes} size={18} color="#000" />}
              containerStyle={{ marginHorizontal: 0, padding: 0 }}
            />
            <CheckBox
              checked={this.state.checkbox3}
              // checks to see if it has already been clciked before proceeding
              onPress={() => this.setState({ checkbox3: this.state.checkbox3 ? true : !this.state.checkbox3 })}
              checkedColor="#000"
              uncheckedColor="#000"
              //if clicked it will change to a 'x' icon
              checkedIcon={<FontAwesomeIcon icon={faTimes} size={18} color="#000" />}
              containerStyle={{ marginHorizontal: 0, padding: 0 }}
            />
            <CheckBox
              checked={this.state.checkbox4}
              // checks to see if it has already been clciked before proceeding
              onPress={() => this.setState({ checkbox4: this.state.checkbox4 ? true : !this.state.checkbox4 })}
              checkedColor="#000"
              uncheckedColor="#000"
              //if clicked it will change to a 'x' icon
              checkedIcon={<FontAwesomeIcon icon={faTimes} size={18} color="#000" />}
              containerStyle={{ marginHorizontal: 0, padding: 0 }}
            />
          </View>
        </View>
      </View>
    );
  }
}
