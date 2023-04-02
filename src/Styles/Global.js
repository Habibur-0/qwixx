import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#128C7E',
    // borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    padding: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
    padding: 7,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a3a3a3',
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    // paddingLeft:30,
    fontSize: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'black',
    borderWidth: 4,
    margin: 10,
    padding: 20,
    color: 'black',
    borderRadius: 25, // change the value to adjust the roundness of the corners
    fontSize: 25, // change the value to adjust the font size
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#128C7E',
  },
  fourButton: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#128C7E',
  },
});

export default styles;
