// 969394824775-31836fur7ec5b42gb24p310rqb7o9al4.apps.googleusercontent.com
// 414536380825-qp98k4r8t83keo9q88nim3kfs718fd2v.apps.googleusercontent.com => duypham
// 996889572857-18fhbf2s41d1ahjq7bchcff385p1nvji.apps.googleusercontent.com => luongthaivin
// 1046019861050-osnp6e28g91m3m7t1qend0v07s5ks7se.apps.googleusercontent.com

const dev = {
  API_ROOT: 'https://api-local.tuforu.com/',
  GOOGLE: {
    CLIENT_ID: '414536380825-b3f5r7t9oaimflrcgr9pq10sq6prafj8.apps.googleusercontent.com',
    CLIENT_ID_API_YOUTUBE: '414536380825-b3f5r7t9oaimflrcgr9pq10sq6prafj8.apps.googleusercontent.com',
    SCOPE: `profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.channel-memberships.creator https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit https://www.googleapis.com/auth/drive.metadata.readonly`,
    API_YOUTUBE: 'https://www.googleapis.com/youtube/v3/'
  },
  SOCKET: {
    SERVER: 'http://localhost:8082/'
  },
}
export default dev;
