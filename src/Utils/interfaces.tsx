interface user {
  user: {
    id: string;
    name: string;
    phone: string;
    birthDate: string;
    email: string;
    role: string;
  };
}

export type FormValues = {
  email: string;
  password: string;
};

export interface LoginResult {
  login: {
    token: string;
    user: user;
  };
}

export interface UserListResult {
  users: {
    nodes: user
  }
}
