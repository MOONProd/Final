import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleLogin = () => {
    const { username, password } = this.state;
    // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  handleSignUp = () => {
    // Add your sign up logic here
    console.log('Sign up button pressed');
  };

  render() {
    const { username, password } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => this.setState({ username: text })}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => this.setState({ password: text })}
          value={password}
          secureTextEntry
        />
        <Button title="Login" onPress={this.handleLogin} />
        <TouchableOpacity onPress={this.handleSignUp}>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  signupButton: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
