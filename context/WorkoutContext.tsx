import { addDays, format, subDays } from "date-fns";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Exercise, Workout } from "../lib/types";
import { getItem, removeItem, setItem } from "../utils/AsyncStorage";
import uuid from "react-native-uuid";
import { popularExercises } from "../data/popularExercises";

type DirectionProps = "minusDay" | "plusDay" | "today";

type WorkoutContext = {
  split: string | null;
  addSplit: (splits: string) => void;
  date: string;
  handleSetDate: (direction: DirectionProps) => void;
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
};

export const WorkoutContext = createContext<WorkoutContext | null>(null);

type WorkOutProviderProps = {
  children: React.ReactNode;
};

export const WorkoutProvider = ({ children }: WorkOutProviderProps) => {
  const [exerciseName, setExerciseName] = useState<string>("");
  const [weight, setWeight] = useState<number | null>(null);
  const [reps, setReps] = useState<number | null>(null);
  const [split, setSplit] = useState<string | null>("Push");

  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  const [workouts, setWorkouts] = useState<Record<string, Workout>>({
    [date]: {
      split: split as string,
      exercises: [],
    },
  });

  const [filteredExercises, setFilteredExercises] = useState<string[]>([]);
  const [userExercises, setUserExercises] = useState<string[]>([]);
  const totalExercises = [...popularExercises, ...userExercises];

  useEffect(() => {
    getItem("workouts").then((data) => {
      if (data) {
        setWorkouts(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  // useEffect(() => {
  //   removeItem("workouts");
  // }, []);

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
    }, []);

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

  useEffect(() => {
    getItem("userExercises").then((data) => {
      if (data) {
        setUserExercises(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    setItem("userExercises", JSON.stringify(userExercises));
  }, [workouts]);

  const removeUserExercise = (exercise: string) => {
    setUserExercises((prev) => prev.filter((ex) => ex !== exercise));
    setFilteredExercises([]);
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

  const handleSetDate = (direction: DirectionProps) => {
    let newDate;
    if (direction === "minusDay") {
      newDate = format(subDays(new Date(date), 1), "yyyy-MM-dd");
    }
    if (direction === "plusDay") {
      newDate = format(addDays(new Date(date), 1), "yyyy-MM-dd");
    }
    if (direction === "today") {
      newDate = format(new Date(), "yyyy-MM-dd");
    }
    if (newDate) {
      setDate(newDate);
    }
  };

  const contextValue = useMemo(
    () => ({
      split,
      addSplit,
      date,
      handleSetDate,
      workouts,
      setWorkouts,
      setSplit,
      setDate,
      formattedExercises,
      handleExerciseNameChange,
      exerciseName,
      filteredExercises,
      selectExercise,
      removeUserExercise,
      userExercises,
      weight,
      setWeight,
      reps,
      setReps,
      addNewExercise,
      removeExercise,
    }),
    [
      split,
      addSplit,
      date,
      handleSetDate,
      workouts,
      setWorkouts,
      setSplit,
      setDate,
      formattedExercises,
      handleExerciseNameChange,
      exerciseName,
      filteredExercises,
      selectExercise,
      removeUserExercise,
      userExercises,
      weight,
      setWeight,
      reps,
      setReps,
      addNewExercise,
      removeExercise,
    ]
  );

  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
};

//export const useWorkouts = () => useContext(WorkoutContext);
