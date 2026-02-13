import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import TodoList from '../components /TodoList';
import { TokenContext } from '../Context /Context';

export default function TodoListDetailsScreen({ route }) {
  const { todoListId, title,  } = route.params;
  const [token] = useContext(TokenContext);

  
  return (
    <SafeAreaView style={todoDetailsStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* titre de la liste */}
      <View style={todoDetailsStyles.header}>
          <Text style={todoDetailsStyles.headerTitle}>{title}</Text>
      </View>
      
      {/* Contenu principal */}
      <View style={todoDetailsStyles.container}>
        <TodoList todoListId={todoListId} token={token} />
      </View>
    </SafeAreaView>
  );
}

const todoDetailsStyles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#fff5fcff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e7ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700', 
    textAlign: 'center',
    letterSpacing: -0.3,
    color: '#1e293b',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
},

  container: {
    flex: 1,
    backgroundColor: '#f5f8ff',
  },
};