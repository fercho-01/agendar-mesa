import React, { Component } from 'react';

var ListaMesas=React.createClass({
  listar:function(item){
      return(
          <div>
            <label> mesa con {item.capacity} puestos</label>
            <button value={item.table_restaurant_id} onClick={this.props.reservarMesa}>Agendar</button>
          </div>
      );
  },
  render:function(){
      return(
        <div>
          Seleccione Mesa:
          {
            this.props.mesas.map(this.listar)
          }
        </div>
      );
  }
});

export default ListaMesas;
