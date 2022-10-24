export interface IJwtPayload {
  email: string;
  _id: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export interface IRegister {
  email: string;
  username: string;
  password: string;
  ref?: string | number;
}

export interface ICreateSubRedit {
  name: string;
  communityType: string;
  adultContent?: boolean;
}

export interface ISubReddit {
  name: string;
  communityType: string;
  adultContent: boolean;
  userId: string;
  _id: string;
  __v: number;
}
