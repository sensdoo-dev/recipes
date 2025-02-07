export type TLoginData = {
  email: string;
  password: string;
}

export type TRegistrData = {
  firstName: string;
  lastName: string;
} & TLoginData

export type TUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TUserWithToken = {
  user: TUser;
  accessToken: string;
};
