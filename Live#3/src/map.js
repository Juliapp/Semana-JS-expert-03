import assert from 'assert';

export default function mapApi() {
  const itemObj = { name: 'juli' };
  const itemMap = new Map([['name', 'juli']]);

  //SETANDO UM VALOR
  itemObj.birthDay = '20/02/1998';
  assert.ok(itemObj.birthDay === '20/02/1998');

  itemMap.set('birthDay', '20/02/1998');
  assert.ok(itemMap.get('birthDay'), '20/02/1998');

  //DELETANDO UM VALOR
  delete itemObj.birthDay;
  assert.ok(itemObj.hasOwnProperty('birthDay') === false);

  itemMap.delete('birthDay');
  assert.ok(itemMap.has('birthDay') === false);

  //CHECANDO QUANTAS CHAVES TEM
  assert.deepStrictEqual(Object.keys(itemObj).length, 1);

  assert.deepStrictEqual(itemMap.size, 1);

  //CHECANDO AS ENTRIES
  assert.deepStrictEqual(Object.entries(itemObj), [['name', 'juli']]);

  assert.deepStrictEqual([...itemMap], [['name', 'juli']]);

  //ITERANDO
  for (const [key, values] of Object.entries(itemObj)) {
  }

  for (const [key, values] of itemMap) {
  }

  //LIMPANDO O OBJETO
  Object.keys(itemObj).map((key) => delete itemObj[key]);
  assert.deepStrictEqual(Object.keys(itemObj), []);

  itemMap.clear();
  assert.deepStrictEqual([...itemMap.keys()], []);
}
