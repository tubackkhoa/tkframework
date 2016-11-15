// prefix integer with zero when nessessary 
export function pad(val) {
  val = parseInt(val, 10);
  return val >= 10 ? val : "0" + val
}

// display seconds in hh:mm:ss format
export function toTime(sec) {
  if(typeof sec === 'string')
    return sec  
  if(sec === undefined) 
    return '00:00'
  var h = Math.floor(sec / 3600)
  var min = Math.floor(sec / 60)
  sec = sec - (min * 60)
  
  if (h >= 1) {
    min -= h * 60
    return pad(h) + ":" + pad(min) + ":" + pad(sec)
  }
  
  return pad(min) + ":" + pad(sec)
}

// export function addClass(el, className) {
//   if(className) {    
//     el.classList.add(...className.trim().split (/\s+/))
//   }
// }

// export function removeClass(el, className) {
//   if(className) {
//     el.classList.remove(...className.trim().split (/\s+/))
//   }
// }