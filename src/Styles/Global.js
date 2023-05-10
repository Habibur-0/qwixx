import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container1: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#63CAD8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
    backgroundColor: '#3581D8',
  },
  diceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginRight: 45,
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
    justifyContent: 'flex-start',
  },
  score: {
    fontSize: 50,
    fontWeight: 'bold',
    // marginLeft: 'auto',
    marginRight: 45,
  },
});

export default styles;
