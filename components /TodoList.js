import React, { useState, useEffect } from 'react';
import {  View,  Text, TextInput,  FlatList,  TouchableOpacity,  ScrollView} from 'react-native';
import TodoItem from './TodoItem';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../API/todo';

export default function TodoList({ todoListId, token }) {
    const [todos, setTodos] = useState([]);
    const [count, setCount] = useState(0);
    const [newTodoText, setNewTodoText] = useState('');
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token && todoListId) {
            setIsLoading(true);
            getTodos(todoListId, token)
                .then((data) => {
                    setTodos(data);
                    setCount(data.filter(item => item.done).length);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Erreur lors du chargement des TodoItems:', error);
                    setIsLoading(false);
                });
        }
    }, [token, todoListId]);

    const addNewTodo = () => {
        if (newTodoText.trim() === '') return;
        createTodo(newTodoText, todoListId, token)
            .then((newTodo) => {
                setTodos([...todos, newTodo]);
                setNewTodoText('');
                setCount(todos.filter(item => item.done).length + (newTodo.done ? 1 : 0));
            })
            .catch((error) => {
                console.error('Erreur lors de la création du TodoItem:', error);
            });
    };

    const deleteTodoItem = (id) => {
        deleteTodo(id, token)
            .then(() => {
                const newTodos = todos.filter(item => item.id !== id);
                setTodos(newTodos);
                setCount(newTodos.filter(item => item.done).length);
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression du TodoItem:', error);
            });
    };

  
    const downloadCSV = (data) => {
        const csvRows = [];
     
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(',')); 

       
        data.forEach(item => {
            const row = headers.map(header => item[header]); 
            csvRows.push(row.join(',')); 
        });

        
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'todos.csv'; 
        link.click();
    };

    const toggleTodo = (id, currentDone) => {
        updateTodo(id, !currentDone, token)
            .then((updatedTodo) => {
                const updatedTodos = todos.map(item =>
                    item.id === id ? updatedTodo : item
                );
                setTodos(updatedTodos);
                setCount(updatedTodos.filter(item => item.done).length);
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour du TodoItem:', error);
            });
    };

   
    const handleEditTodo = (id, newContent) => {
        updateTodo(id, newContent, token)
            .then((updatedTodo) => {
                const updatedTodos = todos.map(item =>
                    item.id === id ? { ...item, content: newContent } : item
                );
                setTodos(updatedTodos);
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour du TodoItem:', error);
            });
    };

    const filteredTodos = todos.filter(item => {
        if (filter === 'done') return item.done;
        if (filter === 'undone') return !item.done;
        return true;
    });

    if (isLoading) {
        return (
            <View style={todoListStyles.loadingContainer}>
                <Text style={todoListStyles.loadingText}>Chargement en cours...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={todoListStyles.container} showsVerticalScrollIndicator={false}>
            {/* Titre directement sur l'écran */}
            <View style={todoListStyles.titleSection}>
                <Text style={todoListStyles.title}>Liste des Tâches</Text>
                <Text style={todoListStyles.subtitle}>
                    {count} terminées sur {todos.length}
                </Text>
            </View>

            {/* ajout de item*/}
            <View style={todoListStyles.addSection}>
                <View style={todoListStyles.inputRow}>
                    <TextInput
                        style={todoListStyles.input}
                        onChangeText={setNewTodoText}
                        placeholder='Ajouter une nouvelle tâche...'
                        placeholderTextColor="#94a3b8"
                        value={newTodoText}
                        returnKeyType="done"
                    />
                    <TouchableOpacity 
                        style={todoListStyles.addButton}
                        onPress={addNewTodo}
                        disabled={newTodoText.trim() === ''}
                    >
                        <Text style={todoListStyles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bouton Exporter en CSV */}
            <TouchableOpacity 
                style={todoListStyles.exportButton}
                onPress={() => downloadCSV(todos)}
            >
                <Text style={{ color: '#ffffff' }}>📥 Exporter en CSV</Text>
            </TouchableOpacity>

            {/* Filtres */}
            <View style={todoListStyles.filterContainer}>
                <TouchableOpacity 
                    style={[
                        todoListStyles.filterButton, 
                        filter === 'all' && todoListStyles.filterButtonActive
                    ]}
                    onPress={() => setFilter('all')}
                >
                    <Text style={[
                        todoListStyles.filterButtonText,
                        filter === 'all' && todoListStyles.filterButtonTextActive
                    ]}>Tout ({todos.length})</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[
                        todoListStyles.filterButton, 
                        filter === 'undone' && todoListStyles.filterButtonActive
                    ]}
                    onPress={() => setFilter('undone')}
                >
                    <Text style={[
                        todoListStyles.filterButtonText,
                        filter === 'undone' && todoListStyles.filterButtonTextActive
                    ]}>En cours ({todos.filter(t => !t.done).length})</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[
                        todoListStyles.filterButton, 
                        filter === 'done' && todoListStyles.filterButtonActive
                    ]}
                    onPress={() => setFilter('done')}
                >
                    <Text style={[
                        todoListStyles.filterButtonText,
                        filter === 'done' && todoListStyles.filterButtonTextActive
                    ]}>Terminées ({count})</Text>
                </TouchableOpacity>
            </View>

            {/* Liste des items */}
            <View style={todoListStyles.tasksContainer}>
                {filteredTodos.length === 0 ? (
                    <View style={todoListStyles.emptyContainer}>
                        <Text style={todoListStyles.emptyText}>
                            {filter === 'all' 
                                ? 'Aucune tâche. Ajoutez-en une nouvelle !'
                                : filter === 'done'
                                ? 'Aucune tâche terminée'
                                : 'Aucune tâche en cours'
                            }
                        </Text>
                    </View>
                ) : (
                    filteredTodos.map((item) => (
                        <TodoItem
                            key={item.id.toString()}
                            item={item}
                            onDelete={deleteTodoItem}
                            onToggle={toggleTodo}
                            onEdit={handleEditTodo}
                        />
                    ))
                )}
            </View>
        </ScrollView>
    );
}


const todoListStyles = {
    container: {
        flex: 1,
        backgroundColor: '#fff5fcff',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff5fcff',
    },
    loadingText: {
        fontSize: 16,
        color: '#64748b',
        letterSpacing: -0.2,
    },
   
    titleSection: {
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#f63ba5ff',
        letterSpacing: -0.5,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
        fontWeight: '400',
        letterSpacing: -0.2,
    },

    addSection: {
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#f63ba5ff',
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ffffff',
    },
    exportButton: {
        backgroundColor: '#f63ba5ff',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#bae6fd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    filterButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 2,
    },
    filterButtonActive: {
        backgroundColor: '#f63ba5ff',
    },
    filterButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#64748b',
        letterSpacing: -0.1,
        textAlign: 'center',
    },
    filterButtonTextActive: {
        color: '#ffffff',
    },
    tasksContainer: {
        marginBottom: 30,
    },
    emptyContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    emptyText: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        fontStyle: 'italic',
        letterSpacing: -0.2,
    },
};