import socketio from 'socket.io'
import { v4 } from 'uuid'

const chatServer = server => {

  const websocket = socketio(server)

  // When a user sends a message in the chatroom.
  const onMessageReceived = (message, senderSocket) => {    
    var messageData = {
      text: message.text,
      user: message.user,
      _id: v4(),
      createdAt: new Date(message.createdAt),
      chatId: 1,
    }

    senderSocket.broadcast.emit('message', [messageData])
  }

  websocket.on('connection', (socket) => {
    console.log('A client just joined on', socket.id)
    socket.on('message', (message) => {      
      console.log(`client ${socket.id} sent ${message.text}`)      
      socket.on('message', (message) => onMessageReceived(message, socket))
    })
  })

  return websocket
}

export default chatServer