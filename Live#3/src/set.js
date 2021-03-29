import assert from 'assert';
import faker from 'faker';

export default function setApi() {
  const MAX_ITEMS = 10;
  const EVEN_NUMBER = 2;

  const generateCar = (mainDb, replicationDb) => {
    for (let i = 0; i < MAX_ITEMS; i++) {
      const car = {
        name: faker.vehicle.model(),
        releaseYear: faker.date.past().getFullYear(),
        available: true,
        gasAvailable: true,
      };
      mainDb.add(car);

      if (!replicationDb) continue;
      if (i % EVEN_NUMBER !== 0) continue;

      replicationDb.add(car);
    }

    return mainDb;
  };

  const carsDb1 = generateCar(new Set());
  const carsDb2 = generateCar(new Set(), carsDb1);

  assert.deepStrictEqual(carsDb1.size, MAX_ITEMS + MAX_ITEMS / EVEN_NUMBER);
  assert.deepStrictEqual(carsDb2.size, MAX_ITEMS);

  const replications = new Set([...carsDb1].filter((car) => carsDb2.has(car)));
  assert.deepStrictEqual(replications.size, MAX_ITEMS / EVEN_NUMBER);

  const uniqueFromDb1 = new Set(
    [...carsDb1].filter((car) => !carsDb2.has(car))
  );
  assert.deepStrictEqual(uniqueFromDb1.size, MAX_ITEMS);

  const uniqueFromDb2 = new Set(
    [...carsDb2].filter((car) => !carsDb1.has(car))
  );
  assert.deepStrictEqual(uniqueFromDb2.size, MAX_ITEMS / EVEN_NUMBER);

  const allDatabaseWithoutReplicatiton = new Set([...carsDb1, ...carsDb2]);
  assert.deepStrictEqual(allDatabaseWithoutReplicatiton.size, MAX_ITEMS * 2);
}
