import { addDays, format, set, subDays } from "date-fns";
import { createContext, useContext, useEffect, useState } from "react";

type WorkoutContext = {
  split: string | null;
  addSplit: (splits: string) => void;
  date: string;
  handleSetDate: (direction: string) => void;
  addWorkout: (exercises: any) => void;
  workouts: any;
  setWorkouts: any;
  setSplit: any;
};

export const WorkoutContext = createContext<WorkoutContext | {}>({});

type WorkOutProviderProps = {
  children: React.ReactNode;
};

export const WorkoutProvider = ({ children }: WorkOutProviderProps) => {
  const [split, setSplit] = useState<string | null>("Push");

  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  const [workouts, setWorkouts] = useState({});

  let currentWorkout = [];

  const addSplit = (splits) => {
    setSplit(splits);
  };

  const handleSetDate = (direction: string) => {
    if (direction === "minusDay") {
      const newDate = format(subDays(new Date(date), 1), "yyyy-MM-dd");

      setDate(newDate);
    }
    if (direction === "plusDay") {
      const newDate = format(addDays(new Date(date), 1), "yyyy-MM-dd");
      setDate(newDate);
    }
    if (direction === "today") {
      const newDate = format(new Date(), "yyyy-MM-dd");
      setDate(newDate);
    }
  };

  const addWorkout = (exercises) => {
    const newWorkout = {
      date: date,
      split: split,
      exercises: exercises,
    };
    const workoutExists = workouts.some((workout) => workout.date === date);
    if (workoutExists) {
      const updatedWorkouts = workouts.map((workout) =>
        workout.date === date
          ? { ...workout, exercises: [...workout.exercises, ...exercises] }
          : workout
      );
      setWorkouts(updatedWorkouts);
      return;
    } else {
      setWorkouts([...workouts, newWorkout]);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        split,
        addSplit,
        date,
        handleSetDate,
        addWorkout,
        workouts,
        setWorkouts,

        setSplit,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

//export const useWorkouts = () => useContext(WorkoutContext);
