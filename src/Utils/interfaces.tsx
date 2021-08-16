export interface User {
    id: string;
    name: string;
    phone: string;
    birthDate: string;
    email: string;
    role: string;
  }

export type FormValues = {
  email: string;
  password: string;
};
export interface LoginResult {
  login: {
    token: string;
    user: User;
  };
}

export interface UserListResult {
  users: {
    nodes: User[];
    count: number;
    pageInfo: {
      offset: number;
      limit: number;
    }
  };
}
