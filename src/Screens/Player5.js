import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { CheckBox } from 'react-native-elements';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';


import globalStyles from '../styles/Global';

const colors = {
  red: '#D82E3F',
  yellow: '#f7d511',
  green: '#28CC2D',
  blue: '#3581D8',
};

class AnimatedDice extends Component {
  state = {
    rotation: new Animated.Value(0),
    value: 'roll',
    rolled: false,
  };

  animateDice = () => {
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      const value = Math.floor(Math.random() * 6) + 1;
      this.setState({ value });
      this.state.rotation.setValue(0);
    });
  };

  getDiceColor = () => {
    const { index } = this.props;
    const diceColors = [
      globalStyles.redDice,
      globalStyles.yellowDice,
      globalStyles.greenDice,
      globalStyles.blueDice,
      globalStyles.whiteDice,
      globalStyles.whiteDice
    ];
    return diceColors[index] || {};
  };
  
  render() {
    const { rotation, value } = this.state;
    const animatedStyle = {
      transform: [
        {
          rotate: this.state.rotation.interpolate({ 
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    };
    return (
      <TouchableOpacity style={[globalStyles.dice, this.getDiceColor()]} onPress={this.animateDice}>
        <Animated.View style={[animatedStyle]}>
          <FontAwesomeIcon icon={faDice} size={30} color={'#000'} />
        </Animated.View>
        <Text style={globalStyles.value}>{value}</Text>
      </TouchableOpacity>
    );
  }
}

class DiceRow extends Component {
  constructor(props) {
    super(props);
    this.diceRefs = Array(6).fill(0).map(() => React.createRef());
  }
  
  rollAll = () => {
    this.diceRefs.forEach(diceRef => {
      diceRef.current.animateDice();
    });
  };

  render() {
    return (
      <View style={globalStyles.diceRow}>
        {[...Array(6)].map((_, i) => (
          <AnimatedDice key={i} index={i} ref={this.diceRefs[i]} />
        ))}
        <TouchableOpacity style={[globalStyles.dice, { backgroundColor: 'black' }]} onPress={this.rollAll}>
          <Text style={[globalStyles.rollAllButtonText, { color: 'white' }]}>Roll All</Text>
        </TouchableOpacity>


      </View>
    );
  }
}

export default class QwixxBoard extends Component {
  state = {
    rows: [
      { color: 'red', selectedNumbers: [], redCount: 0 },
      { color: 'yellow', selectedNumbers: [], yellowCount: 0 },
      { color: 'green', selectedNumbers: [], greenCount: 0 },
      { color: 'blue', selectedNumbers: [], blueCount: 0 },
    ],
    moves: 0,
    selectedCount: 0,
    playerScores: this.props.route.params?.playerScores || [0,0,0,0,0],
    lockStatuses: this.props.route.params?.lockStatuses || [false,false,false,false],
  };

  

  componentDidMount() {
    console.log('lockStatuses:', this.state.lockStatuses);
    for (let i = 0; i < this.state.lockStatuses.length; i++) {
      if (this.state.lockStatuses[i]) {
        this.passLockStatus(12, i);
      }
    }
  }


  
  handleNumberPress = (number, rowIndex) => {
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

  handleLockPress = (number, rowIndex) => {
    this.setState((prevState) => {
      const { rows } = prevState;
      const newRows = [...rows];
      const { color } = newRows[rowIndex];
  
      if (newRows[rowIndex][`${color}Count`] < 5) {
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
  
   handleScore = (score) => {
    const scoreValues = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
    return scoreValues[score];
  }
  

  handleCheckBoxes = () => {
    const checkboxes = [this.state.checkbox1, this.state.checkbox2, this.state.checkbox3, this.state.checkbox4];
    let totalCheckScore = 0;
    checkboxes.forEach(checked => {
      if (checked) {
        totalCheckScore -= 5;
      }
    });
    return totalCheckScore;
  }
  
  isNumberSelected = (number, rowIndex) => {
    return this.state.rows[rowIndex].selectedNumbers.includes(number);
  };

  handleEndTurn = () => {
    const { navigation } = this.props;
    // Add 2 moves and reset selected count
    this.setState((prevState) => {
      return { selectedCount: 0, moves: prevState.moves + 6 };
    });
  
    // Construct an array of lock statuses for each row
    this.state.lockStatuses = this.state.rows.map(row => row.selectedNumbers.includes(12));
    
    // Check if there are 2 or more 'true' values in lockStatuses, or if all 4 checkboxes have been selected
    if (this.state.lockStatuses.filter(status => status === true).length >= 2 || 
        (this.state.checkbox1 && this.state.checkbox2 && this.state.checkbox3 && this.state.checkbox4)) {
      navigation.navigate('End', { playerScores: this.state.playerScores });
    } else {
      navigation.navigate('Player1', { playerScores: this.state.playerScores , lockStatuses: this.state.lockStatuses });
    }
  };
  
  
  render() {
    const { rows } = this.state;
    const redScore = this.handleScore(rows[0].redCount);
    const yellowScore = this.handleScore(rows[1].yellowCount);
    const greenScore = this.handleScore(rows[2].greenCount);
    const blueScore = this.handleScore(rows[3].blueCount);
    const checkScore = this.handleCheckBoxes();
    const totalScore = redScore + yellowScore + greenScore + blueScore +checkScore;
    this.state.playerScores[4] = totalScore;
  
    return (
      <View style={globalStyles.container}>
        {this.state.rows.map((row, index) => (
          <View key={index} style={[globalStyles.row, globalStyles[`${row.color}Row`]]}>
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


            <TouchableOpacity style={[globalStyles.number, { backgroundColor: colors[row.color] }]}></TouchableOpacity>
            
              <TouchableOpacity style={globalStyles.lockIcon} onPress={() => this.handleLockPress(12, index)}>
                <FontAwesomeIcon icon={faLock} color="#000" size={60} />
              </TouchableOpacity>
          </View>
        ))}
        <View style = {globalStyles.buttonRow}>
          <TouchableOpacity style={globalStyles.endTurnButton} onPress={this.handleEndTurn}>
            <Text style={globalStyles.endTurnButtonText}>End Turn</Text>
          </TouchableOpacity>

          <Text style = {globalStyles.score}>{totalScore}</Text>

          <DiceRow />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <CheckBox
                checked={this.state.checkbox1}
                onPress={() => this.setState({ checkbox1: this.state.checkbox1 ? true : !this.state.checkbox1 })}
                checkedColor='#000'
                uncheckedColor='#000'
                checkedIcon={<FontAwesomeIcon icon={faTimes} size={18} color='#000' />}
                containerStyle={{ marginHorizontal: 0, padding: 0 }}    
              />
              <CheckBox
                checked={this.state.checkbox2}
                onPress={() => this.setState({ checkbox2: this.state.checkbox2 ? true : !this.state.checkbox2 })}
                checkedColor='#000'
                uncheckedColor='#000'
                checkedIcon={<FontAwesomeIcon icon={faTimes} size={18} color='#000' />}
                containerStyle={{ marginHorizontal: 0, padding: 0 }}
              />
              <CheckBox
                checked={this.state.checkbox3}
                onPress={() => this.setState({ checkbox3: this.state.checkbox3 ? true : !this.state.checkbox3 })}
                checkedColor='#000'
                uncheckedColor='#000'
                checkedIcon={<FontAwesomeIcon icon={faTimes} size={18} color='#000' />}
                containerStyle={{ marginHorizontal: 0, padding: 0 }}
              />
              <CheckBox
                checked={this.state.checkbox4}
                onPress={() => this.setState({ checkbox4: this.state.checkbox4 ? true : !this.state.checkbox4 })}
                checkedColor='#000'
                uncheckedColor='#000'
                checkedIcon={<FontAwesomeIcon icon={faTimes} size={18} color='#000' />}
                containerStyle={{ marginHorizontal: 0, padding: 0 }}
              />
            </View>
        </View>
      </View>
    );
  }
  
}
