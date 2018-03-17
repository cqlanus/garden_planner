// @flow
import React, { Component } from 'react'

type Props = {
    children: Node,
}

export default class Main extends Component<Props> {
    render() {
        return <div className="mainContainer">{this.props.children}</div>
    }
}
