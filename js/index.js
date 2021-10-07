function deleteUser( event ){
    let username = event.target.getAttribute( "data-username" );
    console.log( event.target.dataset.username );

    let URL = `http://127.0.0.1:5000/api/users/delete/${username}`;
    let settings = {
        method: 'DELETE',
        body: JSON.stringify( {username: username} )
    }

    fetch( URL, settings )
        .then( response => {
            console.log( response );
            if( response.ok ){
                event.target.closest( 'h2' ).remove();
            }

            throw Error( "You need to delete this user's todos first!" );
        })
        .catch( error => {
            console.log( error );
            let errorDiv = document.querySelector( '.error' );
            errorDiv.innerHTML = error;
        })
}

function fetchUsers( event ){
    let URL = "http://127.0.0.1:5000/api/users";
    let settings = {
        method: 'GET'
    };
    
    fetch( URL, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw Error( response.statusText )
        })
        .then( data => {
            let results = document.querySelector( '.results' );
            results.innerHTML = "";

            for( let i = 0; i < data.length; i ++ ){
                results.innerHTML += `
                    <h2>
                        ${data[i].username}

                        <button class="deleteUser" data-username="${data[i].username}">
                            Delete
                        </button>
                    </h2>
                `;
            }

            let deleteButtons = document.querySelectorAll( '.deleteUser' );
            for( let i = 0; i < deleteButtons.length; i ++ ){
                deleteButtons[i].addEventListener( 'click', deleteUser );
            }
        })
        .catch( error => {
            console.log( error );
            let results = document.querySelector( '.results' );
            results.innerHTML = error;
        });
}

let loadUserButton = document.querySelector( '.loadUsers' );
loadUserButton.addEventListener( 'click', fetchUsers );