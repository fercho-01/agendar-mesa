import React, { Component } from 'react';
import Select from './Select';

var AgendarMesa = React.createClass({
  getInitialState:function(){
    return{
      listaRestaurantes:[
        "Torino",
        "Rikuritas",
        "Juguitos",
        "Subway"
      ],

    }
  },

  handleChangeRestaurantes:function(event) {
    this.setState({restaurante:event.target.value});
    this.obtenerMesas(this.state.restaurante);
    //alert(event.target.value);
    //this.setState({value: event.target.value});
  },
  obtenerMesas(restaurante){
    this.setState({mesas:[
      "mesa 1",
      "mesa 2",
      "mesa 3"
    ]});
  },
  handleSubmit:function(){
    alert(this.state.restaurante);
  },
  handleDate:function(event){
    this.setState({date:event.target.value});
  },

  render:function(){
    return(
      <div>
        <Select datos={this.state.listaRestaurantes} handleChange={this.handleChangeRestaurantes}/>
        <input type="text" onChange={this.handleDate}/>
        

        <input type="submit" onClick={this.handleSubmit}/>
      </div>
    );
  }
});
export default AgendarMesa;
