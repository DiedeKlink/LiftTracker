import { addDays, format, subDays } from "date-fns";
import { createContext, useState } from "react";
import { Workouts } from "../lib/types";

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

  const [workouts, setWorkouts] = useState<Workouts | {}>({});

  let currentWorkout = [];

  const addSplit = (splits: string) => {
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
