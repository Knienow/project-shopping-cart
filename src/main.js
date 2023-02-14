import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

fetchProductsList('computador').then((data) => console.log(data));

// pegar o elemento html <section class="products">
const sectionProducts = document.querySelector('.products');

const products = async () => {
  const productList = await fetchProductsList('computador');
  const list = productList.forEach((product) => {
    sectionProducts.appendChild(createProductElement(product));
  });
  return list;
};

products();
// .catch(() => {
//   console.log('Algum erro ocorreu, recarregue a página e tente novamente');
// });
