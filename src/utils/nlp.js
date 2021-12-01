var request = require('request');
var b=[]
const diagonose=(obj,callback)=>{
var options = {
  'method': 'POST',
  'url': 'https://api.infermedica.com/v3/parse',
  'headers': {
    'App-Id': 'fbbd2f76',
    'App-Key': 'f7e7586c7b2ce50722ea93b485fc6d07',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "age": {
      "value": obj.age.value
    },
    "text": obj.text
  })

};
request(options, function (error, response) {
  if (error) console.log(error.body)

  else{
    var u=JSON.parse(response.body)
   
    if(obj.symid.length!=0){
     b.push({
       id:obj.symid,
       choice_id:obj.symcid
     })
    }
    var t=u.mentions.length
    for(i=0;i<t;i++){
      b.push({
      id:u.mentions[i].id,
      choice_id:u.mentions[i].choice_id,
      })
    
      if(i==0){
        b[i].source="initial"
      }
    }
     //callback(undefined,u) 
     
     var magic={
       "sex":obj.sex,
       "age":{
         "value":obj.age.value
       },
       "evidence":b
     }
     
     var optionss = {
      'method': 'POST',
      'url': 'https://api.infermedica.com/v3/diagnosis',
      'headers': {
        'App-Id': 'fbbd2f76',
        'App-Key': 'f7e7586c7b2ce50722ea93b485fc6d07',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(magic)
    
    };
    request(optionss, function (error, response) {
      if (error)
      console.log(error);
      else{
      var u=JSON.parse(response.body).question.items;
      var choices=[];
      for(i=0;i<u.length;i++){
        choices.push({
          id:u[i].id,
          name:u[i].name,
          subchoice:[{
             id:u[i].choices[0].id,
             label:u[i].choices[0].label,
          },
          {
            id:u[i].choices[1].id,
            label:u[i].choices[1].label,
         },
         {
          id:u[i].choices[2].id,
          label:u[i].choices[2].label,
       }
          ]


        })
      }
      var flag =false
      console.log(b)
      //console.log(JSON.parse(response.body))
      //console.log("flag",JSON.parse(response.body).should_stop)
     if(JSON.parse(response.body).should_stop==true){
       flag=true
     }
      callback(undefined,{body:JSON.parse(response.body),items:u.length,choices:choices,flag:flag})
     //console.log({body:JSON.parse(response.body),items:u.length,choices:choices,flag:flag})
      }
    });
}
})
}

module.exports=diagonose