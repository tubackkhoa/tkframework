export class Viewer extends Object {
  constructor(id){
    super()
    this.type = 'Viewer'
    this.id = id
  }  
}

export const getViewer = id =>
  new Promise(resolve => resolve(new Viewer(id)))
