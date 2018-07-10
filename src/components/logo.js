import React from 'react';


class Logo extends React.Component {

  render() {
    let logoStyle = {padding: this.props.size/8 + 'px'};
    let nameStyle = {color: this.props.color, fontSize: this.props.size + 'px'}
    let lineStyle={backgroundColor: this.props.color, height: this.props.size/10 + 'px', borderRadius: this.props.size/10 + 'px' , left: this.props.size*3/10 + 'px'}
    return(
      <div className='logo'>
        <div className='title' style={logoStyle}>
          <span style={nameStyle}>Jobsy.</span>
          <div style={lineStyle}></div>
        </div>
        {this.props.tagline && <div className='subtitle'>Job search made easy</div>}
      </div>
    )
  }
}


export default Logo;
