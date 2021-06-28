// LibApiFind

//
export default {
  convert_values: function(items){
    var ret =[]
    items.forEach(function(item){
      // var json= JSON.stringify( item.values );
//console.log( item )
      var row ={
        id: item._id,
        _id: item._id,
        name: item.name,
        values: JSON.stringify( item.values ) ,
        created_at: item.created_at,
      }
      ret.push(row)                        
    });        
    return ret
  },  
  convert_items: function(items){
    var ret =[]
    items.forEach(function(item){
//console.log(item)
      var values = JSON.parse(item.values || '[]')
      var row ={
        id: item.id,
        user_id: item.user_id,
        created_at: item.created_at,
      }
      /*
      values.forEach(function(value_item){
        row[value_item.name] = value_item.value
      })
      */
     row.values = values
      ret.push(row)                        
    });        
    return ret
  },
  convertItemOne: function(item){
    var ret ={}
    var row ={
      id: item.id,
      name: item.name,
      values : JSON.parse(item.values || '[]') ,
      created_at: item.created_at,
    }    
    ret = row
    return ret
  },
  get_order_items: function(items, column, asc_type){
    var ret = [];
    items.sort(function (a, b) {
//      return a.num - b.num;
      return a[column] - b[column];
    });  
    if(asc_type == "DESC"){
      items.forEach(function(item){ ret.unshift(item) });
    }else{
      items.forEach(function(item){ ret.push(item) });
    }
    return ret
  },

}
