import Reflux from 'reflux';
import $ from 'jquery';
import MesaActions from '../actions/MesaActions';

var MesaStore = Reflux.createStore({
  listenables:[MesaActions],

  init: function() {

  }


});

export default MesaStore;
