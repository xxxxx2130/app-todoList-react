import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, 
  StatusBar  } from 'react-native';
import { TokenContext, UsernameContext } from '../Context /Context';
import { deleteUser } from '../API/sign';
import ConfirmModal from '../components /modal';  

export default function SignOutScreen() {
  const [token, setToken] = useContext(TokenContext);
  const [username, setUsername] = useContext(UsernameContext);
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const handleSignOut = () => {
    setToken(null);
    setUsername(null);
  };

  const handleDeleteAccount = () => {
    setIsModalVisible(true);   
  };

  const confirmDeleteAccount = () => {
    console.log('Suppression confirmée pour:', username);

    deleteUser(username, token)
      .then((nodesDeleted) => {
        console.log('Réponse de deleteUser:', nodesDeleted);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du compte:', error);
      })
      .finally(() => {
        setToken(null);
        setUsername(null);
        setIsModalVisible(false);
      });
  };

  const cancelDeleteAccount = () => {
    console.log('Suppression annulée');
    setIsModalVisible(false);  
  };

  return (
    <SafeAreaView style={signOutStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Barre d'en-tête */}
      <View style={signOutStyles.header}>
        <Text style={signOutStyles.headerTitle}>Gestion du Compte</Text>
      </View>

      <View style={signOutStyles.container}>


        <View style={signOutStyles.cardsContainer}>
          {/* suppression de compte */}
          <View style={signOutStyles.card}>
            <View style={signOutStyles.cardHeader}>
              <View style={[signOutStyles.iconCircle, signOutStyles.deleteIconCircle]}>
                <Text style={signOutStyles.iconText}>⚠️</Text>
              </View>
              <Text style={signOutStyles.cardTitle}>Suppression du compte</Text>
            </View>
            
            <TouchableOpacity
              style={signOutStyles.deleteButton}
              onPress={handleDeleteAccount}
            >
              <Text style={signOutStyles.deleteButtonText}>Supprimer mon compte</Text>
            </TouchableOpacity>
          </View>

          {/* déconnexion */}
          <View style={signOutStyles.card}>
            <View style={signOutStyles.cardHeader}>
              <View style={[signOutStyles.iconCircle, signOutStyles.logoutIconCircle]}>
                <Text style={signOutStyles.iconText}>🚪</Text>
              </View>
              <Text style={signOutStyles.cardTitle}>Déconnexion</Text>
            </View>
          
            <TouchableOpacity
              style={signOutStyles.logoutButton}
              onPress={handleSignOut}
            >
              <Text style={signOutStyles.logoutButtonText}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </View>

      
      </View>

      <ConfirmModal
        visible={isModalVisible}
        onClose={cancelDeleteAccount}
        onConfirm={confirmDeleteAccount}
        message="Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
      />
    </SafeAreaView>
  );
}

const signOutStyles = {
  safeArea: {
    flex: 1,
     backgroundColor: '#fff5fcff'  ,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff5fcff'  ,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  welcomeContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 5,
    letterSpacing: -0.2,
  },
  usernameText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    letterSpacing: -0.1,
  },
  cardsContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deleteIconCircle: {
    backgroundColor: '#ff7070ff',
  },
  logoutIconCircle: {
     backgroundColor: '#99e8acff',
  },
  iconText: {
    fontSize: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    letterSpacing: -0.2,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 20,
    letterSpacing: -0.1,
  },
  deleteButton: {
    backgroundColor: '#ff7070ff',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffffff',
    letterSpacing: -0.2,
  },
  logoutButton: {
    backgroundColor: '#99e8acff',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffffff',
    letterSpacing: -0.2,
  },
  infoContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoText: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    letterSpacing: -0.1,
  },
  infoHighlight: {
    fontWeight: '600',
    color: '#1e293b',
  },
};