import React, { Component } from 'react';
import Select from './Select';
import ListaMesas from './ListaMesas';
import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import Datetime from 'react-datetime';
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
      username:'',
      duracion:'',
      mesa:'',
      date :moment()
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
  handleSubmit:function(event){
    if(this.state.mesa!="" && this.state.username!="" && this.state.date!="" && this.state.duration!="" && this.state.cantidadPersonas!=""){
      alert("añadir");
      $.ajax({
        type: "POST",
        url: 'https://restaurant-node.herokuapp.com/api/tables/reserve',
        data: {
          client: this.state.username,
          table: this.state.mesa,
          date: this.state.date,
          duration: this.state.duracion,
          amount_people: this.state.cantidadPersonas
        },
        success: function(result) {
          alert("post hecho")
        },
        error : function(result) {
          alert("error")
        },
        dataType: 'json'
      });
    }else{
      //alert("no");
      //alert(this.state.mesa +  this.state.username+this.state.date+this.state.duration+this.state.cantidadPersonas)
    }
  },
  handleDate:function(date){
    this.setState({date:date});
    console.log(date);
  },
  handleDuracion:function(event){
    this.setState({duracion:event.target.value});
  },
  handlePersonas:function(event){
    this.setState({cantidadPersonas:event.target.value});
  },
  handleUsername:function(event){
    this.setState({username:event.target.value});
  },
  handleMesa:function(event){
    this.setState({mesa:event.target.value});
    //alert(this.state.mesa);
  },
  render:function(){
    return(
      <div>
        <label>Seleccione restaurante:</label>
        <Select datos={this.state.listaRestaurantes} handleChange={this.handleChangeRestaurantes}/>
        <label>Ingrese la fecha:</label>

        <label>Duración de la reserva:</label>
        <input type="text" onChange={this.handleDuracion}/>
        <label>Cantidad de personas:</label>
        <input type="text" onChange={this.handlePersonas}/>
        <label>Username:</label>
        <input type="text" onChange={this.handleUsername}/>
        <Datetime onChange={this.handleDate}/>
        <ListaMesas mesas={this.state.mesas} handleChange={this.handleMesa}/>
        <input type="submit" value="Agendar Mesa" onClick={this.handleSubmit}/>
      </div>
    );
  }
});
export default AgendarMesa;
