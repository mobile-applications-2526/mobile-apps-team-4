import { Group } from "@/types";
import api from "./api";

const getAll = async (): Promise<Group[] | undefined> => {
  try {
    const res = await api.get<Group[]>('/groups/all');
    return res.data;
  } catch (err) {
    throw err;
  }
};

const get = async (id: number): Promise<Group | undefined> => {
  try {
    const res = await api.get<Group>(`/groups/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

const GroupService = {
  getAll,
  get,
};

export default GroupService;