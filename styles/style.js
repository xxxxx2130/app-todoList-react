import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// PALETTE ROSE 3D
const COLORS = {
  primary: '#FF6B9D',       // Rose vif principal
  primaryLight: '#FF8FB1',  // Rose clair pour lumières
  primaryDark: '#E04A7A',   // Rose foncé pour ombres
  secondary: '#FFAEC0',     // Rose secondaire
  background: '#FFF5F8',    // Fond rose très clair
  surface: '#FFFFFF',       // Surface blanche
  card: '#FFFFFF',          // Cartes blanches
  text: '#5A2A3C',          // Texte rose foncé
  textSecondary: '#8A5A6B', // Texte secondaire
  border: '#FFE4EC',        // Bordures roses légères
  accent: '#000000ff',        // Rose accent
  success: '#4CAF50',       // Vert succès
  error: '#F44336',         // Rouge erreur
};

const styles = StyleSheet.create({
  // === CONTAINERS PRINCIPAUX 3D ===
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: COLORS.background,
    // Dégradé de fond subtil
    backgroundGradient: {
      colors: ['#FFF5F8', '#FFE4EC'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 }
    },
  },

  // === HOME SCREEN 3D ===
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 24,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    // Effet 3D avec bordures multiples
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    borderBottomWidth: 8,
    borderBottomColor: COLORS.primaryDark,
    borderLeftWidth: 2,
    borderLeftColor: '#FFD1DC',
    borderRightWidth: 2,
    borderRightColor: '#FFD1DC',
    // Ombres complexes 3D
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    transform: [{ perspective: 1000 }, { rotateX: '2deg' }],
  },

  // === TYPOGRAPHIE 3D ===
  title: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    color: COLORS.text,
    marginBottom: 28,
    lineHeight: 40,
    letterSpacing: -0.8,
    // Effet texte 3D
    textShadowColor: 'rgba(255, 107, 157, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    transform: [{ perspective: 1000 }],
  },

  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 32,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(90, 42, 60, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  normalText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 24,
    fontWeight: '500',
  },

  usernameText: {
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 26,
    textShadowColor: 'rgba(255, 107, 157, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  username: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 36,
    textAlign: 'center',
    lineHeight: 34,
    paddingVertical: 18,
    paddingHorizontal: 28,
    // Carte 3D impressionnante
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    borderBottomWidth: 10,
    borderBottomColor: COLORS.primaryDark,
    borderLeftWidth: 2,
    borderLeftColor: '#FFE4EC',
    borderRightWidth: 2,
    borderRightColor: '#FFE4EC',
    // Ombres complexes
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 20,
    transform: [{ perspective: 1000 }, { rotateY: '3deg' }],
  },

  headerText: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 36,
    textShadowColor: 'rgba(255, 107, 157, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },

  // === FORMULAIRES 3D ===
  input: {
    height: 58,
    borderColor: COLORS.primaryLight,
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.text,
    // Effet input enfoncé 3D
    borderBottomWidth: 6,
    borderBottomColor: COLORS.primaryDark,
    borderLeftWidth: 1,
    borderLeftColor: '#FFE4EC',
    borderRightWidth: 1,
    borderRightColor: '#FFE4EC',
    // Ombres
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
    transform: [{ perspective: 1000 }],
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },

  // === TODO LISTS 3D ===
  todoListItem: {
    padding: 22,
    marginBottom: 18,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    // Effet 3D avec bordures
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    borderBottomWidth: 8,
    borderBottomColor: COLORS.primaryDark,
    borderLeftWidth: 2,
    borderLeftColor: '#FFE4EC',
    borderRightWidth: 2,
    borderRightColor: '#FFE4EC',
    // Ombres complexes
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: [{ perspective: 1000 }, { translateY: -3 }],
  },

  todoListContent: {
    flex: 1,
    marginRight: 18,
  },

  todoListTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
    lineHeight: 26,
    textShadowColor: 'rgba(90, 42, 60, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  todoListActions: {
    flexDirection: 'row',
    gap: 14,
  },

  // === PROGRESS BAR 3D ===
  progressContainer: {
    marginTop: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primaryDark,
  },

  progressText: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },

  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
  },

  progress: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    // Effet 3D progression
    borderRightWidth: 2,
    borderRightColor: COLORS.primaryLight,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.4,
  },

  // === BOUTONS 3D PRESSABLES ===
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 16,
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    // Effet bouton 3D ultra-réaliste
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    borderBottomWidth: 12,
    borderBottomColor: COLORS.primaryDark,
    borderLeftWidth: 2,
    borderLeftColor: '#FF8FB1',
    borderRightWidth: 2,
    borderRightColor: '#FF8FB1',
    // Ombres complexes
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 25,
    transform: [{ perspective: 1000 }],
  },

  deleteButton: {
    backgroundColor: COLORS.primary, // Même couleur pour cohérence
    borderColor: '#FF8FB1',
    borderBottomColor: COLORS.primaryDark,
  },

  signOutButton: {
    backgroundColor: COLORS.primary,
    borderColor: '#FF8FB1',
    borderBottomColor: COLORS.primaryDark,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  // === TODO ITEMS 3D ===
  todoItem: {
    padding: 20,
    marginBottom: 14,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    // Effet carte 3D
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    borderBottomWidth: 6,
    borderBottomColor: COLORS.primaryDark,
    borderLeftWidth: 1,
    borderLeftColor: '#FFE4EC',
    borderRightWidth: 1,
    borderRightColor: '#FFE4EC',
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: [{ perspective: 1000 }],
  },

  todoContent: {
    flex: 1,
    fontSize: 17,
    color: COLORS.text,
    fontWeight: '500',
    lineHeight: 24,
    marginRight: 18,
  },

  todoActions: {
    flexDirection: 'row',
    gap: 14,
  },

  // === ICONES 3D ===
  icone: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    // Effet icône 3D
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ perspective: 1000 }],
  },

  // === ÉDITION 3D ===
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },

  editInput: {
    flex: 1,
    height: 52,
    borderColor: COLORS.primaryLight,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.text,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primaryDark,
  },

  // === FILTRES 3D ===
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 24,
    paddingHorizontal: 12,
    gap: 10,
  },

  // === COMPTEUR 3D ===
  counter: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 24,
    padding: 18,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    borderBottomWidth: 8,
    borderBottomColor: COLORS.primaryDark,
    lineHeight: 24,
    textShadowColor: 'rgba(255, 107, 157, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },

  // === LIENS 3D ===
  signupText: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 24,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    textShadowColor: 'rgba(255, 107, 157, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  loadingText: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 28,
    fontWeight: '600',
    lineHeight: 24,
    fontStyle: 'italic',
    textShadowColor: 'rgba(255, 107, 157, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  
});

export default styles;