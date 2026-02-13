import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { getTodoLists, createTodoList, deleteTodoList, updateTodoList } from '../API/todoList';
import { getTodos } from '../API/todo';
import { TokenContext, UsernameContext } from '../Context /Context';
import styles from '../styles/style';
import ConfirmModal from '../components /modal';

export default function TodoListsScreen({ navigation }) {
  const [username] = useContext(UsernameContext);
  const [token] = useContext(TokenContext);
  const [todoLists, setTodoLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [todoListToDelete, setTodoListToDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const calculateProgress = () => {
    const progressData = {};
    todoLists.forEach(list => {
      getTodos(list.id, token)
        .then(todos => {
          const doneCount = todos.filter(todo => todo.done).length;
          progressData[list.id] = {
            done: doneCount,
            total: todos.length
          };
          setProgress(prevProgress => ({ ...prevProgress, [list.id]: progressData[list.id] }));
        })
        .catch(error => {
          console.error('Erreur lors du chargement des TodoItems:', error);
        });
    });
  };

  useEffect(() => {
    if (username && token) {
      setIsLoading(true);
      getTodoLists(username, token)
        .then((data) => {
          setTodoLists(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des TodoLists:', error);
          setIsLoading(false);
        });
    }
  }, [username, token]);

  useEffect(() => {
    if (todoLists.length > 0) {
      calculateProgress();
    }
  }, [todoLists]);

  const handleAddTodoList = (title) => {
    createTodoList(username, title, token)
      .then((newTodoList) => {
        setTodoLists([...todoLists, newTodoList]);
      })
      .catch((error) => {
        console.error('Erreur lors de la création de la TodoList:', error);
      });
  };

  const handleDeleteTodoList = (id) => {
    deleteTodoList(id, token)
      .then(() => {
        setTodoLists(todoLists.filter((list) => list.id !== id));
        setModalVisible(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la TodoList:', error);
      });
  };

  const handleUpdateTodoListTitle = (id) => {
    if (editTitle.trim() === '') return;

    updateTodoList(id, editTitle, token)
      .then((updatedTodoList) => {
        const updatedTodoLists = todoLists.map(list =>
          list.id === id ? updatedTodoList : list
        );
        setTodoLists(updatedTodoLists);
        setEditingId(null);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du titre de la TodoList:', error);
        Alert.alert('Erreur', 'Vous n\'avez pas les permissions nécessaires pour modifier cette liste.');
      });
  };

  const openModal = (id) => {
    setTodoListToDelete(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTodoListToDelete(null);
  };

  if (isLoading) {
    return (
      <View style={todoListStyles.container}>
        <Text style={todoListStyles.loadingText}>Chargement en cours...</Text>
      </View>
    );
  }

  return (
    <View style={todoListStyles.container}>
      {/* Barre d'en-tête avec le titre */}
      <View style={todoListStyles.header}>
        <Text style={todoListStyles.headerTitle}>Mes Listes de Tâches</Text>
      </View>
      
      <View style={todoListStyles.content}>
        {/* Input pour ajouter une nouvelle liste */}
        <View style={todoListStyles.inputContainer}>
          <TextInput
            style={todoListStyles.input}
            placeholder="Nouvelle liste de tâches..."
            placeholderTextColor="#94a3b8"
            onSubmitEditing={(e) => {
              if (e.nativeEvent.text.trim()) {
                handleAddTodoList(e.nativeEvent.text);
                e.nativeEvent.text = '';
              }
            }}
          />
        </View>

        {/* Liste des todoLists */}
        <FlatList
          data={todoLists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={todoListStyles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={todoListStyles.emptyContainer}>
              <Text style={todoListStyles.emptyText}>
                Aucune liste de tâches. Créez-en une nouvelle !
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={todoListStyles.todoListItem}>
              {editingId === item.id ? (
                <View style={todoListStyles.editContainer}>
                  <TextInput
                    style={todoListStyles.editInput}
                    value={editTitle}
                    onChangeText={setEditTitle}
                    autoFocus={true}
                    placeholder="Modifier le titre..."
                    placeholderTextColor="#65ce91ff"
                  />
                  <View style={todoListStyles.editActions}>
                    <TouchableOpacity 
                      style={todoListStyles.editButton}
                      onPress={() => handleUpdateTodoListTitle(item.id)}
                    >
                      <Text style={todoListStyles.editButtonText}>✓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={todoListStyles.cancelButton}
                      onPress={() => setEditingId(null)}
                    >
                      <Text style={todoListStyles.cancelButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={todoListStyles.todoListContent}
                    onPress={() =>
                      navigation.navigate('TodoListDetails', {
                        todoListId: item.id,
                        title: item.title,
                        onGoBack: calculateProgress
                      })
                    }
                  >
                    <View style={todoListStyles.todoListHeader}>
                      <View style={todoListStyles.todoListBullet} />
                      <Text style={todoListStyles.todoListTitle}>{item.title}</Text>
                    </View>
                    
                    {progress[item.id] && (
                      <View style={todoListStyles.progressContainer}>
                        <View style={todoListStyles.progressInfo}>
                          <Text style={todoListStyles.progressText}>
                            {progress[item.id].done} / {progress[item.id].total} tâches terminées
                          </Text>
                          <Text style={todoListStyles.progressPercent}>
                            {progress[item.id].total > 0 ? Math.round((progress[item.id].done / progress[item.id].total) * 100) : 0}%
                          </Text>
                        </View>
                        <View style={todoListStyles.progressBar}>
                          <View
                            style={[
                              todoListStyles.progress,
                              { 
                                width: `${progress[item.id].total > 0 ? (progress[item.id].done / progress[item.id].total) * 100 : 0}%` 
                              }
                            ]}
                          />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                  
                  <View style={todoListStyles.todoListActions}>
                    <TouchableOpacity 
                      style={todoListStyles.actionButton}
                      onPress={() => {
                        setEditingId(item.id);
                        setEditTitle(item.title);
                      }}
                    >
                      <Text style={todoListStyles.actionButtonText}>✎</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[todoListStyles.actionButton, todoListStyles.deleteButton]}
                      onPress={() => openModal(item.id)}
                    >
                      <Text style={todoListStyles.actionButtonText}>🗑</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
        />
      </View>

      <ConfirmModal
        visible={modalVisible}
        onClose={closeModal}
        onConfirm={() => handleDeleteTodoList(todoListToDelete)}
        message="Êtes-vous sûr de vouloir supprimer cette liste ?"
      />
    </View>
  );
}

const todoListStyles = {
  container: {
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
    fontSize: 20,
    fontWeight: '700', 
    textAlign: 'center',
    letterSpacing: -0.3,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
},
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  listContainer: {
    paddingBottom: 20,
  },
  todoListItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoListContent: {
    flex: 1,
  },
  todoListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  todoListBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#eb84b8ff',
    marginRight: 12,
  },
  todoListTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e293b',
    letterSpacing: -0.2,
    flex: 1,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '400',
    letterSpacing: -0.1,
  },
  progressPercent: {
    fontSize: 13,
    color: '#eb84b8ff',
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#65d35dff',
    borderRadius: 3,
  },
  todoListActions: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  actionButton: {
   backgroundColor: '#d4fad1ff',
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
 
  deleteButton: {
    backgroundColor: '#fee2e2',
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#f63b95ff',
    marginRight: 10,
  },
  editActions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#d4fad1ff',
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 18,
    color: '#161c15ff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#92400e',
    fontWeight: 'bold',
  },
 


};