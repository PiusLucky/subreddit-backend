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

export interface IUser {
  _id: ID;
  verifyMailToken: VerifyMailToken;
  login: Login;
  verification: Verification;
  referral: Referral;
  role: string;
  status: boolean;
  twoFA: boolean;
  twoFAValidated: boolean;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  verified: boolean;
  created: Created;
  email: string;
  password: string;
  username: string;
  __v: number;
  address: string;
  city: string;
  country: string;
  dateOfBirth: Created;
  firstName: string;
  lastName: string;
  state: string;
  twoFASecret: TwoFASecret;
  verifyPhoneToken: VerifyPhoneToken;
  phone: string;
  middleName: string;
  resetPasswordToken: ResetPasswordToken;
  stats: Stats;
}

export interface ID {
  $oid: string;
}

export interface Created {
  $date: DateClass;
}

export interface DateClass {
  $numberLong: string;
}

export interface Login {
  count: number;
  date: Created;
}

export interface Referral {
  code: number;
}

export interface ResetPasswordToken {
  expires: Created;
  status: boolean;
  token: string;
}

export interface Stats {
  totalTrades: number;
  averageTradeSpeed: number;
  completedTrades: number;
  btcTraded: number;
  cancelledTrades: number;
  ethTraded: number;
  usdtTraded: number;
}

export interface TwoFASecret {
  ascii: string;
  hex: string;
  base32: string;
  otpauth_url: string;
}

export interface Verification {
  userProfile: boolean;
  bank: boolean;
  bvn: boolean;
  id_card: boolean;
  face: boolean;
  address: string;
  completeVerification: CompleteVerification;
}

export interface CompleteVerification {
  status: string;
}

export interface VerifyMailToken {
  token: string;
  expires: Created;
}

export interface VerifyPhoneToken {
  expires: Created;
  phone: string;
  token: string;
}
