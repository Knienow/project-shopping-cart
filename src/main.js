import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

// import { showLoading, hideLoading } from './helpers/loading';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

fetchProductsList('computador').then((data) => console.log(data));
fetchProduct('MLB1405519561').then((data) => console.log(data));

const sectionProducts = document.querySelector('.products');

const showLoading = () => {
  const h2 = document.createElement('h2');
  h2.innerText = 'Carregando...';
  h2.classList.add('loading');
  document.body.appendChild(h2);
};

const hideLoading = () => {
  const loadings = document.querySelector('.loading');
  loadings.remove();
};

showLoading();

const responseError = () => {
  const h2 = document.createElement('h2');
  h2.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  h2.classList.add('error');
  document.body.appendChild(h2);
};

const hideResponseError = () => {
  const messageError = document.querySelector('.error');
  console.log(messageError);
  messageError.remove();
};
responseError();

const products = async () => {
  const productList = await fetchProductsList('computador');
  if (!productList) {
    responseError();
  }
  const list = productList.forEach((product) => {
    sectionProducts.appendChild(createProductElement(product));
  });
  hideLoading();
  hideResponseError();
  return list;
};

const dataLocalStorage = async () => {
  const idLocalStorage = getSavedCartIDs();
  const promisesArray = idLocalStorage.map((element) => fetchProduct(element));
  const allPromises = await Promise.all(promisesArray);
  allPromises.forEach((element) => {
    const createElement = createCartProductElement(element);
    document.querySelector('.cart__products').appendChild(createElement);
  });
};

window.onload = async () => {
  products();
  dataLocalStorage();
};
