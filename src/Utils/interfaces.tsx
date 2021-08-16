interface User {
<<<<<<< HEAD
  user: {
=======
>>>>>>> 80d39ed... fPagination now uses useMemo() and only current page elements are fetched
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
<<<<<<< HEAD
    nodes: User
  }
=======
    nodes: User[];
    count: number;
    pageInfo: {
      offset: number;
      limit: number;
    }
  };
>>>>>>> 80d39ed... fPagination now uses useMemo() and only current page elements are fetched
}
