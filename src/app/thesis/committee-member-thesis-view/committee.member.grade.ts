export class CommitteeMemberGrade {
  constructor(
    public id: number,
    public thesisId: number,
    public contentScore: number,
    public complexityScore: number,
    public appearanceScore: number,
    public presentationScore: number,
    public name: string,
    public secondName: string,
    public visibleToOthers: boolean
  ) {}
}