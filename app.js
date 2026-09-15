const galleryData = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// Селектори елементів
const refs = {
  list: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  backdrop: document.querySelector('.lightbox__overlay'),
};

// Генерація HTML через reduce
const cardsElements = galleryData.reduce((acc, item) => {
  return (
    acc +
    `<li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>`
  );
}, '');

refs.list.insertAdjacentHTML('afterbegin', cardsElements);

// Обробники подій
refs.list.addEventListener('click', handleImageItemClick);
refs.closeBtn.addEventListener('click', handleCloseModal);
if (refs.backdrop) {
  refs.backdrop.addEventListener('click', handleCloseModal);
}

function handleImageItemClick(evt) {
  evt.preventDefault();
  
  const target = evt.target;
  const isImageEl = target.tagName === 'IMG';

  if (!isImageEl) return;

  const fullSizeUrl = target.dataset.source;
  const imageCaption = target.alt;

  openModal(fullSizeUrl, imageCaption);
}

function openModal(url, altText) {
  refs.modalImg.src = url;
  refs.modalImg.alt = altText;
  refs.modal.classList.add('is-open');

  window.addEventListener('keydown', handleKeydown);
}

function handleCloseModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImg.src = '';
  refs.modalImg.alt = '';

  window.removeEventListener('keydown', handleKeydown);
}

function handleKeydown(evt) {
  if (evt.key === 'Escape') {
    handleCloseModal();
  }
}