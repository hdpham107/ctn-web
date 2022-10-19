import ss from 'socket.io-stream';

const fileUploadChangePercent = () => ({});

export const trackingClient = (socket) => {
  console.log('ClientID :', socket.id, ' is connected');
  console.log('io.sockets.clients :'.sockets);
};
export const sendCommentAttachment = (socket, fileObject, user, store) => {
  const stream = ss.createStream();
  console.log('emit comment-attachment !');
  // upload a file to the server.
  ss(socket).emit(
    'comment-attachment',
    stream,
    {
      size: fileObject.size,
      name: fileObject.name,
      user_id: user.id
    }
  );
  const blobStream = ss.createBlobReadStream(fileObject);
  let size = 0;
  blobStream.on('data', (chunk) => {
    size += chunk.length;
    const percent = Math.floor((size / fileObject.size) * 100);
    store.dispatch(fileUploadChangePercent(percent));
  });
  blobStream.pipe(stream);
};
