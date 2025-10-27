import { IconSymbolName } from "@/components/ui/icon-symbol";

export type User = {
  id: number,
  name: string,
  email: string,
};

export type Activity = {
  id: number,
  name: string,
  description?: string,
  icon: {
    name: IconSymbolName,
    color: string,
  },
  location: {
    latitude: number, 
    longitude: number,
  },
  startDate: string, // iso string
  endDate?: string,  // iso string
  hostedByGroupId: number,
  participantIds: number[],
  maxAmountOfParticipants?: number,
};

export type ActivityCreate = {
  name: string,
  group: number,
  location: {
    latitude: number, 
    longitude: number,
  },
  icon: {
    iconSymbolName: string,
    iconColor: string,
  },
  startDate: string, // iso string
  endDate?: string,  // iso string
  maxAmountOfParticipants?: number,
};

export type Group = {
  id: number,
  name: string,
  owner: User,
  members: User[],
  description?: string,
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type OverflowMenuOption = {
  label: string,
  onPress: () => void,
  disabled?: boolean,
  icon?: IconSymbolName,
};

export type ApiError = {
  errorCode: number,
  message: string,
  type: string,
}