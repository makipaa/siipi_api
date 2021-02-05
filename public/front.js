const getData = async () =>{
    
    const response = await fetch('/api/queue');
    
    return response.json();
}

const parsePage = () => {
    
    getData().then(data => { 
        console.log(data);
        document.getElementById("number").innerText = data;
    });
    
   console.log("testi")
}

setInterval(parsePage, 10000)