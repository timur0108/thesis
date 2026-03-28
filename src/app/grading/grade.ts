export class ReviewerGrade {
  constructor(
    public thesisId: number,
    public contentScore: number,
    public contentReasoning: string,
    public complexityScore: number,
    public complexityReasoning: string,
    public appearanceScore: number,
    public appearanceReasoning: string,
    public questions: string,
    public evaluationSummary: string,
    public name: string,
    public secondName: string
  ) {}
}

export class FinalGrade {
  constructor(
    public thesisId: number,
    public contentScore: number,
    public complexityScore: number,
    public appearanceScore: number,
    public presentationScore: number,
    public totalScore: number,
    public letterGrade: string
  ) {}
}