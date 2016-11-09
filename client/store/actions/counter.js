
// action return plain object to describe the input state
export const actions = {
  onIncrement: () => ({    
    type: 'INCREMENT'    
  }),
  onDecrement: () => ({    
    type: 'DECREMENT'    
  }),
  onIncrementAsync: () => ({    
    type: 'INCREMENT_ASYNC'    
  })
}