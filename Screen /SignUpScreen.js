import React, { useState, useContext } from 'react';
import { 
 View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView,
  StatusBar,
  ScrollView 
} from 'react-native';
import { signUp } from '../API/sign';
import { TokenContext, UsernameContext } from '../Context /Context';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setToken] = useContext(TokenContext);
  const [, setUsernameContext] = useContext(UsernameContext);

  const handleSignUp = () => {
    // Vérification des champs vides
    if (!username.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Le nom d\'utilisateur et le mot de passe sont obligatoires.');
      return;
    }

    signUp(username, password)
      .then((token) => {
        if (!token) {
          throw new Error('Aucun jeton retourné après l\'inscription.');
        }
        setToken(token);
        setUsernameContext(username);
      })
      .catch((error) => {
        let errorMessage = 'Une erreur est survenue lors de l\'inscription.';
        if (error.message.includes('username')) {
          errorMessage = 'Ce nom d\'utilisateur est déjà pris.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        Alert.alert('Erreur', errorMessage);
      });
  };

  const handleGoToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={signUpStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Barre d'en-tête */}
      <View style={signUpStyles.header}>
        <Text style={signUpStyles.headerTitle}>Création de Compte</Text>
      </View>

      <ScrollView 
        style={signUpStyles.container} 
        contentContainerStyle={signUpStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration/icône */}
        <View style={signUpStyles.illustrationContainer}>
          <View style={signUpStyles.iconCircle}>
            <Text style={signUpStyles.iconText}>📝</Text>
          </View>
          <Text style={signUpStyles.welcomeText}>Rejoignez notre application</Text>
          <Text style={signUpStyles.subtitleText}>Créez votre compte pour commencer à gérer vos tâches</Text>
        </View>

        {/* Formulaire d'inscription */}
        <View style={signUpStyles.formContainer}>
          {/* Champ Nom d'utilisateur */}
          <View style={signUpStyles.inputGroup}>
            <Text style={signUpStyles.inputLabel}>Nom d'utilisateur</Text>
            <TextInput
              placeholder="Entrez votre nom d'utilisateur"
              placeholderTextColor="#94a3b8"
              value={username}
              onChangeText={setUsername}
              style={signUpStyles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Champ Mot de passe */}
          <View style={signUpStyles.inputGroup}>
            <Text style={signUpStyles.inputLabel}>Mot de passe</Text>
            <TextInput
              placeholder="Créez un mot de passe sécurisé"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={signUpStyles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Bouton d'inscription */}
          <TouchableOpacity 
            style={signUpStyles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={signUpStyles.signUpButtonText}>S'inscrire</Text>
          </TouchableOpacity>

          
          {/* Lien vers la connexion */}
          <TouchableOpacity 
            style={signUpStyles.signInLink}
            onPress={handleGoToSignIn}
          >
            <Text style={signUpStyles.signInText}>
              Déjà un compte ? <Text style={signUpStyles.signInLinkText}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const signUpStyles = {
  safeArea: {
    flex: 1,
ackgroundColor: '#fff5fcff',
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff5fcff'  ,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 36,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  signUpButton: {
    backgroundColor: '#f63ba5ff',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  signUpButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.2,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  separatorText: {
    marginHorizontal: 15,
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  signInLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  signInText: {
    fontSize: 15,
    color: '#64748b',
    letterSpacing: -0.1,
  },
  signInLinkText: {
  color: '#f63ba5ff',
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 15,
    letterSpacing: -0.2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoBullet: {
    fontSize: 16,
    color: '#3b82f6',
    marginRight: 10,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    letterSpacing: -0.1,
  },
};