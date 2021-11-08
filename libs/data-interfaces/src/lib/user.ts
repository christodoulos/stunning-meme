export interface User {
  uid: string;
  username: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photo?: string;
}
