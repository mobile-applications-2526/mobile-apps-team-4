import { Group } from "@/types";
import api from "./api";

const getAll = async (): Promise<Group[] | undefined> => {
  const res = await api.get<Group[]>('/groups/all');
  return res.data;
};

const get = async (id: number): Promise<Group | undefined> => {
  const res = await api.get<Group>(`/groups/${id}`);
  return res.data;
};

const getJoined = async (): Promise<Group[] | undefined> => {
  const res = await api.get<Group[]>('/groups/joined');
  return res.data;
};

const create = async ({ name, members, description}: { name: string, members?: number[], description?: string }): Promise<Group> => {
  const res = await api.post<Group>(`/groups/create?name=${name}`, {
    name,
    description,
    members,
  });
  return res.data;
};

const GroupService = {
  getAll,
  get,
  getJoined,
  create,
};

export default GroupService;