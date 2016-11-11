export class Viewer extends Object {
  constructor(){
    super()
    this.type = 'viewerType'
  }  
}

export const getViewer = () => new Viewer()

