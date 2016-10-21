import React, { Component } from 'react';

var Select = React.createClass({

  listar:function(item){
    return(
      <option value={item}>{item}</option>
    );
  },
  render:function(){
    return(
      <select onChange={this.props.handleChange}>
        {
          this.props.datos.map(this.listar)
        }
      </select>
    )
  }
});
export default Select;
