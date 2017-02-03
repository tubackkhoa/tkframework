export default {
  
  container: {
    marginTop: 20,
  },

  normal: {
    width: 200,
    height: 200,  
    border:'2px dashed #eee',    
    textAlign: 'center',    
  },
  
  active: {
    backgroundColor: '#ccc',
  },

  center: {
    left: '50%',
    position: 'absolute',
    top: '50%',        
    maxHeight: '90%',
    maxWidth: '90%',
    '-ms-transform': 'translate(-50%,-50%)',
    '-webkit-transform': 'translate(-50%,-50%)',
    transform: 'translate(-50%,-50%)',
  }
}

