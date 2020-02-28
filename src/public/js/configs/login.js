// Função que realiza o logine seta variavel da sessão online
function login(){
    email = document.getElementById('InputEmail1').value;
    password = document.getElementById('InputPassword1').value;

    axios.post('/loginGame', {email, password})
        .then(response => {
            // Setando variavel para sessão
            localStorage.setItem('accountId', response.data.dadosAccount._id);
            location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });   

}



