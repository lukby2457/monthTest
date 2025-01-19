export interface UserProfile {
  id: string;
  password: string;
  nickname: string;
}

export type SetUser = React.Dispatch<React.SetStateAction<UserProfile | null>>;
