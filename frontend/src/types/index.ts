

export type User = {
  id: number,
  name: string,
  email: string,
};

export type Activity = {
  id: number,
  date: Date,
  group: number,
};

export type Group = {
  id: number,
  name: string,
  owner: number,
  members: number[],
};