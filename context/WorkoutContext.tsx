import { addDays, format, subDays } from "date-fns";
import { createContext, useEffect, useState } from "react";
import { Workout, Workouts } from "../lib/types";
import { getItem, setItem } from "../utils/AsyncStorage";

type DirectionProps = "minusDay" | "plusDay" | "today";

type WorkoutContext = {
  split: string | null;
  addSplit: (splits: string) => void;
  date: string;
  handleSetDate: (direction: DirectionProps) => void;
  workouts: Record<string, Workout>;
  setWorkouts: any;
  setSplit: any;
  setDate: any;
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
      split: split as string,
      exercises: [],
    },
  });

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
        setDate,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

//export const useWorkouts = () => useContext(WorkoutContext);
