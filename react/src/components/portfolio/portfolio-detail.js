import React from "react";

export default function() {
    return (
    <div>
      <h2>Portfolio Item for {props.match.params.slug}</h2>
    </div>);
  }