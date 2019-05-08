export default class Note {
  public content: string = ''
  public loading: boolean = false

  public constructor(content: string) {
    this.content = content
  }
}