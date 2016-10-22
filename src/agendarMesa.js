import React, { Component } from 'react';
import Select from './Select';
import ListaMesas from './ListaMesas';

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
      cantidadPersonas:''
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
      //alert("se consume el servicio");
    }
    this.setState({mesas:[
      {
        table_restaurant_id:"1",
        restaurant:"4",
        capacity:"4",
        available:"true"
      },
      {
        table_restaurant_id:"2",
        restaurant:"4",
        capacity:"4",
        available:"true"
      }
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
        Seleccione restaurante:<Select datos={this.state.listaRestaurantes} handleChange={this.handleChangeRestaurantes}/>
        Ingrese la fecha:<input type="text" onChange={this.handleDate}/>
        Duración de la reserva:<input type="text" onChange={this.handleDuracion}/>
        Cantidad de personas<input type="text" onChange={this.handlePersonas}/>
        Username:<input type="text" onChange={this.handleUsername}/>

        <ListaMesas mesas={this.state.mesas}/>
        
      </div>
    );
  }
});
export default AgendarMesa;
