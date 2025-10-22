import { IconSymbolName } from "@/components/ui/icon-symbol";

export type User = {
  id: number,
  name: string,
  email: string,
};

export type Activity = {
  id: number,
  title: string,
  date: Date,
  group: number,
  description?: string,
  icon?: {
    name: IconSymbolName,
    color: string,
  },
  coordinates: {
    lat: number, 
    lon: number,
  },
  peopleGoing?: User[],
};

export type Group = {
  id: number,
  name: string,
  owner: User,
  members: User[],
  description?: string,
};