import axios from 'axios';

export const client_delete = (id: string) => axios.delete(`/post/${id}`);
