import Reflux from 'reflux';
import $ from 'jquery';
import RestaurantActions from '../actions/RestaurantActions';

var RestaurantStore = Reflux.createStore({
  listenables:[RestaurantActions],
  //listaRestaurantes: [],
  init: function() {
        this.ObtenerRestaurantes();
  },

  ObtenerRestaurantes:function(){
    $.ajax({
        url: 'http://haskell-rest.herokuapp.com/restaurantes',
        async: true,
      	crossDomain: true,
        method: 'GET',
      	cache: false,
      	context: this,
		    success: function(data) {
          this.trigger(data.slice());
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("Status: " + textStatus);
          console.log("Error: " + errorThrown);
        }
    });
  }
  
});

export default RestaurantStore;
