import _ from 'lodash';
export const agentHelpers = {
  getName,
  getAvatarCharacters,
  getAvatarAppCharacters,
}


function getName(agent) {
  var name = _.get(agent, 'lastName', '');
  if (_.has(agent, 'firstName')) {
    if (name) {
      name += ' ' + _.get(agent, 'firstName')
    } else {
      name = _.get(agent, 'firstName')
    }
  }
  return name;
}

function getAvatarCharacters(agent = {}) {
  var name = agent.firstName || '';
  return _.upperCase(name.charAt(0));
}

function getAvatarAppCharacters(app) {
  return _.upperCase(app.name.charAt(0));
}
