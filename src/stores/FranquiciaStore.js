import Reflux from 'reflux';
import $ from 'jquery';
import FranquiciaActions from '../actions/FranquiciaActions';

var FranquiciaStore = Reflux.createStore({
  listenables:[FranquiciaActions],
  init:function(){
    this.ObtenerFranquicias();
  },
  ObtenerFranquicias:function(){
    $.ajax({
        url: 'https://restaurants-udea-soft.herokuapp.com/franchises',
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
export default FranquiciaStore;
