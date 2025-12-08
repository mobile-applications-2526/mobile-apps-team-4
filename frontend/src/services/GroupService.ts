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

const create = async ({ name, description }: { name: string, description?: string }): Promise<Group> => {
  const res = await api.post<Group>(`/groups/create?name=${name}`, {
    name,
    description,
  });
  return res.data;
};

const deleteGroup = async (id: number): Promise<void> => {
  await api.delete<void>(`/groups/${id}`);
};

// invites

const inviteUser = async ({ groupId, userId }: { groupId: number, userId: number }): Promise<Group> => {
  const res = await api.put<Group>(`/groups/invite/${groupId}/${userId}`);
  return res.data;
};

const declineInvite = async ({ groupId }: { groupId: number }): Promise<void> => {
  await api.put<void>(`/groups/decline-invite/${groupId}`);
};

const acceptInvite = async ({ groupId }: { groupId: number }): Promise<void> => {
  await api.put<void>(`/groups/accept-invite/${groupId}`);
};

const cancelInvite = async ({ groupId, userId }: { groupId: number, userId: number }): Promise<void> => {
  await api.put<void>(`/groups/cancel-invite/${groupId}/${userId}`);
};

const GroupService = {
  getAll,
  get,
  getJoined,
  create,
  deleteGroup,
  inviteUser,
  declineInvite,
  acceptInvite,
  cancelInvite,
};

export default GroupService;