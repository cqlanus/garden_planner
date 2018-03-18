// @flow
import React, { Component } from 'react'

type Props = {
    children: Node,
    style: mixed,
}

// a card is just a container that has defined edges with a slight shadow
// it will render any children
export default class Card extends Component<Props> {
    render() {
        return (
            <div className="card" style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}
