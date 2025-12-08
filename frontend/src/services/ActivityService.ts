import { Activity, ActivityCreate } from "@/types";
import api from "./api";

const getAll = async ({ latitude, longitude }: { latitude?: number, longitude?: number }): Promise<Activity[] | undefined> => {
  const params = new URLSearchParams();

  if (latitude) params.append('latitude', latitude.toString());
  if (longitude) params.append('longitude', longitude.toString());

  const queryString = params.toString();
  const url = '/activities/all' + (queryString ? `?${queryString}` : '');

  const res = await api.get<Activity[]>(url);
  return res.data;
};

const get = async (id: number): Promise<Activity | undefined> => {
  const res = await api.get<Activity>(`/activities/${id}`);
  return res.data;
};

const getByGroup = async (groupId: number): Promise<Activity[] | undefined> => {
  const res = await api.get<Activity[]>(`/activities/group/${groupId}`);
  return res.data;
};

const join = async (id: number): Promise<Activity | undefined> => {
  const res = await api.put<Activity>(`/activities/join/${id}`);
  return res.data;
};

const leave = async (id: number): Promise<Activity | undefined> => {
  const res = await api.put<Activity>(`/activities/leave/${id}`);
  return res.data;
};

const getJoined = async (): Promise<Activity[] | undefined> => {
  const res = await api.get<Activity[]>('/activities/joined');
  return res.data;
};

const create = async (activity: ActivityCreate): Promise<Activity | undefined> => {
  const res = await api.post<Activity>(`/activities/create/${activity.group}`, activity);
  return res.data;
};

const deleteActivity = async (id: number): Promise<void> => {
  const res = await api.delete<void>(`/activities/${id}`);
  return res.data;
};

const ActivityService = {
  getAll,
  get,
  getByGroup,
  join,
  leave,
  getJoined,
  create,
  deleteActivity,
};

export default ActivityService;