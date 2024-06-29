 // script for navbar responsive
 const togglebtn=document.querySelector('.toggle-btn');
 const togglebtn_icon=document.querySelector('.toggle-btn i');
 const dropdown_menu=document.querySelector('.dropdown-menu');
 let translateFrom=document.createElement("input");
  translateFrom.value="en-GB";
 togglebtn.onclick=function()
 {
   dropdown_menu.classList.toggle('open');
   const isopen=dropdown_menu.classList.contains('open');
   togglebtn_icon.classList=isopen?'bx bx-x':'bx bx-menu';
 }

 const profile=document.querySelector('#profile');
 const dropdown_menup=document.querySelector('.dropdown-menup');

 profile.onclick=function()
 {
  dropdown_menup.classList.toggle('openp');
 }

//  script for login/signup page
 var a = document.getElementById("loginBtn");
    var b = document.getElementById("registerBtn");
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    function login() {
        x.style.left = "4px";
        y.style.right = "-520px";
        a.className += " white-btn";
        b.className = "btn";
        x.style.opacity = 1;
        y.style.opacity = 0;
    }
    function register() {
        x.style.left = "-510px";
        y.style.right = "5px";
        a.className = "btn";
        b.className += " white-btn";
        x.style.opacity = 0;
        y.style.opacity = 1;
    }

    // script for login page validation 
    var emailfield=document.getElementById("email-field");
    var emailerror=document.getElementById("email-error");
    var passfield=document.getElementById("password");
    var passerror=document.getElementById("pass-error");
    function emailvalidate()
    {
      
      if(!emailfield.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)){
        emailerror.innerHTML="enter valid email";
        emailfield.style.borderBottom="2px solid red";
        return false;
      }
      emailfield.style.borderBottom="2px solid green";
      emailerror.innerHTML="";
      return true;
    }
    function passwordvalid()
    {
      if(passfield.value.length < 8)
      {
        passerror.innerHTML="Password must be greater than 7";
        passfield.style.borderBottom="2px solid red";
        return false;
      }
      else if(passfield.value.length>12)
      {
        passerror.innerHTML="Password must be smaller than 13";
        passfield.style.borderBottom="2px solid red";
        return false;
      }
      passerror.innerHTML="";
      passfield.style.borderBottom="2px solid green";
      return true;
    }
    function validform1()
    { 
      return (emailvalidate() && passwordvalid());
    }

    // script for signup page validation
    var emailsignup=document.getElementById("email-signup");
    var passsignup=document.getElementById("pass-signup");
    var first=document.getElementById("firstname");
    var last=document.getElementById("lastname");
    var error=document.getElementsByClassName("error");
    function emailvalidsignup()
    {
      if(!emailsignup.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)){
        error[2].innerHTML="enter valid email";
        emailsignup.style.borderBottom="2px solid red";
        return false;
      }
      emailsignup.style.borderBottom="2px solid green";
      error[2].innerHTML="";
      return true;
    }
    function passwordvalidsignup()
    {
      if(passsignup.value.length < 8)
      {
        error[3].innerHTML="Password must be greater than 7";
        passsignup.style.borderBottom="2px solid red";
        return false;
      }
      else if(passsignup.value.length>12)
      {
        error[3].innerHTML="Password must be smaller than 13";
        passsignup.style.borderBottom="2px solid red";
        return false;
      }
     error[3].innerHTML="";
      passsignup.style.borderBottom="2px solid green";
      return true;
    }
    function passwordvalidsignup2()
    {
      if(passsignup.value.length < 8)
      {
        error[2].innerHTML="Password must be greater than 7";
        passsignup.style.borderBottom="2px solid red";
        return false;
      }
      else if(passsignup.value.length>12)
      {
        error[2].innerHTML="Password must be smaller than 13";
        passsignup.style.borderBottom="2px solid red";
        return false;
      }
     error[2].innerHTML="";
      passsignup.style.borderBottom="2px solid green";
      return true;
    }
   
    function firstvalid()
    {
      if(first.value.length<3)
      {
        error[0].innerHTML="enter valid name";
        first.style.borderBottom="2px solid red";
        return false;
      }
      error[0].innerHTML="";
      first.style.borderBottom="2px solid green";
      return true;
    }
    function lastvalid()
    {
      if(last.value.length<3)
      {
        error[1].innerHTML="enter valid name";
        last.style.borderBottom="2px solid red";
        return false;
      }
      error[1].innerHTML="";
      last.style.borderBottom="2px solid green";
      return true;
    }
    function signupvalid()
    {
      // event.preventDefault();
      return firstvalid()&&lastvalid() && emailvalidsignup() && passwordvalidsignup();
    }


  //  script for summarizer page 
 
  function changeslide()
  { 
   let aftertranscript=document.querySelector('.summarize');
   let  beforetranscript=document.querySelector('.before');
    beforetranscript.style.display='none';
    aftertranscript.style.display='flex';
  }

  


  // function translate2()
  // {
  //   let tag = document.querySelector("#api");
   
  //   for (let country_code in countries) {
  //       let option = `<option value="${country_code}">${countries[country_code]}</option>`;
  //       tag.insertAdjacentHTML("beforeend", option);
  //   }
  //   let fromtext=document.querySelector("textarea");
  //   let text = fromtext.value.trim();
  //   if(!text) 
  //     return;
  //   console.log(tag);
  //   let translatefrom=translateFrom.value;
  //   let translateTo;
  //   if(tag.value)
  //     {
  //       translateTo=tag.value;
  //     }
  //     else
  //     translateTo="en-GB";
  //   console.log("from " +translatefrom);
  //   console.log("to "+translateTo);
  //   let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateTo}`;
  //   if(translatefrom!=translateTo)
  //  {fetch(apiUrl).then(res => res.json()).then(data => {
  //       fromtext.value = data.responseData.translatedText;
  //       translateFrom.value=translateTo;
  //   });
  // }
  // }


  function translate2() {
    let tag = document.querySelector("#api");
   
    for (let country_code in countries) {
        let option = `<option value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
    
    let fromtext = document.querySelector("textarea");
    let text = fromtext.value.trim();
    if (!text) return;

    console.log(tag);
    let translatefrom = translateFrom.value;
    let translateTo = tag.value ? tag.value : "en-GB";

    console.log("from " + translatefrom);
    console.log("to " + translateTo);

    if (translatefrom !== translateTo) {
        let translatedText = '';
        let textChunks = chunkText(text, 500);

        let promises = textChunks.map(chunk => {
            let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=${translatefrom}|${translateTo}`;
            return fetch(apiUrl).then(res => res.json()).catch(error => {
                console.error("API request failed", error);
                return null;
            });
        });

        Promise.all(promises).then(results => {
            results.forEach(data => {
                if (data && data.responseData && data.responseData.translatedText) {
                    translatedText += data.responseData.translatedText + ' ';
                } else {
                    console.error("Error in translation data", data);
                }
            });
            fromtext.value = translatedText.trim();
            translateFrom.value = translateTo;
        }).catch(error => {
            console.error("Error processing translation requests", error);
        });
    }
}

function chunkText(text, size) {
    let chunks = [];
    for (let i = 0; i < text.length; i += size) {
        chunks.push(text.slice(i, i + size));
    }
    return chunks;
}


  function speak()
  {
    let fromtext=document.querySelector("textarea");
    utterance = new SpeechSynthesisUtterance(fromtext.value);
    utterance.lang = translateFrom.value;
    speechSynthesis.speak(utterance);
    let speak2=document.querySelector("#btn1");
    let i=document.createElement("i");
    i.classList.add("bx");
    i.classList.add("bx-volume-full");

    speak2.innerText="Stop";
    speak2.appendChild(i);
    speak2.addEventListener('click',(event)=>{stop(event)});
  }
  function stop(event)
  {
    if (speechSynthesis.speaking) {
      // SpeechSyn is currently speaking, cancel the current utterance(s)
      speechSynthesis.cancel();
    }
    let speak2=document.querySelector("#btn1");
    let i=document.createElement("i");
    i.classList.add("bx");
    i.classList.add("bx-volume-full");
    speak2.innerText="Speak";
    speak2.appendChild(i);
    speak2.removeEventListener('click',(event)=>{stop(event)});
    speak2.addEventListener('click',(event)=>{speak()});
  }
