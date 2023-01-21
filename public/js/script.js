let job_local_Data;

const socket = io("ws://172.17.24.208:3072/");
// send a message to the server
socket.emit("hello from client",5,"6",{7:Uint8Array.from([8])});
// receive a message from the server
socket.on('data',data=>{

// job_local_Data = JSON.parse(data);
// console.log(job_local_Data)
// renderData(data);
});
 fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    // Do something with the data
    job_local_Data = data;
    renderData(job_local_Data);
  });
  
let clearDiv= document.getElementById('clearDiv');
let renderDiv = document.getElementsByClassName("job_filter_Div")[0];
let job_filter_Div = document.getElementsByClassName('job_filter_Div')[0];
let job_Information_Div = document.getElementsByClassName('job_Information_Div')[0];
function renderData(job_data){
   
 console.log(renderDiv)
    for(let i = 0 ; i < job_data.length;i++){
        let json = document.createElement("div");
        let logo_div = document.createElement("div");
        let logo = document.createElement('img');
        let role_div = document.createElement('div');
        let language_div = document.createElement('div');
        renderDiv.appendChild(json).setAttribute("class","job_Information_Div");
       json.appendChild(logo_div).setAttribute('class','logo_Div');
       json.appendChild(role_div).setAttribute('class','role_Div');
       json.appendChild(language_div).setAttribute('class','language_Div');
       logo_div.appendChild(logo).setAttribute('class','logo');
        $(logo).attr("src",job_data[i].logo);
            for(let j = 0; j < job_data[i].languages.length+2;j++){
            let lang_buttton = document.createElement('button');
            language_div.appendChild(lang_buttton).setAttribute('class','lang_btn');
            lang_buttton.setAttribute('onclick','checkData(this.value)')
            if(j < job_data[i].languages.length){
            lang_buttton.innerText = job_data[i].languages[j];
            lang_buttton.value = job_data[i].languages[j];
            }
            else{
                lang_buttton.innerText = job_data[i].role;
                lang_buttton.value =  job_data[i].role;
            }
            if(j ==  job_data[i].languages.length+2 -1){
                lang_buttton.innerText = job_data[i].level;
                lang_buttton.value =  job_data[i].level;
            }

        }
        role_div.innerHTML = `<div class="company_detail_div">
        <b class='company_Name'>${job_data[i].company}</b>
        <div id='new_Div'>
        <b id='new_text'></b>
       </div>
        <div id='feature_Div'>
        <b id='featured_text'></b></div>
        </div>
        <div class="company_detail_div">
        <b class='position'>${job_data[i].position}</b></div>
        <div class="company_detail_div">
        <p class='time_Detail'>${job_data[i].postedAt}</p>
        <p class='time_Detail'>${job_data[i].contract}</p>
        <p class='time_Detail'>${job_data[i].location}</p></div>`
        if(job_data[i].new  && job_data[i].featured){
            let new_Div = document.getElementById('new_Div');
            let feature_Div = document.getElementById('feature_Div');
            let new_text = document.getElementById('new_text');
            let featured_text = document.getElementById('featured_text');
            new_Div.setAttribute('class','new_Div');
            feature_Div.setAttribute('class','feature_Div')
            new_text.innerText = 'NEW!';
            featured_text.innerText = 'FEATURED';
        }
        else if(job_data[i].new){
            let new_Div = document.getElementById('new_Div');
            let new_text = document.getElementById('new_text');
            new_Div.setAttribute('class','new_Div');
           new_text.innerText = 'NEW!';
         }
    }
   
}
function checkData(role){
    let filter = [];
for(let i = 0; i < job_local_Data.length;i++){
    if(job_local_Data[i].role == role){
        filter.push(job_local_Data[i]);
    }
    else if(job_local_Data[i].level == role){
        filter.push(job_local_Data[i]);
    }
    else{
        for(let j = 0 ; j< job_local_Data[i].languages.length;j++){
            if(job_local_Data[i].languages[j] == role){
                filter.push(job_local_Data[i]);
            }
        }
    }
}
// clearDiv.style.display="block"
clearDiv.setAttribute('class','clearDiv')
clearDiv.innerHTML = `<div><button >Frontend</button><button value='Frontend' id='remove' onclick="filter2(this.value,this)"><img src='images/icon-remove.svg'/></button></div>
<div><button >CSS</button><button id='remove' value='CSS' onclick="filter2(this.value,this)"><img src='images/icon-remove.svg'/></button></div><div><button >JavaScript</button><button value='JavaScript' id='remove' onclick="filter2(this.value,this)"><img src='images/icon-remove.svg'/></button></div>
<button id="clear" onclick="reRenderData(this)">Clear</button>
`;

job_filter_Div.style.height = `${filter.length*250}px`;
$(renderDiv).empty();
renderData(filter);
}
 function reRenderData(elem){
    console.log(elem);
    job_filter_Div.style.height = `${job_local_Data.length*250}px`;
$(renderDiv).empty();
// clearDiv.style.display="none"
$(elem).siblings().remove();
renderData(job_local_Data);
 }
 function filter2(role,elem){
    
    let filter2 = [];
    console.log(filter2);
    for(let i = 0; i < job_local_Data.length;i++){
          if(role == "Frontend"){
        if(job_local_Data[i].role != role){
            filter2.push(job_local_Data[i]);
        }
    }
  
        else if(role == "JavaScript" || role == "CSS"){
            for(let j = 0 ; j< job_local_Data[i].languages.length;j++){
              
                if(job_local_Data[i].languages[j] != role && (!job_local_Data[i].languages.includes(role))){
                    filter2.push(job_local_Data[i]);
                    
                }
            }
        }
       
    }
   
   
    $(elem).parent('div').remove();
    job_filter_Div.style.height = `${filter2.length*250}px`;
    $(renderDiv).empty();
    filter2 = [...new Set(filter2)];
    renderData(filter2);
}