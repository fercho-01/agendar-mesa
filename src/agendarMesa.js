import React, { Component } from 'react';
import Select from './Select';

var AgendarMesa = React.createClass({
  getInitialState:function(){
    return{
      listaRestaurantes:[
        {id:"1",nombre:"Torino"},
        {id:"2",nombre:"Rikuritas"},
        {id:"3",nombre:"Juguitos"},
        {id:"4",nombre:"Subway"}
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
  handleDuracion:function(event){
    this.setState({date:event.target.value});
  },
  handlePersonas:function(event){
    this.setState({cantidadPersonas:event.target.value});
  },
  handleUsername:function(event){
    this.setState({username:event.target.value});
  },
  render:function(){
    return(
      <div>
        <Select datos={this.state.listaRestaurantes} handleChange={this.handleChangeRestaurantes}/>
        <input type="text" onChange={this.handleDate}/>
        <input type="text" onChange={this.handleDuracion}/>
        <input type="text" onChange={this.handlePersonas}/>
        <input type="text" onChange={this.handleUsername}/>

        <input type="submit" onClick={this.handleSubmit}/>
      </div>
    );
  }
});
export default AgendarMesa;
