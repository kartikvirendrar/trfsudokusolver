async function fetchapi(file) {
    await fetch(`https://trf-sudokusolver.herokuapp.com/sudokusolver/${encodeURIComponent(file)}`, {
                "method": "GET"})
                .then(response => {
                // console.log('api fetched');
                return response.json();
                })
                .then((dataobj) => {
                    var unstr = dataobj.unsolved;
                    const unarr = [];
                    for (let i = 0; i < unstr.length; i++) {
                        if (Number.isInteger(parseInt(unstr[i]))){
                            unarr.push(unstr[i]);
                        }
                    }
                    const orarr =[];
                    for (let i=0; i<unarr.length; i++){
                        if (unarr[i]!=0) {
                            orarr.push(i);
                        }
                    }
                    var str= dataobj.solved;
                    const arr = [];
                    for (let i = 0; i < str.length; i++) {
                        if (Number.isInteger(parseInt(str[i]))){
                            arr.push(str[i]);
                        }
                    }
                    var str1=`<table><colgroup>
                    <col span="3" style="background-color: #ffffff">
                    <col span="3" style="background-color: #cfcfcf">
                    <col span="3" style="background-color: #ffffff">
                  </colgroup><tr>`;
                    for (let i=0; i<arr.length;i++){
                        if (i==0){
                            if(orarr.includes(i)){
                                str1+=`<th style="color: red;">${arr[i]}</th>`;
                            }else{
                                str1+=`<th>${arr[i]}</th>`;
                            }
                            continue;
                        }
                        if (orarr.includes(i)) {
                            str1+=`<th style="color: red;">${arr[i]}</th>`;    
                        }else{
                        str1+=`<th>${arr[i]}</th>`;
                        }
                        if ((i+1)%9==0){
                            str1+=`</tr><tr>`;
                        }
                        if (i==80){
                            str1+=`</table>`;
                        }
                    }
                    document.getElementById('sudoku').innerHTML=str1;
                    })
                .catch(err => {console.error(err);
                    document.getElementById('sudoku').innerHTML="failed to fetch!";
                });
    };
    
function submit(){
    const file = document.getElementById('file').value; 
    const url = document.getElementById('url').value;
    if (file=="" && url==""){
        window.alert("Input Error: enter a valid input");
    }else if (file=="") {
        document.getElementById('sudoku').innerHTML="";
        fetchapi(url).catch(e => {console.log(e)});
    }else{
        const formdata = new FormData()
        formdata.append("image", document.getElementById('file').files[0])
        document.getElementById('sudoku').innerHTML="";
        fetch("https://api.imgur.com/3/image/", {
        method: "post",
        headers: {
            Authorization: "Client-ID 3bf2552a56a859a"
        },
            body: formdata
        }).then(data => data.json()).then(data => {
            fetchapi(data.data.link).catch(e => {console.log(e)});
        })
    }
}    