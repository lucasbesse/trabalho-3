const API_URL = 'https://ucsdiscosapi.azurewebsites.net/Discos';
const API_KEY = '8175fA5f6098c5301022f475da32a2aa';

let tokenApiUCS = '';
let number = 1;
let size = 12;

let recordList = [];

const auth = () => {
  const url = `${API_URL}/autenticar`;
  $.ajax({
    url,
    type: 'POST',
    headers: {
      'ChaveApi': API_KEY
    },
    success: (token) => {
      tokenApiUCS = token;
      getRecords(false);
    },
  });
};

const getRecords = (isScrollEvent) => {
  const loading = $('.loading');
  const content = $('.image-gallery');
  // const errorMessage = $('.error-message');
  if (!isScrollEvent) {
    loading.show();
    content.hide();
  }
  // errorMessage.hide();

  const url = `${API_URL}/records`;
  $.ajax({
    url,
    type: 'GET',
    headers: {
      "TokenApiUCS": tokenApiUCS,
    },
    data: {
      numeroInicio: number,
      quantidade: size,
    },
    success: (records) => {
      isLoading = false;
      records.forEach(record => {
        recordList.push(record);
        const recordTemplate = `
          <div class="image-container" id="image-container" data-record-id="${record.id}">
            <img src="data:image/png;base64, ${record.imagemEmBase64}" alt="${record.id}" class="image-item" data-id="${record.id}">
          </div>
        `;
        content.append(recordTemplate);
      });

      monitoryOpenRecordEvent();

      if (!isScrollEvent) {
        loading.hide();
        content.show();
        content.css('display', 'flex');
      }
    },
    error: () => {
      isLoading = false;
      // TODO Exibe mensagem de erro
      // errorMessage.show();
    },
  });
};

const getRecord = (id) => {
  const url = `${API_URL}/record`;
  $.ajax({
    url,
    type: 'GET',
    headers: {
      "TokenApiUCS": tokenApiUCS,
    },
    data: {
      numero: id,
    },
    success: (record) => {
      // TODO loading
      const modalBody = $('.modal-body');
      const modalTemplate = `
        <img id="modalImage" src="data:image/png;base64, ${record.imagemEmBase64}" alt="Imagem do álbum" class="img-fluid">
        <p id="modalTitle">${record.descricaoPrimaria}</p>
        <p id="modalDescription">${record.descricaoSecundaria}</p>
        <p id="modalArtist"></p>
      `;

      modalBody.empty();
      modalBody.append(modalTemplate);

      const modal = new bootstrap.Modal(document.getElementById('modal'));
      modal.show();
    },
    error: () => {
      // TODO Exibe mensagem de erro
    },
  });
};

auth();

const monitoryOpenRecordEvent = () => {
  $('#imageGallery').on('click', '.image-container', function () {
    const record = $(this);
    const recordId = record.data('record-id');
    getRecord(recordId);
  });
};

let isLoading = false;
// window.addEventListener('scroll', () => {
//   if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50 && !isLoading) {
//     isLoading = true;
//     setTimeout(() => {
//       number = recordList.length;
//       size = 4;
//       getRecords();
//       isLoading = false;
//     }, 500);
//   }
// });

$(window).on('scroll', function () {
  setTimeout(() => {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const documentHeight = $(document).height();
  
    if (scrollTop + windowHeight >= documentHeight - 1 && !isLoading) {
      number = recordList.length;
      size = 4;
      isLoading = true;
      getRecords();
    }
  }, 2000);
})