import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Exercise, Workout } from "../lib/types";
import uuid from "react-native-uuid";
import { popularExercises } from "../data/popularExercises";
import { useUserExercises, useWorkouts } from "../lib/hooks";
import { setItem } from "../utils/AsyncStorage";

type WorkoutContext = {
  split: string | null;
  addSplit: (splits: string) => void;
  date: string;
  workouts: Record<string, Workout>;
  setWorkouts: React.Dispatch<React.SetStateAction<Record<string, Workout>>>;
  setSplit: React.Dispatch<React.SetStateAction<string | null>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  formattedExercises: Exercise[];
  handleExerciseNameChange: (text: string) => void;
  exerciseName: string;
  filteredExercises: string[];
  selectExercise: (exercise: string) => void;
  removeUserExercise: (exercise: string) => void;
  userExercises: string[];
  weight: number | null;
  setWeight: React.Dispatch<React.SetStateAction<number | null>>;
  reps: number | null;
  setReps: React.Dispatch<React.SetStateAction<number | null>>;
  addNewExercise: () => void;
  removeExercise: (exerciseId: string) => void;
  setFilteredExercises: React.Dispatch<React.SetStateAction<string[]>>;
};

export const WorkoutContext = createContext<WorkoutContext | null>(null);

type WorkOutProviderProps = {
  children: React.ReactNode;
};

export const WorkoutProvider = ({ children }: WorkOutProviderProps) => {
  const [exerciseName, setExerciseName] = useState<string>("");
  const [weight, setWeight] = useState<number | null>(null);
  const [reps, setReps] = useState<number | null>(null);

  const { date, setDate, split, setSplit, workouts, setWorkouts } =
    useWorkouts();

  const {
    userExercises,
    setUserExercises,
    removeUserExercise,
    setFilteredExercises,
    totalExercises,
    filteredExercises,
  } = useUserExercises();

  useEffect(() => {
    setItem("userExercises", JSON.stringify(userExercises));
  }, [workouts]);

  useEffect(() => {
    setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const addNewExercise = useCallback(() => {
    if (exerciseName === "" || weight === null || reps === null) {
      alert("Fill in all fields");
      return false;
    }

    const newExercise = {
      id: uuid.v4().toString(),
      name: exerciseName,
      sets: [
        {
          weight: weight,
          reps: reps,
        },
      ],
    };

    const newWorkout = {
      [date]: {
        split: split || "",
        exercises: [newExercise],
      },
    };

    setWorkouts((prev) => {
      if (prev[date]) {
        return {
          ...prev,
          [date]: {
            ...prev[date],
            exercises: [...prev[date].exercises, newExercise],
          },
        };
      } else {
        return {
          ...prev,
          ...newWorkout,
        };
      }
    });

    if (
      !popularExercises.includes(exerciseName) &&
      !userExercises.includes(exerciseName)
    ) {
      setUserExercises((prev) => [...prev, exerciseName]);
    }

    setExerciseName("");
    setWeight(null);
    setReps(null);
    setFilteredExercises([]);
  }, [
    exerciseName,
    weight,
    reps,
    date,
    split,
    popularExercises,
    userExercises,
  ]);

  const removeExercise = (exerciseId: string) => {
    const updatedExercises = workouts[date].exercises.filter(
      (exercise: Exercise) => exercise.id !== exerciseId
    );

    setWorkouts((prev) => {
      return {
        ...prev,
        [date]: {
          ...prev[date],
          exercises: updatedExercises,
        },
      };
    });
  };

  const addSplit = (splits: string) => {
    setSplit(splits);

    setWorkouts((prev) => {
      return {
        ...prev,
        [date]: {
          ...prev[date],
          split: splits,
        },
      };
    });
  };

  const selectExercise = (exercise: string) => {
    setExerciseName(exercise);
    setFilteredExercises([]);
  };

  const handleExerciseNameChange = (text: string) => {
    setExerciseName(text);

    if (text) {
      setFilteredExercises(
        totalExercises.filter((exercise) =>
          exercise.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setFilteredExercises([]);
    }
  };

  const reversedExercises = useMemo(() => {
    return [...(workouts[date]?.exercises || [])].reverse();
  }, [workouts, date]);

  const formattedExercises: Exercise[] = useMemo(
    () =>
      reversedExercises.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
        id: exercise.id,
      })),
    [reversedExercises]
  );

  const contextValue = useMemo(
    () => ({
      split,
      addSplit,
      date,

      workouts,
      setWorkouts,
      setSplit,
      setDate,
      formattedExercises,
      handleExerciseNameChange,
      exerciseName,
      selectExercise,
      removeUserExercise,
      userExercises,
      weight,
      setWeight,
      reps,
      setReps,
      addNewExercise,
      removeExercise,
      filteredExercises,
      setFilteredExercises,
    }),
    [
      split,
      addSplit,
      date,

      workouts,
      setWorkouts,
      setSplit,
      setDate,
      formattedExercises,
      handleExerciseNameChange,
      exerciseName,
      selectExercise,
      removeUserExercise,
      userExercises,
      weight,
      setWeight,
      reps,
      setReps,
      addNewExercise,
      removeExercise,
      filteredExercises,
      setFilteredExercises,
    ]
  );

  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
};

//export const useWorkouts = () => useContext(WorkoutContext);
export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error(
      "WorkoutContext must be used within a WorkoutContextProvider"
    );
  }
  return context;
}
