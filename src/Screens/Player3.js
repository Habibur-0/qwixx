import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faDice } from '@fortawesome/free-solid-svg-icons';

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
    switch (index) {
      case 0:
        return styles.redDice;
      case 1:
        return styles.yellowDice;
      case 2:
        return styles.greenDice;
      case 3:
        return styles.blueDice;
      case 4:
      case 5:
        return styles.whiteDice;
      default:
        return {};
    }
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
      <TouchableOpacity style={[styles.dice, this.getDiceColor()]} onPress={this.animateDice}>
        <Animated.View style={[animatedStyle]}>
          <FontAwesomeIcon icon={faDice} size={30} color={'#000'} />
        </Animated.View>
        <Text style={styles.value}>{value}</Text>
      </TouchableOpacity>
    );
  }
}// end if diceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

class DiceRow extends Component {
  render() {
    return (
      <View style={styles.diceRow}>
        {[...Array(6)].map((_, i) => (
          <AnimatedDice key={i} index={i} />
        ))}
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
  };

  handleNumberPress = (number, rowIndex) => {
    if (this.state.selectedCount >= 2) {
      return;
    }

    this.setState((prevState) => {
      const newRows = [...prevState.rows];
      const row = newRows[rowIndex];
      row.selectedNumbers.push(number);

      // Highlight numbers to the left in a different color
      for (let i = 0; i < number - 2; i++) {
        row.selectedNumbers.push(i + 2);
      }

      const newSelectedCount = prevState.selectedCount + 1;

      return { rows: newRows, selectedCount: newSelectedCount };
    });
  };

  isNumberSelected = (number, rowIndex) => {
    return this.state.rows[rowIndex].selectedNumbers.includes(number);
  };

  handleEndTurn = () => {
    // Add 2 moves and reset selected count
    this.setState((prevState) => {
      return { selectedCount: 0, moves: prevState.moves + 2 };
    });
  };
  
  render() {
    return (
      <View style={styles.container}>
        {this.state.rows.map((row, index) => (
          <View key={index} style={[styles.row, styles[`${row.color}Row`]]}>
            {[...Array(11)].map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.number,
                  { backgroundColor: this.isNumberSelected(i + 2, index) ? '#000' : colors[row.color] },
                ]}
                onPress={() => this.handleNumberPress(i + 2, index)}
                disabled={this.state.selectedCount >= 2 && !this.isNumberSelected(i + 2, index)}
              >
                <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                  {row.color === 'red' || row.color === 'yellow' ? i + 2 : 12 - i}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.number, { backgroundColor: colors[row.color] }]}></TouchableOpacity>
            <TouchableOpacity style={styles.lockIcon} onPress={() => this.handleLockPress(12, index)}>
              <FontAwesomeIcon icon={faLock} color="#000" size={60} />
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.endTurnButton} onPress={this.handleEndTurn}>
            <Text style={styles.endTurnButtonText}>End Turn</Text>
          </TouchableOpacity>
          <DiceRow />
        </View>
      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#63CAD8', 
  },
  diceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 5,
    marginTop: 5,
    marginRight: 50,

  },
  dice: {
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 10,
  },
  number: {
    width: 50,
    height: 50,
    borderRadius: 9,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    },
  lockIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    // backgroundColor: '#red',
    padding: 5,
    borderRadius: 5,
    },
   yellowRow: {
    backgroundColor: '#f7d511',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    },
  greenRow: {
    backgroundColor: '#28CC2D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    },
  redRow: {
    backgroundColor: '#D82E3F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    },
  blueRow: {
    backgroundColor: '#3581D8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    },
  colorBox: {
    backgroundColor: '#63CAD8',
    height: '100%',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    },
  dice: {
      width: 50,
      height: 50,
      borderRadius: 9,
      backgroundColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
    },
    diceValue: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    redDice: {
      backgroundColor: '#D82E3F',
    },
    yellowDice: {
      backgroundColor: '#f7d511',
    },
    greenDice: {
      backgroundColor: '#28CC2D',
    },
    blueDice: {
      backgroundColor: '#1F8FFE',
    },
    whiteDice: {
      backgroundColor: 'white',
    },
    diceContainer: {
      marginRight: 5,
      width: 50,
    },
    endTurnButton: {
      backgroundColor: '#000',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginRight: 65,
    },
    endTurnButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonRow: {
      flexDirection: 'row',
      // marginTop: 16,
      alignItems: 'center',
      justifyContent: 'flex-start', // Update this to 'flex-start'
    },
    score: {
      fontSize: 50,
      fontWeight: 'bold',
      marginLeft: 'auto',
      marginRight: 65,
    },

  });
