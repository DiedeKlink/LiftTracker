import { addDays, format, subDays } from "date-fns";
import { createContext, useEffect, useState } from "react";
import { Workout, Workouts } from "../lib/types";

type WorkoutContext = {
  split: string | null;
  addSplit: (splits: string) => void;
  date: string;
  handleSetDate: (direction: string) => void;
  workouts: any;
  setWorkouts: any;
  setSplit: any;
};

export const WorkoutContext = createContext<WorkoutContext | null>(null);

type WorkOutProviderProps = {
  children: React.ReactNode;
};

export const WorkoutProvider = ({ children }: WorkOutProviderProps) => {
  const [split, setSplit] = useState<string | null>("Push");

  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  const [workouts, setWorkouts] = useState<Record<string, Workout>>({
    [date]: {
      split: split,
      exercises: [],
    },
  });

  const addSplit = (splits: string) => {
    setSplit(splits);

    const newWorkout = {
      [date]: {
        split: splits,
        exercises: [],
      },
    };
    setWorkouts((prev: Record<string, Workout>) => {
      if (prev[date]) {
        return {
          ...prev,
          [date]: {
            ...prev[date],
            split: splits,
          },
        };
      } else {
        return {
          ...prev,
          ...newWorkout,
        };
      }
    });
  };

  const handleSetDate = (direction: string) => {
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

  // useEffect(() => {
  //   setSplit((prev) => {
  //     // return workouts[date]?.split || prev;
  //     if (workouts[date]) {
  //       return workouts[date].split;
  //     }
  //     return "Push";
  //   });
  // }, [date, workouts]);

  return (
    <WorkoutContext.Provider
      value={{
        split,
        addSplit,
        date,
        handleSetDate,
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
