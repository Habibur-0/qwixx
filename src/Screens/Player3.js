import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';


const colors = {
  red: '#D82E3F',
  yellow: '#f7d511',
  green: '#28CC2D',
  blue: '#3581D8',
};

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

  componentDidMount() {
    const { lockStatuses } = this.props.route.params;
    console.log(lockStatuses); // log the lock status array to the console
    let endgame = 0;
    console.log(endgame); // log the lock status array to the console

    const { navigation } = this.props;
  
    if(lockStatuses[0] === true){
      this.handleLockPress(12, 0);
      endgame++;
    }
    if (lockStatuses[1] === true){
      this.handleLockPress(12, 1);
      endgame++;
    }
    if (lockStatuses[2] === true){
      this.handleLockPress(12, 2);
      endgame++;
    }
    if (lockStatuses[3] === true){
      this.handleLockPress(12, 3);
      endgame++;
    }
  
    if (endgame>=2){
      navigation.navigate('End');
    }
  }
  




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

  handleLockPress = (number, rowIndex) => {
    this.setState((prevState) => {
      const newRows = [...prevState.rows];
      newRows[rowIndex].selectedNumbers.push(number);
      // Highlight numbers to the left in a different color
      for (let i = 0; i < number - 2; i++) {
        newRows[rowIndex].selectedNumbers.push(i + 2);
      }
  
      return { rows: newRows };
    });
  };


  

  isNumberSelected = (number, rowIndex) => {
    return this.state.rows[rowIndex].selectedNumbers.includes(number);
  };

  handleEndTurn = () => {
    const { navigation } = this.props;
    // Add 2 moves and reset selected count
    this.setState((prevState) => {
      return { selectedCount: 0, moves: prevState.moves + 2 };
    });
    
    // Construct an array of lock statuses for each row
    const lockStatuses = this.state.rows.map(row => row.selectedNumbers.includes(12));
    
    navigation.navigate('Player4', { lockStatuses });
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
                <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>{row.color === 'red' || row.color === 'yellow' ? i + 2 : 12 - i}</Text>
              </TouchableOpacity>
            ))}


            <TouchableOpacity style={[styles.number, { backgroundColor: colors[row.color] }]}></TouchableOpacity>
              <TouchableOpacity style={styles.lockIcon} onPress={() => this.handleLockPress(12, index)}>
                <FontAwesomeIcon icon={faLock} color="#000" size={60} />
              </TouchableOpacity>

            {/* {lockStatuses[index].lockStatuses ?
              this.handleLockPress(12, index)
              :null
            } */}

            {/* {lockStatuses[index].lockStatuses ?
              <Text>{lockStatuses}</Text>
            } */}





          </View>
        ))}
        <View style = {styles.buttonRow}>
          <TouchableOpacity style={styles.endTurnButton} onPress={this.handleEndTurn}>
            <Text style={styles.endTurnButtonText}>End Turn</Text>
          </TouchableOpacity>
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
