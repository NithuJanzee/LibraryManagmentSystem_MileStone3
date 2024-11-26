export interface UserAccount {
  nic: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}


export interface UserLogin {
  nic: String,
  password: String
}

export interface LoggedUsers {
  token: string
}

export interface DecodedToken {
  NIC: string;
  Phone: string;
  email: string;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  nameid: string;
  nbf: number;
  role: string;
}

export interface UserTransactionById{
  lendID:number
  bookTitle:string
  authorName:string
  status:number
  requestDate:string
  requestDays:string
  rentDate:string
  dueDate:string
  todayDateminus2:string
  todayDateminus1:string
  actualDate:string
}