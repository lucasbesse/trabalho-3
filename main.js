const API_URL = 'https://ucsdiscosapi.azurewebsites.net';
const API_KEY = '8175fA5f6098c5301022f475da32a2aa';

let token = '';

// TODO mostrar loading a cada request
// TODO fazer tratamento de erro para cada request

const auth = () => {
  const url = `${API_URL}/Discos/autenticar`;
  $.ajax({
    url,
    type: 'POST',
    headers: {
      'ChaveApi': API_KEY
    },
    success: (token) => {
      token = token;
    },
  });
};

auth();

const getRecords = () => {

};

const getRecord = () => {

};