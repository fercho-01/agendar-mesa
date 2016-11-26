
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
      dateFormat:''
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
    var username = this.state.username;
    var table = this.state.mesa;
    var date = this.state.dateFormat;
    date = date.substring(0, (date.length-3));
    var duration = this.state.duracion;
    var amount_people = this.state.cantidadPersonas;
    MesaActions.agendarMesa(username,table,date,duration,amount_people);
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
  buscarMesas:function(franquicia,fechaInicial,fechaFinal,cupos){
    var param = franquicia+'/'+fechaInicial+'/'+fechaFinal+'/'+cupos;
    console.log(param);
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

    if(franquicia && fecha1 && fechaFinal && cupos){
      var fecha01 = fecha1.get('year')+'-'+fecha1.get('month')+'-'+fecha1.get('day')+' '+
                    fecha1.get('hour')+':'+fecha1.get('minute')+':'+fecha1.get('second');

      var fecha02 = fechaFinal.get('year')+'-'+fechaFinal.get('month')+'-'+fechaFinal.get('day')+' '+
                    fechaFinal.get('hour')+':'+fechaFinal.get('minute')+':'+fechaFinal.get('second');
      this.setState({dateFormat:fecha01});
      this.buscarMesas(franquicia,fecha01,fecha02,cupos);
    }
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
