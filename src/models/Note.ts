export default class Note {
  public content: string = ''
  public editedContent: string = null
  public showEdit? = true

  public loading: boolean = false
  public constructor(content: string) {
    this.content = content
  }
}