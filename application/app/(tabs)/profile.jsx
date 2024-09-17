import { FlatList, SafeAreaView, Text, View, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLastestPosts, searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Profile = () => {

  const { query } = useLocalSearchParams()

  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-12 px-4">
           
            <Text className="font-pmedium text-sm text-gray-100">
              Search Result
            </Text>

            <Text className="text-2xl font-psemibold text-white">
              {query}
            </Text>
            
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query}/>
            </View>

          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No Videoss Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
      
    </SafeAreaView>
  )
}

export default Profile

