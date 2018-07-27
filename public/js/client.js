document.querySelector('#deleteBtn').addEventListener('click', function (ta) {
    
    const id = this.getAttribute('data-id')
    const url = `/item/${id}`

    fetch(url, {
      method: 'delete'
    }).then(response => response.json().then(text => (text.success) ? window.location.replace("/dictionary") : console.log("Internal error, code: 0x5") ));
      
})
