
import React, { Component } from 'react';
import Select from './Select';
import ListaMesas from './ListaMesas';
import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import Datetime from 'react-datetime';
import $ from 'jquery';
import Reflux from 'reflux';
import RestaurantStore from '../stores/RestaurantStore';
import FranquiciaStore from '../stores/FranquiciaStore';
import RestaurantActions from '../actions/RestaurantActions';
import FranquiciaActions from '../actions/FranquiciaActions';



var AgendarMesa = React.createClass({
  mixins: [
    Reflux.connect(RestaurantStore, 'listaRestaurantes'),
    Reflux.connect(FranquiciaStore, 'listaFranquiciasCompleta')
  ],

  getInitialState:function(){
    return{
      listaRestaurantes:[],
      listaFranquicias:[],
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
    var idRestaurante = event.target.value;
    this.setState({restaurante:idRestaurante});
    var franquicias = this.state.listaFranquiciasCompleta;
    var franquiciasRestaurante = [];
    for(var i in franquicias){
      if(franquicias[i].restaurant == idRestaurante ){
        franquiciasRestaurante.push(franquicias[i]);
      }
    }

    this.setState({listaFranquicias:franquiciasRestaurante});



  },
  obtenerMesas(restaurante){
    if(restaurante!=null){
      $.ajax({
            url: 'https://restaurant-node.herokuapp.com/api/tables/available/4',
            method: 'GET',
            success: function(result) {
                //alert("Servicio consumido")
                console.log(result.toString());
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
    alert(JSON.stringify(this.state.agendarStore));
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
    if(this.state.listaRestaurantes){
      return(
        <div>
          <label>Seleccione restaurante:</label>
          <Select datos={this.state.listaRestaurantes} handleChange={this.handleChangeRestaurantes}/>
          <label>Seleccion franquicia:</label>
          <Select datos={this.state.listaFranquicias} handleChange={this.handleChangeRestaurantes}/>
          <label>Ingrese la fecha:</label>
          <Datetime onChange={this.handleDate}/>
          <label>Duración de la reserva:</label>
          <input type="text" onChange={this.handleDuracion}/>
          <label>Cantidad de personas:</label>
          <input type="text" onChange={this.handlePersonas}/>
          <label>Username:</label>
          <input type="text" onChange={this.handleUsername}/>
          <ListaMesas mesas={this.state.mesas} handleChange={this.handleMesa}/>
          <input type="submit" value="Agendar Mesa" onClick={this.handleSubmit}/>

        </div>
      );
    }else{
      return(
        <label>Seleccione restaurante:</label>
      )
    }

  }
});
export default AgendarMesa;
