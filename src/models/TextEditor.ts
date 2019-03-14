export default class TextEditor {
  public raw = null
  public html = null

  constructor(raw: string, html: string) {
    this.raw = raw
    this.html = html
  }

  public getRawObject() {
    return JSON.parse(this.raw)
  }
}