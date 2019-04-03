import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Gravatar } from 'react-native-gravatar'
import { DrawerItems } from 'react-navigation'
import commonStyles  from '../commonStyles'

export default props => {
    return (
        <ScrollView>
            <View style={styles.header}> Tasks </View>
            <Gravatar styles={styles.avatar} 
                options={{ 
                    email: this.props.navigation.getParam('email'),
                    secure: true
                }} />
            <View style={styles.userInfo}>
                <Text style={styles.name}>{this.props.navigation.getParam('name')}</Text>
            </View>
        </ScrollView>
    )
}