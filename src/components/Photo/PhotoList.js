import React from 'react';
import _ from 'lodash';

class PhotoList extends React.Component {
  constructor(){
    super();
  }

  render(){
    if(this.props.studio === undefined){
      return (<div>Nothing</div>);
    }
    return (
      <div className="studio-info">
        <div className="studio-img">
          <img src={this.props.studio.logo} />
        </div>
        <div className="studio-txt">
          <h1>{this.props.studio.name}</h1>
          <h4>120 Hai Ba Trung - Ha Noi - Viet Nam</h4>
          <p>0942345678 - 0912226699</p>
        </div>
      </div>
    );
  }
};

export default PhotoList;
