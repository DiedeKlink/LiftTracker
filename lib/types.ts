export type Workout = {
  split: string;
  exercises: Exercise[];
};

export type Exercise = {
  id: string;
  name: string;

  sets: Set[];
};

export type Set = {
  weight: number;
  reps: number;
};

export type Workouts = Workout[];

export type DirectionProps = "minusDay" | "plusDay" | "today";
