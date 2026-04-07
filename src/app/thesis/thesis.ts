import { User } from "../user/user";

export class Thesis {
  id!: number;
  studentName!: string;
  levelOfStudies!: string;
  languageOfThesis!: string;
  volumeEcts!: number;
  titleEstonian!: string;
  titleEnglish!: string;
  roles!: string[]
  sessionId!: number;
  sessionStartDate!: string;
  sessionEndDate!: string;
  finalGradeLetter?: string;
  finalGradeNumber?: string;
  studentSecondName?: string;
  studentEmail?: string;
  studentNumber?: string;
  committeeMembers?: User[];
  headOfCommittee?: User;
  reviewer?: User;
  supervisor?: User;
  coSupervisors?: User[];
}