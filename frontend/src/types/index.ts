import { IconSymbolName } from "@/components/ui/icon-symbol";

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
  groupLeader: User,
  members: User[],
};

export type MapPin = {
  title: string,
  activityId: number,
  description?: string,
  icon?: {
    name: IconSymbolName,
    color: string,
  },
  coordinates: {
    lat: number, 
    lon: number,
  },
};