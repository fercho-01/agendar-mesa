
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
import MesaStore from '../stores/MesaStore';

import MesaActions from '../actions/MesaActions';



var AgendarMesa = React.createClass({
  mixins: [
    Reflux.connect(RestaurantStore, 'listaRestaurantes'),
    Reflux.connect(FranquiciaStore, 'listaFranquiciasCompleta'),
    Reflux.connect(MesaStore,'mesasDisponibles')
  ],

  getInitialState:function(){
    return{
      listaRestaurantes:[],
      listaFranquicias:[],
      restaurante:'',
      franquicia:'',
      mesas:[],
      date:'',
      cantidadPersonas:'',
      username:'',
      duracion:'',
      mesa:'',
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
    this.buscarMesas();
  },
  handleChangeFranquicia:function(event){
    this.setState({franquicia:event.target.value});
    this.buscarMesas();
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
    //date = date.subtract(5,'h');
    this.setState({date:date});

    console.log("date");
    console.log(date);
    //this.buscarMesas();
  },
  handleDuracion:function(event){
    this.setState({duracion:event.target.value});
    this.buscarMesas();
  },
  handlePersonas:function(event){
    this.setState({cantidadPersonas:event.target.value});
    this.buscarMesas();
  },
  handleUsername:function(event){
    this.setState({username:event.target.value});
    this.buscarMesas();
  },
  handleMesa:function(event){
    this.setState({mesa:event.target.value});
    //alert(this.state.mesa);
  },
  buscarMesas:function(){

    /*
    var franquicia = 10;
    var fechaInicial = "2016-12-01 13:59:59";
    var fechaFinal = "2016-12-01 14:00:00";
    var cupos = 4;
    var param = franquicia+'/'+fechaInicial+'/'+fechaFinal+'/'+cupos;
    $.ajax({
        url: 'https://restaurant-node.herokuapp.com/api/tables/available/'+param,
        async: true,
      	crossDomain: true,
        method: 'GET',
      	cache: false,
      	context: this,
		    success: function(data) {
          this.setState({mesas:data.slice()});
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("Status: " + textStatus);
          console.log("Error: " + errorThrown);
        }
    });
    */
  },
  handleBuscar:function(){
    console.clear();

    var franquicia = this.state.franquicia;
    var fechaInicial = this.state.date;
    var cupos = this.state.cantidadPersonas;
    var duracion = this.state.duracion;
    var fechaFinal='';
    if (fechaInicial && duracion) {
      var fecha1 = moment(fechaInicial);
      var fechaaux = moment(fechaInicial);
      var fechaFinal = fechaaux.add(duracion,'m');
    }


    console.log("fecha inicial: ");
    console.log(fecha1);
    console.log("duracion: ");
    console.log(duracion);
    console.log("fecha final: ");
    console.log(fechaFinal);
  },
  render:function(){
    if(this.state.listaRestaurantes){
      return(
        <div>
          <label>Seleccione restaurante:</label>
          <Select datos={this.state.listaRestaurantes} handleChange={this.handleChangeRestaurantes}/>
          <label>Seleccion franquicia:</label>
          <Select datos={this.state.listaFranquicias} handleChange={this.handleChangeFranquicia}/>
          <label>Ingrese la fecha:</label>
          <Datetime onChange={this.handleDate}/>
          <label>Duración de la reserva:</label>
          <input type="text" onChange={this.handleDuracion}/>
          <label>Cantidad de personas:</label>
          <input type="text" onChange={this.handlePersonas}/>
          <label>Username:</label>
          <input type="text" onChange={this.handleUsername}/>
          <input type="submit" value="Buscar Mesas" onClick={this.handleBuscar}/>
          <ListaMesas mesas={this.state.mesas} handleChange={this.handleMesa}/>

          <input type="submit" value="Agendar Mesa" onClick={this.handleSubmit}/>

        </div>
      );
    }else{
      return(
        <label>No hay restaurantes disponibles</label>
      )
    }

  }
});
export default AgendarMesa;
