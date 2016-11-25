import React, { Component } from 'react';

var ListaMesas=React.createClass({
  listar:function(item){
      return(
          <option value={item.id_table_restaurant}>mesa con capaciddad para {item.capacity} personas</option>
      );
  },
  render:function(){
      return(
        <div>
          Seleccione Mesa:
          <select onChange={this.props.handleChange} >
          <option value=""></option>
          {
            this.props.mesas.map(this.listar)
          }
          </select>
        </div>
      );
  }
});

export default ListaMesas;
