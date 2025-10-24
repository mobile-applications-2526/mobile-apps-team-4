import { Activity } from "@/types";
import api from "./api";

const getAll = async (): Promise<Activity[] | undefined> => {
  try {
    const res = await api.get<Activity[]>('/activities');
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

const ActivityService = {
  getAll,
  get,
};

export default ActivityService;