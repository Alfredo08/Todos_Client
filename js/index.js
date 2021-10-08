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

function addNewUser( event ){
    event.preventDefault();
    
    let userForm = new FormData( event.target );
    let URL = "http://127.0.0.1:5000/api/users/add";
    let settings = {
        method: 'POST',
        body: userForm
    };

    fetch( URL, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
        })
        .then( data => {
            console.log( data );
            let results = document.querySelector( '.results' );
            results.innerHTML += `
                    <h2>
                        ${data.username}

                        <button class="deleteUser" data-username="${data.username}">
                            Delete
                        </button>
                    </h2>
                `;
            let deleteButtons = document.querySelectorAll( '.deleteUser' );
            deleteButtons[ deleteButtons.length - 1 ].addEventListener( 'click', deleteUser );
        })
        .catch( error => {
            console.log( error );
        });
}

function updateUserPassword( event ){
    event.preventDefault();

    let data = {
        username: event.target.username.value,
        password: event.target.password.value
    };
    let URL = "http://127.0.0.1:5000/api/users/update";
    let settings = {
        method: 'PUT',
        body: JSON.stringify( data )
    };

    fetch( URL, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
        })
        .then( result => {
            console.log( result );
        })
        .catch( error => {
            console.log( error );
        });
}

let loadUserButton = document.querySelector( '.loadUsers' );
loadUserButton.addEventListener( 'click', fetchUsers );

let addUserForm = document.querySelector( "#addUser" );
addUserForm.addEventListener( 'submit', addNewUser);

let updateUserPasswordForm = document.querySelector( "#updateUserPassword" );
updateUserPasswordForm.addEventListener( 'submit', updateUserPassword )