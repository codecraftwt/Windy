import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default function Profile({ navigation }) {

  const handleLogout = async () => {
    await storage.removeItem('token');
    dispatch(Logout());
    navigation.navigate('Login');
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Profile</Text>
      </View>


      <View style={styles.profileInfo}>
        <Icon name="user" size={60} color="#FF6B35" style={styles.profileIcon} />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>johndoe@example.com</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <Icon name="settings" size={20} color="#333333" />
          <Text style={styles.optionText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <Icon name="file-text" size={20} color="#333333" />
          <Text style={styles.optionText}>Loan History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <Icon name="help-circle" size={20} color="#333333" />
          <Text style={styles.optionText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}  onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerBar: {
    backgroundColor: '#FF6B35',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileIcon: {
    backgroundColor: '#FFA36C',
    padding: 15,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#333333',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333333',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 40,
    marginBottom: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 40,
    right: 40,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});
