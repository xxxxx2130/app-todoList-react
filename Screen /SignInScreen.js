import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView,StatusBar,ActivityIndicator,KeyboardAvoidingView,Platform 
} from 'react-native';
import { signIn } from '../API/sign';
import { TokenContext, UsernameContext } from '../Context /Context';

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setToken] = useContext(TokenContext);
  const [, setUsernameContext] = useContext(UsernameContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    
    try {
      const token = await signIn(username, password);
      
      if (token) {
        setToken(token);
        setUsernameContext(username);
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Erreur', 'Nom d\'utilisateur ou mot de passe incorrect');
      }
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue lors de la connexion');
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={signInStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Barre d'en-tête */}
      <View style={signInStyles.header}>
        <Text style={signInStyles.headerTitle}>Connexion</Text>
      </View>

      <KeyboardAvoidingView 
        style={signInStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={signInStyles.content}>
          {/* Illustration/icône */}
          <View style={signInStyles.illustrationContainer}>
            <View style={signInStyles.iconCircle}>
              <Text style={signInStyles.iconText}>🔐</Text>
            </View>
            <Text style={signInStyles.welcomeText}>Bienvenue de retour !</Text>
            <Text style={signInStyles.subtitleText}>Connectez-vous pour accéder à vos tâches</Text>
          </View>

          {/* Formulaire de connexion */}
          <View style={signInStyles.formContainer}>
            {/* Champ Nom d'utilisateur */}
            <View style={signInStyles.inputGroup}>
              <Text style={signInStyles.inputLabel}>Nom d'utilisateur</Text>
              <TextInput
                placeholder="Entrez votre nom d'utilisateur"
                placeholderTextColor="#94a3b8"
                value={username}
                onChangeText={setUsername}
                style={signInStyles.input}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            {/* Champ Mot de passe */}
            <View style={signInStyles.inputGroup}>
              <Text style={signInStyles.inputLabel}>Mot de passe</Text>
              <TextInput
                placeholder="Entrez votre mot de passe"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={signInStyles.input}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
                onSubmitEditing={handleSignIn}
                returnKeyType="done"
              />
            </View>

            {/* Bouton de connexion */}
            <TouchableOpacity 
              style={[
                signInStyles.signInButton, 
                isLoading && signInStyles.buttonDisabled
              ]} 
              onPress={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={signInStyles.signInButtonText}>Se connecter</Text>
              )}
            </TouchableOpacity>

            

            {/* Lien vers l'inscription */}
            <TouchableOpacity 
              style={signInStyles.signUpLink}
              onPress={handleGoToSignUp}
              disabled={isLoading}
            >
              <Text style={signInStyles.signUpText}>
                Pas encore de compte ? <Text style={signInStyles.signUpLinkText}>S'inscrire</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Informations supplémentaires */}
         
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const signInStyles = {
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  container: {
    flex: 1,
  backgroundColor: '#fff5fcff'  },
  content: {
    flex: 1,
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
    backgroundColor: '#fff5fcff',
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
  signInButton: {
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
  buttonDisabled: {
    backgroundColor: '#94a3b8',
  },
  signInButtonText: {
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
  signUpLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    fontSize: 15,
    color: '#64748b',
    letterSpacing: -0.1,
  },
  signUpLinkText: {
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