import React from 'react'

class Demo extends React.Component {
  render(){
    return(
      <div>
        <h1>Demo Page</h1>
        <button onClick={ this.props.showAuthModal }>Modal</button>
      </div>
    )
  }
}

export default Demo
