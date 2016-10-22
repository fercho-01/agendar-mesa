import React, { Component } from 'react';
import Select from './Select';
import ListaMesas from './ListaMesas';
import $ from 'jquery';

var AgendarMesa = React.createClass({
  getInitialState:function(){
    return{
      listaRestaurantes:[
        {id:"1",nombre:"Torino"},
        {id:"2",nombre:"Rikuritas"},
        {id:"3",nombre:"Juguitos"},
        {id:"4",nombre:"Subway"}
      ],
      restaurante:'',
      mesas:[],
      date:'',
      cantidadPersonas:'',
      mesa:''
    }
  },

  handleChangeRestaurantes:function(event) {
    this.setState({restaurante:event.target.value});
    this.obtenerMesas(this.state.restaurante);
    //alert(event.target.value);
    //this.setState({value: event.target.value});
  },
  obtenerMesas(restaurante){
    if(restaurante!=null){
      $.ajax({
            url: 'https://restaurant-node.herokuapp.com/api/tables/available/4',
            method: 'GET',
            success: function(result) {
                alert("Servicio consumido")
                console.log(result);
                //this.setState({mesas: result});
            },
            error: function(result) {
              alert("Servicio Error")
              console.log(result);
            }.bind(this)
        });
      //alert("se consume el servicio");
    }
  },
  handleSubmit:function(event){
    alert("agendar mesa ");
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
  handleMesa:function(event){
    this.state({mesa:event.target.value});
  },
  render:function(){
    return(
      <div>
        Seleccione restaurante:<Select datos={this.state.listaRestaurantes} handleChange={this.handleChangeRestaurantes}/>
        Ingrese la fecha:<input type="text" onChange={this.handleDate}/>
        Duración de la reserva:<input type="text" onChange={this.handleDuracion}/>
        Cantidad de personas<input type="text" onChange={this.handlePersonas}/>
        Username:<input type="text" onChange={this.handleUsername}/>

        <ListaMesas mesas={this.state.mesas} handleChange={this.handleMesa}/>
        <input type="submit" value="Agendar Mesa" onClick={this.handleSubmit}/>
      </div>
    );
  }
});
export default AgendarMesa;
