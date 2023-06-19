import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleSignup = () => {
    const { username, password } = this.state;
    // Add your signup logic here
    console.log('Username:', username);
    console.log('Password:', password);
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
        <Button title="Sign Up" onPress={this.handleSignup} />
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
});

export default SignupScreen;
