
const getData = () =>{
    
    const response = await fetch('/api/queue')
    return response.json();
}

const parsePage = () => {
    getData.then(data => { 
        document.getElementById("number").innerText = data.number;
    });
}

setInterval(parsePage, 10000)