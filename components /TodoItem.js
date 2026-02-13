import React, { useState } from 'react';
import { View, Text, TouchableOpacity , TextInput, } from 'react-native';
//import { launchImageLibrary } from 'react-native-image-picker';
import ConfirmModal from '../components /modal';



export default function TodoItem({ item, onDelete, onToggle, onEdit }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(item.content);
  

    const handleDelete = () => {
        setIsModalVisible(true);
    };

    const confirmDelete = () => {
        onDelete(item.id);
        setIsModalVisible(false);
    };

    const cancelDelete = () => {
        setIsModalVisible(false);
    };

    const handleEditToggle = () => {
        if (isEditing) {
            onEdit(item.id, editText);
        }
        setIsEditing(!isEditing);
    };

    const handleSubmitEdit = () => {
        if (editText.trim()) {
            onEdit(item.id, editText);
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setEditText(item.content);
        setIsEditing(false);
    };

    return (
        <View style={todoItemStyles.todoItem}>
            {/* Point/cercle à gauche */}
            <TouchableOpacity 
                style={todoItemStyles.bulletContainer}
                onPress={() => onToggle(item.id, item.done)}
            >
                <View style={[
                    todoItemStyles.bullet,
                    item.done && todoItemStyles.bulletDone
                ]}>
                    {item.done && <Text style={todoItemStyles.checkmark}>✓</Text>}
                </View>
            </TouchableOpacity>

            {/* Contenu de la tâche */}
            <View style={todoItemStyles.contentContainer}>
                {isEditing ? (
                    <TextInput
                        style={todoItemStyles.editInput}
                        value={editText}
                        onChangeText={setEditText}
                        placeholder="Modifier la tâche..."
                        onSubmitEditing={handleSubmitEdit}
                        blurOnSubmit={false}
                    />
                ) : (
                    <Text style={[
                        todoItemStyles.todoContent,
                        item.done && todoItemStyles.todoContentDone
                    ]}>
                        {item.content}
                    </Text>
                )}
            </View>

            {/* Actions */}
            <View style={todoItemStyles.actionsContainer}>
                {isEditing ? (
                    <>
                        <TouchableOpacity 
                            style={todoItemStyles.actionButton}
                            onPress={handleSubmitEdit}
                        >
                            <Text style={todoItemStyles.actionText}>✓</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[todoItemStyles.actionButton, todoItemStyles.cancelButton]}
                            onPress={handleCancelEdit}
                        >
                            <Text style={todoItemStyles.actionText}>✕</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity 
                            style={todoItemStyles.actionButton}
                            onPress={handleEditToggle}
                        >
                            <Text style={todoItemStyles.actionText}>✎</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[todoItemStyles.actionButton, todoItemStyles.deleteButton]}
                            onPress={handleDelete}
                        >
                            <Text style={todoItemStyles.actionText}>🗑</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <ConfirmModal
                visible={isModalVisible}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                message="Êtes-vous sûr de vouloir supprimer cette tâche ?"
            />
        </View>
    );
}


const todoItemStyles = {
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    bulletContainer: {
        marginRight: 12,
    },
    bullet: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#3bf670ff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    bulletDone: {
        backgroundColor: '#3bf66dff',
        borderColor: '#3bf66aff',
    },
    checkmark: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        marginRight: 12,
    },
    todoContent: {
        fontSize: 16,
        color: '#1e293b',
        lineHeight: 22,
        letterSpacing: -0.2,
        fontWeight: '400',
    },
    todoContentDone: {
        color: '#94a3b8',
        textDecorationLine: 'line-through',
    },
    editInput: {
        fontSize: 16,
        color: '#1e293b',
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#3b82f6',
        flex: 1,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#f1a1d0ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    actionText: {
        fontSize: 16,
        color: '#475569',
    },

};