import Reflux from 'reflux';
import $ from 'jquery';
import MesaActions from '../actions/MesaActions';

var MesaStore = Reflux.createStore({
  listenables:[MesaActions],
  init: function() {

  },

  agendarMesa:function(client,table,date,duration,amount_people){

    var params = {
      'client':client,
      'table':table,
      'date':date,
      'duration':duration,
      'amount_people':amount_people
    }
    $.ajax({
        url: 'https://restaurant-node.herokuapp.com/api/tables/reserve',
        async: true,
      	crossDomain: true,
        method: 'POST',
      	cache: false,
      	context: this,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        params:params,
		    success: function(data) {
          console.log(data);
          alert("Mesa Agendada");

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("Status: " + textStatus);
          console.log("Error: " + errorThrown);
        }
      });
}
});

export default MesaStore;
