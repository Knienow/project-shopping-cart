import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });
  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });
  it('ao passar o argumento do produto "MLB1405519561", o retorno deve ser uma estrutura de dados igual ao objeto produto que já está importado no arquivo.', async () => {
    const resultFetchProduct = await fetchProduct('MLB1405519561');
    expect(resultFetchProduct).toEqual(product);
  });
  it('ao chamar a função fetchProduct sem atribuir parâmetros, deve retornar um erro com a mensagem "ID não informado"', async () => {  
    await expect(fetchProduct()).rejects.toThrow(
      new Error('ID não informado')
    );
  });
});

