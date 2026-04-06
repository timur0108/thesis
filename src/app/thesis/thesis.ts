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
}