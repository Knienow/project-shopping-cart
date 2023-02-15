import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
// import { showLoading, hideLoading } from './helpers/loading';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

fetchProductsList('computador').then((data) => console.log(data));

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

const products = async () => {
  const productList = await fetchProductsList('computador');
  const list = productList.forEach((product) => {
    sectionProducts.appendChild(createProductElement(product));
  });
  hideLoading();
  return list;
};

products();

// .catch(() => {
//   console.log('Algum erro ocorreu, recarregue a página e tente novamente');
// });
