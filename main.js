let ok1=false;
let ok2=false;

for(let i=0;i<sessionStorage.length;i++)
{
    let element=document.createElement("li");
    element.addEventListener("click",()=>{
        element.classList.toggle("terminat");
        if(ok1==true)
        {
            document.getElementById("terminate").click();
        }
        if(ok2==true)
        {
            document.getElementById("neterminate").click();
        }
    });
    let sarcina=JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
    let text=document.createTextNode(sarcina[0]);
    element.appendChild(text);
    if (sarcina=="") 
    {
        alert("Sarcina Invalida!");
    } 
    else document.getElementById("lista").appendChild(element);
    let span=document.createElement("span");
    span.innerHTML="×";
    span.className="close";
    element.appendChild(span);
    for (let i of document.getElementsByClassName("close")) 
    {
        i.onclick=function() 
        {
            document.getElementById("lista").removeChild(this.parentElement);
        }   
    }
    if(sarcina[1]=="terminat")
    {
        element.classList.add("terminat");
    }
}

document.getElementById("sterge_tot").addEventListener("click",()=>{
    let lista=document.getElementById("lista");
    for(let i of lista.children)
    {
        if(!i.classList.contains("terminat"))
        {
            i.classList.add("terminat");
        }
    }
});

function adaugaTask() 
{
    let element=document.createElement("li");
    element.addEventListener("click",()=>{
        element.classList.toggle("terminat");
        if(ok1==true)
        {
            document.getElementById("terminate").click();
        }
        if(ok2==true)
        {
            document.getElementById("neterminate").click();
        }
    });
    let sarcina=document.getElementById("intrare").value;
    let text=document.createTextNode(sarcina);
    element.appendChild(text);
    if (sarcina=="") 
    {
        alert("Sarcina Invalida!");
    } 
    else document.getElementById("lista").appendChild(element);
    let span=document.createElement("span");
    span.innerHTML="×";
    span.className="close";
    element.appendChild(span);
    for (let i of document.getElementsByClassName("close")) 
    {
        i.onclick=function() 
        {
            document.getElementById("lista").removeChild(this.parentElement);
        }   
    }
}

document.getElementById("toate").addEventListener("click",()=>{
    ok1=false;
    ok2=false;
    let lista=document.getElementById("lista");
    for (let i of lista.children) 
    {
        i.style.display="block";
    }
});

document.getElementById("neterminate").addEventListener("click",()=>{
    let lista=document.getElementById("lista");
    ok2=true;
    ok1=false;
    for (let i of lista.children) 
    {
        if (i.classList.contains("terminat")) 
        {
            i.style.display="none";
        } 
        else i.style.display="block";
    }
});

document.getElementById("terminate").addEventListener("click",()=>{
    let lista=document.getElementById("lista");
    ok1=true;
    ok2=false;
    for (let i of lista.children) 
    {
        if (i.classList.contains("terminat")) 
        {
            i.style.display="block";
        } 
        else i.style.display="none";
    }
});

let buton=document.getElementById("sterge");
buton.addEventListener("click",()=>{
    let lista=document.getElementById("lista");
    let terminate=document.querySelectorAll(".terminat");
    for(let i of terminate)
    {
        lista.removeChild(i);
    }
});

setInterval(()=>{
    let lista=document.getElementById("lista");
    let nr_sarcini_totale=0;
    let nr_sarcini_terminate=0;
    let nr_sarcini_neterminate=0;
    for(let i of lista.children)
    {
        nr_sarcini_totale++;
        if(i.classList.contains("terminat"))
        {
            nr_sarcini_terminate++;
        }
        else nr_sarcini_neterminate++;
    }
    if(nr_sarcini_terminate==0)
    {
        buton.style.display="none";
    }
    if(nr_sarcini_terminate>0)
    {
        buton.style.display="block";
    }
    document.getElementById("toate").innerHTML=`Total:${nr_sarcini_totale}`;
    document.getElementById("terminate").innerHTML=`Terminate:${nr_sarcini_terminate}`;
    document.getElementById("neterminate").innerHTML=`Active:${nr_sarcini_neterminate}`;
},100);

setInterval(()=>{
    let lista=document.getElementById("lista");
    sessionStorage.clear();
    for(let i of lista.children)
    {
        let atrr=[];
        atrr.push(i.innerHTML.split('<')[0].trim());
        if(i.classList.contains("terminat"))
        {
            atrr.push("terminat");
        }
        sessionStorage.setItem(i.innerHTML,JSON.stringify(atrr));
    }
},1000);