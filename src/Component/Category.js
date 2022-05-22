import React, { Component } from 'react';

export default class Category extends Component {
  render() {
    const { category } = this.state;
    return <div>{category && category.map((categories) => <h2>{categories.nama}</h2>)}</div>;
  }
}
