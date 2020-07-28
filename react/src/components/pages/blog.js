import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: []
    }

    this.getBlogItems = this.getBlogItems.bind(this)
  }

  getBlogItems() {
    axios.get("https://tyji.devcamp.space/portfolio/portfolio_blogs", { withCredentials: true })
    .then (res => {
      this.setState({
        blogItems: res.data.portfolio_blogs
      })
    }) .catch (err => {
      console.error(err)
    })
  }

  componentDidMount() {
    this.getBlogItems();
  }

  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <h1>{blogItem.title}</h1>
    })
    return (
      <div>
        {blogRecords}
      </div>
    );
  }
}