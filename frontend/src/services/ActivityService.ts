import { Activity } from "@/types";
import api from "./api";

const getAll = async (): Promise<Activity[] | undefined> => {
  try {
    const res = await api.get<Activity[]>('/activities/all');
    return res.data;
  } catch (err) {
    throw err;
  }
};

const get = async (id: number): Promise<Activity | undefined> => {
  try {
    const res = await api.get<Activity>(`/activities/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

const getByGroup = async (groupId: number): Promise<Activity[] | undefined> => {
  try {
    const res = await api.get<Activity[]>(`/activities/group/${groupId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

const join = async (id: number): Promise<Activity | undefined> => {
  try {
    const res = await api.put<Activity>(`/activities/join/${id}`);
    return res.data;
  } catch (err) {
    console.log('ERROR SERVICE:', err)
    throw err;
  }
};

const leave = async (id: number): Promise<Activity | undefined> => {
  try {
    const res = await api.put<Activity>(`/activities/leave/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

const getJoined = async (): Promise<Activity[] | undefined> => {
  try {
    const res = await api.get<Activity[]>('/activities/joined');
    return res.data;
  } catch (err) {
    throw err;
  }
};

const ActivityService = {
  getAll,
  get,
  getByGroup,
  join,
  leave,
  getJoined,
};

export default ActivityService;