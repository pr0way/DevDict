document.querySelector('#actionBtn').addEventListener('click', function(){

    const url = location.href;
    let state = this.getAttribute('data-up')

    if(state === "false"){

        // Add item
        
        let data = {
            word: v('#word'),
            category: parseInt(v('#category')),
            desc: v('#desc')
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            (res.redirected === true) ? location.href = res.url : console.log('error')
        })
    
    } else {

        // Update item


    }


});

function v(foo){ return document.querySelector(foo).value }