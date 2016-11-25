import Reflux from 'reflux';
import $ from 'jquery';
import MesaActions from '../actions/MesaActions';

var MesaStore = Reflux.createStore({
  listenables:[MesaActions],
  init: function() {

  },
  ObtenerMesas:function(franquicia,fechaIni,fechaFin,capacidad){
    var param = franquicia+'/'+fechaIni+'/'+fechaFin+'/'+capacidad;
    $.ajax({
        url: 'https://restaurant-node.herokuapp.com/api/tables/available/'+param,
        async: true,
      	crossDomain: true,
        method: 'GET',
      	cache: false,
      	context: this,
		    success: function(data) {
          this.trigger(data.slice());
          return data.slice();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("Status: " + textStatus);
          console.log("Error: " + errorThrown);
        }
    });
  }


});

export default MesaStore;
