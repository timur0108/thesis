import { Thesis } from "../thesis/thesis";
import { User } from "../user/user";

export class Session {
  id!: number;
  startDate!: string;
  endDate!: string;
}

export class SessionCreateDTO {
  startDate!: string;
  endDate!: string;
  committeeMemberIds!: number[];
  headOfCommitteeId!: number;
}

export class SessionWithThesesDTO {
  id!: number;
  startDate!: string;
  endDate!: string;
  theses!: Thesis[];
  committeeMembers!: User[];
  headOfCommittee!: User;
}