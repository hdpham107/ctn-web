/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */

export const onConnectionTimeout = (socket) => {
  socket.on('connect_timeout', () => {
    console.log('onConnectionTimeout', socket.id)
  })
}
export const onError = (socket) => {
  socket.on('error', (error) => {
    console.log('onError :', error)
  })
}
export const onReconnect = (socket) => {
  socket.on('reconnect', (attemptNumber) => {
    console.log('onReconnect :', attemptNumber)
  })
}
export const onReconnectAttempt = (socket) => {
  socket.on('reconnect_attempt', (attemptNumber) => {
    console.log('onReconnectAttempt :', attemptNumber)
  })
}
export const onReconnecting = (socket) => {
  socket.on('reconnecting', (attemptNumber) => {
    console.log('onReconnecting :', attemptNumber)
  })
}
export const onReconnectError = (socket) => {
  socket.on('reconnect_error', (error) => {
    console.log('onReconnectError :', error)
  })
}
export const onReconnectFailed = (socket) => {
  socket.on('reconnect_failed', () => {
    console.log('onReconnectFailed :', socket.id)
  })
}
export const onDisconnect = (socket, store) => {
  socket.on('disconnect', (reason) => {
    console.log('onDisconnect :', reason)
    // store.dispatch(fullActions.disConnectedToServer())
  })
}
export const onPing = (socket) => {
  socket.on('ping', () => {
    // console.log('onPing')
  })
}
export const onPong = (socket) => {
  socket.on('pong', (msg) => {
    // console.log('onPong :', msg)
  })
}
