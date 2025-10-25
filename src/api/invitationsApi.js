import api from './api';


export const createInvitation = (roomId, payload) =>
  api.post(`/rooms/${roomId}/invitations`, payload);

export const getInvitationDetails = (token) =>
  api.get(`/invitations/${token}`);

export const acceptInvitation = (token) =>
  api.post(`/invitations/${token}/accept`);

export const listInvitations = (roomId) =>
  api.get(`/rooms/${roomId}/invitations/list`);

export const resendInvitation = (invitationId) =>
  api.post(`/invitations/${invitationId}/resend`);

export default { createInvitation, getInvitationDetails, acceptInvitation, listInvitations, resendInvitation };
