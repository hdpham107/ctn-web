const prod = {
  API_ROOT: 'https://api.tuforu.com/',
  LIVE_ROOT: 'https://api.tuforu.com/',
  GOOGLE: {
    CLIENT_ID: '414536380825-b3f5r7t9oaimflrcgr9pq10sq6prafj8.apps.googleusercontent.com',
    CLIENT_ID_API_YOUTUBE: '1046019861050-osnp6e28g91m3m7t1qend0v07s5ks7se.apps.googleusercontent.com',
    SCOPE: `profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.channel-memberships.creator https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit https://www.googleapis.com/auth/drive.metadata.readonly`,
    API_YOUTUBE: 'https://www.googleapis.com/youtube/v3/'
  },
  REPORTS_ROOT: 'https://reports-api.tuforu.asia/',
  SOCKET: {
    SERVER: 'https://api.tuforu.com:81/'
  },

}
export default prod;
