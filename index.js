const albums = Array.from({ length: 105 }, (_, i) => ({
  id: i + 1,
  title: `Álbum ${ i + 1}`,
  artist: `Artista ${ i + 1 }`,
  imageUrl: `https://via.placeholder.com/300x200.png?text=Álbum+${i + 1}`,
  description: `Descrição do álbum ${ i + 1 }`
  }));

let currentIndex = 0;
const itemsPerLoad = 12;
const additionalItems = 4;

function loadImages() {
  const gallery = document.getElementById('imageGallery');
  for (let i = 0; i < itemsPerLoad; i++) {
    const album = albums[(currentIndex + i) % albums.length];  // Circular
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-6', 'image-col');
    col.innerHTML = `
          <div class="image-container">
              <img src="${album.imageUrl}" alt="${album.title}" class="image-item" data-id="${album.id}">
          </div>
      `;
    gallery.appendChild(col);
  }
  currentIndex = (currentIndex + itemsPerLoad) % albums.length;
}

function showModal(id) {
  const album = albums.find(a => a.id === id);
  if (album) {
    document.getElementById('modalImage').src = album.imageUrl;
    document.getElementById('modalTitle').textContent = album.title;
    document.getElementById('modalDescription').textContent = album.description;
    document.getElementById('modalArtist').textContent = `Artista: ${ album.artist }`;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  }
}

let isLoading = false;
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50 && !isLoading) {
    isLoading = true;
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
      loadImages();
      document.getElementById('loading').style.display = 'none';
      isLoading = false;
    }, 1000);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadImages();

  document.getElementById('imageGallery').addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const albumId = parseInt(e.target.getAttribute('data-id'));
      showModal(albumId);
    }
  });
});