// LibApiFind

//
export default {
  convert_values: function(items){
    var ret =[]
    items.forEach(function(item){
      // var json= JSON.stringify( item.values );
//console.log( JSON.stringify( item.values ) )
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
//console.log("id=" ,item._id)
      var values = JSON.parse(item.values || '[]')
      var row ={
        id: item.id,
//        _id: item._id,
//        values: values,
        created_at: item.created_at,
      }
      values.forEach(function(value_item){
        row[value_item.name] = value_item.value
      })
      ret.push(row)                        
    });        
    return ret
  },
  convertItemOne: function(item){
    var ret ={}
    var row ={
      id: item._id,
      _id: item._id,
      created_at: item.created_at,
    }
    item.values.forEach(function(value_item){
      row[value_item.name] = value_item.value
//            console.log(value_item.name , value_item.value)
    })
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
