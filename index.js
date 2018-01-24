var meli = require('mercadolibre');
const util = require('util');

var meliO = new meli.Meli('7318832265598246','2mvJHaRIRVzSEpGcDYm4op079r2BaHZh');

obj = [];

meliO.get('sites/MLA/categories', function(err, res){

    'use strict';    
    if (err) {return};
    TimedLoop(res.length,2000,function())

    res.forEach(function(category,index){
        obj[index] = JSON.parse(SetHeadAsString(category));
        setTimeout(GetChild,2000,category.id, category);  
    });

    /*for (var i = 0; i < res.length - 1; i++) {
        obj[i] = JSON.parse(SetHeadAsString(res[i]));
        setTimeout(GetChild,2000,res[i].id, obj[i]);        
    };*/

    setTimeout(function(){
        
        console.log(util.inspect(obj, {showHidden: false, depth: null}));
    },35000);

}); 
function TimedLoop(count,time,callback){
    if (count > 0) {
        setTimeout(callback(),time);
        count--;
        TimedLoop(count,time,callback);
    }
    else{return;};
}
function GetSiteCategories(){

}
function GetChild( ActOId , Father ){


    console.log('Consultando: '+ActOId);
    meliO.get('categories/'+ActOId, ActOId, function(err, res){

        if (err) {
            console.log(err);
            clearTimeout();
        }else{

            var childs = res.children_categories;

            if (childs.length > 0) {

                for (var j = 0; j < childs.length - 1; j++) {
                                    
                    Father.sub[j] = JSON.parse(SetSubAsString(childs[j]));

                    setTimeout(GetChild,2000,childs[j].id,Father.sub[j]);

                };
            }else{
                Father.sub[j] = JSON.parse(SetLastAsString(res));
            };
            
        }
    });
}
function SetHeadAsString(data){
    var string;
    var name = escape(data.name);

    string = '{ "id": "'+data.id + '"'+ ',"name":"' + name + '"'+ ',"sub":[] }';
    return string;
}
function SetSubAsString(data){
    var string;
    var name = escape(data.name);

    string = '{ "id": "' + data.id + '"'+ ',"name":"' + name + '"'+ ',"sub":[] }';
    return string;
}
function SetLastAsString(data){
    var string;
    var name = escape(data.name);

    string = '{"id": "' + data.id + '"'+ ',"name":"' + name + '"'
    + ',"total_items": ' + data.total_items_in_this_category + '}';
    return string;
}

var __nativeST__ = window.setTimeout;
  window.setTimeout = function (vCallback, nDelay) {
    var aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeST__(vCallback instanceof Function ? function () {
      vCallback.apply(null, aArgs);
    } : vCallback, nDelay);
  };