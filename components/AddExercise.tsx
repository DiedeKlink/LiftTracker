import { FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import uuid from 'react-native-uuid';


import popularExercises from '../data/popularExercises';





export default function AddExercise() {
    const [exerciseName, setExerciseName] = useState<string>("")
    const [weight, setWeight] = useState<number | null>(null)
    const [reps, setReps] = useState<number | null>(null)
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);

    const addNewExercise = () => {
        if (exerciseName === "" || weight === null || reps === null) {
            alert('Fill in all fields')
        }
        //const newExercise = `${exerciseName} ${weight}kg for ${reps} reps`
        const newExercise = {
            id: uuid.v4(),
            name: exerciseName,
            weight: weight,
            reps: reps
        }
        setExercises(excercises => [...excercises, newExercise])

        setExerciseName("")
        setWeight(null)
        setReps(null)
        setFilteredExercises([]);
        console.log(newExercise)
    }

    const removeExercise = (exerciseId: string) => {
        const newExerciseArray = exercises.filter((item) => item.id !== exerciseId);
        setExercises(newExerciseArray)
    }


    const selectExercise = (exercise) => {
   
          setExerciseName(exercise);
          setFilteredExercises([]);
   
      };

      const handleExerciseNameChange = (text) => {
        setExerciseName(text);
        if (text) {
          setFilteredExercises(
            popularExercises.filter(exercise =>
              exercise.toLowerCase().includes(text.toLowerCase())
            )
          );
        } else {
          setFilteredExercises([]);
        }
      };
   
    return (
        <>
            <View>
                <FlatList
                    data={exercises}
                    renderItem={
                        ({ item }) =>
                            <View style={styles.exerciseRow}>
                                <Text>{`${item.name} ${item.weight}kg for ${item.reps} reps`}</Text>
                                <Pressable
                                    onPress={() => removeExercise(item.id)}
                                    style={styles.btnStyle}
                                >
                                    <Text>Remove</Text>
                                </Pressable>
                            </View>
                    }
                    keyExtractor={(item, index) => index}
                    keyboardShouldPersistTaps='handled'
                />
            </View>
            <TextInput
                style={styles.inputStyle}
                onChangeText={handleExerciseNameChange}
                value={exerciseName}
                placeholder='Exercise Name'
            />
           
            {filteredExercises.length > 0 && (
                  <View style={styles.autocompleteContainer}>
                    <View style={styles.dropdown}>
                      <View>
                        {filteredExercises.map((exercise, index) => (
                          <TouchableOpacity key={index} onPress={() => selectExercise(exercise)}>
                            <Text style={styles.dropdownItem}>{exercise}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>
                )}
        
            <View style={styles.row}>
                <TextInput
                    style={[styles.inputStyle, styles.inputRowStyle]}
                    placeholder='Weight'
                    keyboardType="numeric"
                    onChangeText={setWeight}
                    value={weight}
                />
                <TextInput
                    style={[styles.inputStyle, styles.inputRowStyle, styles.marginLeft]}
                    placeholder='Reps'
                    keyboardType="numeric"
                    onChangeText={setReps}
                    value={reps}
                />
            </View>
            <Pressable style={styles.btnStyle}
                onPress={addNewExercise}>
                <Text style={styles.btnText}>Add Exercise</Text>
            </Pressable>

        </>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 10,

    },
    btnStyle: {
        backgroundColor: '#32a852',
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 8,

    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',

    },
    row: {
        flexDirection: 'row',

    },
    inputRowStyle: {
        flex: 1,
        flexGrow: 1,


    },
    marginLeft: {
        marginLeft: 12
    },
    exerciseRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //width: '50%'
    },
    dropdown: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        borderTopWidth: 0,
        maxHeight: 200,
        overflow: 'scroll',
        zIndex: 2,
      },
      dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
      },
      autocompleteContainer: {
        position: 'relative',
        width: '100%',
        top: 0,
        borderRadius: 8,
      }

})