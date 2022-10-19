import _ from 'lodash';
import base from './base';

const UserService = {
  current: () => base.requests.get('user/'),
  changePassword: (data) => base.requests.post('user/change-pw', data),
  getAvatarName: (user) => {
    const firstName = _.get(user, 'firstName', '');
    return _.toUpper(firstName.substr(0, 1));
  },
  getAuthor(user) {
    return {
      firstName: user.firstName,
      authorId: user._id,
      profilePicture: user.profilePicture,
      lastName: user.lastName,
      name: user.firstName + ' ' + user.lastName,
      type: 'agent'
    }
  },

  uploadFile(file) {
    let data = new FormData()
    data.append('file', file)
    return base.requests.post('user/file', data)
  },

  getListReply() {
    return Promise.resolve([
      {
        _id: '111',
        name: 'Mẫu câu số 1',
        description: 'Chào anh, em giá 1000 nhé'
      },
      {
        _id: '222',
        name: 'Mẫu câu số 2',
        description: 'Chào anh, em giá 2000 nhé'
      }
    ])
  },
  signUpPhone(phoneNumber) {
    return base.requests.post('user/auth/sign_up_phone', phoneNumber);
  },
  forgotPassword(email) {
    return base.requests.post('user/auth/forgot-password', { email });
  },
  validateResetPwToken(token) {
    return base.requests.post('user/change-pw/validate-token', { token });
  },
  resetPassword(data) {
    return base.requests.post('user/change-pw/reset', data);
  },
  onAdminIsTyping(data) {
    // ioServices.sendToServer('AdminIsTyping', data)
  },

  verifyImageUrl(url, data) {
    return base.requests.post('user/verify-image-url', { url, ...data });
  },
};


export default UserService;
