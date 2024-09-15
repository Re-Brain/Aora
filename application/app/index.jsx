import { ScrollView, Text, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App()
{
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height : '100%' }}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image>

                    </Image>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}