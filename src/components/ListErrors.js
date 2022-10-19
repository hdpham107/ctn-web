import React from 'react';

class ListErrors extends React.Component {
  render() {
    const errors = this.props.errors;
    if (errors) {
      return (
        <ul className="error-messages">
          {
            errors.map(error => {
              return (
                <li key={error.field}>
                  {error.message}
                </li>
              );
            })
          }
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;
