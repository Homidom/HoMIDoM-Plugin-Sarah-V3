exports.action = function(data, callback, config, SARAH) {
  
  var config = config.modules.homisarah;
   
  if (data.param=='')
  {
	var url =  "http://"+config.ip+":"+config.port+"/api/"+config.id+"/"+data.type+"/"+data.device+"/"+data.id_device+"/"+data.command;
	}
  else
  {
    var url =  "http://"+config.ip+":"+config.port+"/api/"+config.id+"/"+data.type+"/"+data.device+"/"+data.id_device+"/"+data.command+"?"+data.param;
  }  
 console.log('url :'+url);
var request = require('request');
request({ 'uri' : url }, function (err, response, body){
 
  if (err || response.statusCode != 200) {
callback({'tts': "Je n'ai pas compris"});
console.log('err :'+err);
return;
}
  if (data.type=='value')
  {
    ttsEnd = parseFloat(body).toString().replace("."," virgule ");
    
    var tts = data.ttsTmp + " " + ttsEnd + " " + data.ttsDeg;
  callback({'tts': tts });
  }
  else
  {
    var tts = data.ttsAction + " " + data.ttsDevice;
  callback({'tts': tts });
  } 

}); 

}