import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { normalizeRect } from 'react-native/Libraries/StyleSheet/Rect';

export default function App() {

  
  const [contacts, setContacts] = useState({});


  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if(status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if(data.length > 0){
        setContacts(data);   
      }
    }
  }

  const listSeparator = () => {
    return(
      <View
      style={{
        height: 5,
        width: '80%',
        backgroundColor: '#fff',
        marginLeft: '10%',
      }}>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 6}}>
        <FlatList
        keyExtractor={item => item.key}
        renderItem={({item}) =>
        <View style={{flexDirection:'row'}}>
          <Text>{item.firstName} {item.lastName} {item.phoneNumbers[0].number}</Text>
        </View>}
        data={contacts}
        ItemSeparatorComponent={listSeparator}
        />
      </View>

      <View style={{flex:1}}>
        <Button
        title="GET CONTACTS"
        onPress={getContacts}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
