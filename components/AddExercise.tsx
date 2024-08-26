import { FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import uuid from 'react-native-uuid';
import { format } from 'date-fns';


import popularExercises from '../data/popularExercises';
import Button from './Button';
import { setItem } from '../utils/AsyncStorage';






export default function AddExercise() {
    const [exerciseName, setExerciseName] = useState<string>("")
    const [weight, setWeight] = useState<number | null>(null)
    const [reps, setReps] = useState<number | null>(null)
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [workouts, setWorkouts] = useState({})

    const addNewExercise = () => {

        if (exerciseName === "" || weight === null || reps === null) {
            alert('Fill in all fields')
            return false;
        }
        //const newExercise = `${exerciseName} ${weight}kg for ${reps} reps`
        const newExercise = {
            id: uuid.v4(),
            name: exerciseName,
            weight: weight,
            reps: reps
        }


     
        //setExercises(exercises => [...exercises, newExercise])
        setExercises(prevExercises => ([...prevExercises, newExercise]))



        // this.setExercises({ 
        //     exercises : [...exercises, newExercise] 
        //   }, 
        //   () => console.log(exercises),
        // )
         const todaysDate = format(new Date(), 'dd-MM-yyyy')



    //     let workoutExists = false

    //     Object.keys(workouts).forEach(key => {
    //         if (obj[key] === todaysDate) workoutExists = true
    //       });

    //     if (!workoutExists) {
    //         const newWorkout = { 
    //             date: todaysDate,
    //             exercises: exercises
    //         }
    //         setWorkouts({...workouts, newWorkout})

    //     }

     //  setWorkouts(todaysDate[PrevExercises])

        

        setExerciseName("")
        setWeight(null)
        setReps(null)
        setFilteredExercises([]);
    }

    useEffect(() => {
      const todaysDate = format(new Date(), 'dd-MM-yyyy')
   //setWorkouts({[todaysDate]: exercises})
   setWorkouts(prevWorkouts => ({ ...prevWorkouts, [todaysDate]: exercises}))
  // console.log(workouts[todaysDate])
 //console.log(exercises)
    },[exercises])

    const removeExercise = (exerciseId: string) => {
        const newExerciseArray = exercises.filter((item) => item.id !== exerciseId);
        setExercises(newExerciseArray)
    }

    type selectExerciseProps = {
        exercise: string | number
    }

    const selectExercise = (exercise: selectExerciseProps) => {
   
          setExerciseName(exercise);
          setFilteredExercises([]);
   
      };

 

      const handleExerciseNameChange = (text: string) => {
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
                        ({ item }: Exercise) =>
                            <View style={styles.exerciseRow}>
                                <Text>{`${item.name} ${item.weight}kg for ${item.reps} reps`}</Text>                            
                                <Button 
                                backgroundColor='orange'
                                onPress={() => removeExercise(item.id)}
                                fontSize={16}
                                color='#333'
                                btnText='Remove'
                                />
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
                          <Pressable key={index} onPress={() => selectExercise(exercise)}>
                            <Text style={styles.dropdownItem}>{exercise}</Text>
                          </Pressable>
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

            <Button
                backgroundColor='#32a852'
                onPress={addNewExercise}
                fontSize={16}
                color='#fff'
                btnText='Add Exercise'
            />

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
        	paddingHorizontal: 5
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