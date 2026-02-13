import React , {useContext,useEffect, useState} from 'react'
import Navigation from '../Navigation/Navigation'
import { View  ,Button, Text , TextInput} from 'react-native'
import TodoList from '../components/TodoList'
import {todo , todos }from '../components/TodoItem'
import { TokenContext, UsernameContext } from '../Context/Context'

    export default function TodoListScreen() {
    const [username] = useContext(UsernameContext);  
    const[token , setToken] = useContext(TokenContext);
             const [todoLists, setTodoLists] = useState([]);
     useEffect(() => {
        // Exemple de récupération des TodoLists
        const fetchTodoLists = async () => {
            // Simuler un appel à une API ou à un service
            // Remplacer par votre propre logique pour récupérer les TodoLists depuis votre base de données ou API
            const response = await fetch('/api/todolist', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setTodoLists(data);
        };

        fetchTodoLists();
    }, [token]); // Recharger quand le token change

    return(
        <View>
            <Text>Hello, {username}</Text>
          
          {todoLists.length === 0 ? (
                <Text>Vous n'avez aucune liste de tâches.</Text>
            ) : (
                <TodoLists/>
            )}
                   <Button title='create '/>
                   </View>
               
    );
}
*************************************************************************************
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import TodoList from './TodoList';  // Le composant pour afficher les TodoList
import todoData from '../Helpers/todoData';  // Simule des données si nécessaire

export default function TodoLists({ token }) {
    const [todoLists, setTodoLists] = useState([]);
    const [newTodoListTitle, setNewTodoListTitle] = useState('');

    // Récupérer les TodoLists au montage du composant
    useEffect(() => {
        const fetchTodoLists = async () => {
            try {
                // Exemple de récupération des TodoLists depuis l'API
                const response = await fetch('/api/todolist', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setTodoLists(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des TodoLists:', error);
            }
        };

        fetchTodoLists();
    }, [token]);

    // Fonction pour ajouter une nouvelle TodoList
    const addNewTodoList = async () => {
        if (newTodoListTitle.trim() === '') return;

        try {
            const response = await fetch('/api/todolist', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTodoListTitle }),
            });
            const newTodoList = await response.json();
            setTodoLists([...todoLists, newTodoList]);
            setNewTodoListTitle('');
        } catch (error) {
            console.error('Erreur lors de la création de la TodoList:', error);
        }
    };

    // Fonction pour supprimer une TodoList
    const deleteTodoList = async (id) => {
        try {
            await fetch(`/api/todolist/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setTodoLists(todoLists.filter(list => list.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la TodoList:', error);
        }
    };

    return (
        <View>
            {/* Formulaire pour ajouter une nouvelle TodoList */}
            <TextInput
                onChangeText={setNewTodoListTitle}
                placeholder='Titre de la nouvelle TodoList'
                value={newTodoListTitle}
                onSubmitEditing={addNewTodoList}
            />
            <Button title="Créer une nouvelle TodoList" onPress={addNewTodoList} />

            {/* Affichage des TodoLists */}
            {todoLists.length === 0 ? (
                <Text>Vous n'avez aucune liste de tâches.</Text>
            ) : (
                <FlatList
                    data={todoLists}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginVertical: 10 }}>
                            <Text>{item.title}</Text>
                            <TouchableOpacity onPress={() => deleteTodoList(item.id)}>
                                <Text style={{ color: 'red' }}>Supprimer cette liste</Text>
                            </TouchableOpacity>
                            {/* Vous pouvez intégrer le composant TodoList ici */}
                            <TodoList todoList={item} />
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    counterText: {
        fontSize: 18,
        marginVertical: 10,
    },
});
*******************************************************************

import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';
import TodoLists from '../components/TodoLists';

export default function TodoListScreen() {
    const [username] = useContext(UsernameContext);  
    const [token] = useContext(TokenContext);  // Récupérer le token pour l'utiliser dans TodoLists

    return (
        <View>
            <Text>Hello, {username}</Text>
            
            {/* Afficher le composant TodoLists avec le token */}
            <TodoLists token={token} />

            {/* Bouton pour créer une TodoList ou autres fonctionnalités */}
            <Button title='Créer une TodoList' onPress={() => console.log('Création de TodoList')} />
        </View>
    );
}


