import { User } from "../models/user.model";

export interface ShowUsers {
  total?: number;
  usuarios?: User[];
}
