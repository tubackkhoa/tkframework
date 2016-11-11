import test from 'tape'

// import { getTodo, Todo } from 'data/database'

test('getTodo Database test', (assert) => {

  // const todo = getTodo(1)

  // console.log(todo)
  
  class Viewer extends Object { 
    // constructor() { 
    //   super()
    //   this.type = 'viewerType'
    // } 
  }

  const getViewer = () => new Viewer({type:'viewerType'})

  console.log(getViewer())
  

  assert.end()
})