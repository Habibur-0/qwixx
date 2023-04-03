
// import React, { Component } from 'react';
// import {
//   StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// import globalStyles from '../styles/Global';

// export default class AddContactScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       ContactList: [],
//       selectedContact: null,
//       searchKeyword: '', // add a new state variable to keep track of the search keyword
//     };
//   }

 


//   render() {
//     const { navigation } = this.props;
//     const { selectedContact, searchKeyword } = this.state;
//     const filteredContacts = this.filterContacts(); // filter contacts based on the search keyword

//     return (
//       <View style={globalStyles.container}>
//         <View style={globalStyles.header}>
//           <Text style={styles.headerTitle}>Add Contacts</Text>
//         </View>

//         <View style={globalStyles.searchContainer}>
//           <Ionicons name="ios-search" size={24} color="white" />
//           <TextInput
//             style={globalStyles.searchInput}
//             placeholder="Search"
//             value={searchKeyword}
//             onChangeText={this.handleSearch}
//           />
//         </View>

//         <FlatList
//           data={filteredContacts}
//           renderItem={({ item }) => (
//             <View>
//               <TouchableOpacity
//                 style={[globalStyles.item, item === selectedContact && styles.selectedItem]}
//                 onPress={() => this.selectContact(item)}
//               >
//                 <Text>
//                   <Text style={globalStyles.name}>
//                     {item.given_name}
//                     {' '}
//                     {item.family_name}
//                     {' '}
//                     |
//                     {' '}
//                   </Text>
//                   <Text style={globalStyles.email}>{item.email}</Text>
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           keyExtractor={(item) => item.user_id.toString()}
//         />

//         <View style={styles.bottomContainer}>
//           <TouchableOpacity style={globalStyles.button} onPress={this.addContact}>
//             <Text style={styles.buttonText}>Add</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={globalStyles.button} onPress={() => navigation.goBack()}>
//             <Text style={styles.buttonText}>Back</Text>
//           </TouchableOpacity>

//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#7D7D94',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: 'gray',
//     backgroundColor: '#B1B1C6',
//   },
//   headerTitle: {
//     fontWeight: 'bold',
//     fontSize: 30,
//     color: 'white',
//   },
//   selectedItem: {
//     backgroundColor: 'lightblue',
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: 'black',
//   },
//   itemText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#666699',
//     // borderRadius: 40,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     padding: 15,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 18,
//     color: 'white',
//     marginLeft: 10,
//     padding: 7,

//   },

//   bottomContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginBottom: 20,
//     marginHorizontal: 20,
//   },
//   button: {
//     flex: 1,
//     height: 50,
//     marginHorizontal: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
