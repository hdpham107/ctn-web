import _ from 'lodash'

var colorArray = ['#FF6633', '#FFB399', '#00B3E6',
  '#E6B333', '#3366E6', '#a2877c', '#B34D4D',
  '#80B300', '#809900', '#e45e53', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#FF8B48', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

export const getColor = (name = '') => {
  if (!name || _.size(name) === 0) {
    return colorArray[0];
  }
  return colorArray[name.charCodeAt(0) % (colorArray.length)]
}

export const getFirstCharacter = (name) => {
    name = name || "";
    let splitName = name.split(' ')
    let firstName = splitName[0]
    let lastName = splitName[1] ? _.first(splitName[1]) : ''
    return _.first(firstName) + lastName;
}

export const getAgentName = (agent = {}) => {
  if (agent.displayName) {
    return agent.displayName;
  }
  var name = _.get(agent, 'lastName', '');
  if (_.has(agent, 'firstName')) {
    name += ' ' + _.get(agent, 'firstName')
  }
  return name;
}
