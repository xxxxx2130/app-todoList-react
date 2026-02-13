import React, { useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { UsernameContext } from '../Context /Context';

export default function HomeScreen() {
  const [username] = useContext(UsernameContext);
  

  
  return (
    <SafeAreaView style={homeStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Barre en haut avec le titre */}
      <View style={homeStyles.header}>
        <Text style={homeStyles.headerTitle}>Welcome to your To do List App</Text>
      </View>
      
     
        {/* Section de bienvenue */}
        <View style={homeStyles.welcomeSection}>
          <Text style={homeStyles.welcomeText}>Bonjour {username} !</Text>
          <Text style={homeStyles.subtitleText}>Voici vos tâches pour aujourd'hui</Text>
        </View>
        
    
        
        {/* Citation  */}
        <View style={homeStyles.quoteContainer}>
          <Text style={homeStyles.quoteText}>"Le succès, c'est la somme de petits efforts répétés jour après jour."</Text>
        </View>
        
      
    </SafeAreaView>
  );
}

const homeStyles = {
  safeArea: {
    flex: 1,
   backgroundColor: '#fff5fcff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f8d6e9',
    shadowColor: '#efa2d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8b2252', 
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff5f8',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  welcomeSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 25,
    marginBottom: 25,
    shadowColor: '#efa2d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#fce4f1',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8b2252', 
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: '#d14d8a', 
    fontWeight: '400',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  tasksHeader: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  tasksTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6d1b3d', 
    letterSpacing: -0.3,
  },
  tasksContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 10,
    shadowColor: '#efa2d0',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fce4f1',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fce4f1',
  },
  taskBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#efa2d0', 
    marginTop: 6,
    marginRight: 15,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#3b1e2e', 
    lineHeight: 22,
    letterSpacing: -0.2,
    fontWeight: '400',
  },
  taskCounter: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#efa2d0',
    shadowColor: '#efa2d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  taskCounterText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#d14d8a', 
    letterSpacing: -0.1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 25,
    marginBottom: 25,
    shadowColor: '#efa2d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#fce4f1',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8b2252', 
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#d14d8a', 
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  quoteContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 25,
    borderWidth: 1,
    borderColor: '#fce4f1',
    shadowColor: '#efa2d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteText: {
    fontSize: 16,
    color: '#3b1e2e', 
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: -0.1,
  },
};