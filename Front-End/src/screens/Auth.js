import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert
} from 'react-native'
import axios from 'axios'
import { server, showError } from '../common'
import commonStyles from '../commonStyles'
import backgroundImage from '../../assets/imgs/login.jpg'
import AuthInput from '../components/AuthInput'

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    signinOrSignup = async () => {
        if (this.state.stageNew) {
            try {
                await axios.post(`${server}/signup`, {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                })
                Alert.alert('Yesss', 'You are in! =)')
                this.setState({ stageNew: false})
            } catch (error) {
                showError(error)
            }
        } else {
            try {
                const res = await axios.post(`${server}/signin`, {
                    email: this.state.email,
                    password: this.state.password,
                })
                axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
                this.props.navigation.navigate('Home')
            } catch (error) {
                Alert.alert('Huuuummm', 'You are not allowed to do this! =O')
            }
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} 
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}> {this.state.stageNew ?  'Create Account' : 'Start Login'} </Text>
                    {this.state.stageNew && <AuthInput icon='user' placeholder='Name' style={styles.input} value={this.state.name} onChangeText={name =>  this.setState({ name })} />}
                    <AuthInput icon='at' placeholder='E-mail' style={styles.input} value={this.state.email} onChangeText={email =>  this.setState({ email })} />
                    <AuthInput icon='lock' secureTextEntry={true} placeholder='Password'style={styles.input}value={this.state.password}onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew && <AuthInput icon='asterisk' secureTextEntry={true} placeholder='Confirm Password' style={styles.input} value={this.state.confirmPassword} onChangeText={confirmPassword =>  this.setState({ confirmPassword })} />}
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}> {this.state.stageNew ? 'Register' : 'Signin'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({  stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}> {this.state.stageNew ? 'Have Account?'  : 'Dont have Account?'}</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})