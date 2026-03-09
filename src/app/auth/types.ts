export enum Role {
  COMMITTEE_MEMBER = 'COMMITTEE_MEMBER',
  HEAD_OF_COMMITTEE = 'HEAD_OF_COMMITTEE',
  REVIEWER = 'REVIEWER'
}

export interface User {
    email: string, 
    role: Role
}