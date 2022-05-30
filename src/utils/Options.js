/**
 * Obtener opciones para ordenar los productos
 * @param {types: Object}
 * @returns
 */
export function getSortOptions(types) {
  return [
    {
      id: 'n7aak21',
      value: types.sortByNewest,
      name: 'Lo más nuevo',
    },
    {
      id: 'fj12la5',
      value: types.sortByOldest,
      name: 'Lo más antiguo',
    },
    {
      id: '12olj8i',
      value: types.sortByAscName,
      name: 'Nombre ascendente',
    },
    {
      id: 'vaj90p3',
      value: types.sortByDescName,
      name: 'Nombre descendente',
    },
    {
      id: 'mh4g17k',
      value: types.sortByHighestStock,
      name: 'Mayor stock',
    },
    {
      id: 'rtl3q78',
      value: types.sortByMinorStock,
      name: 'Menor stock',
    },
    {
      id: 't6y80ka',
      value: types.sortByMostPopular,
      name: 'Lo más popular',
    },
    {
      id: 'q3epj48',
      value: types.sortByLeastPopular,
      name: 'Lo menos popular',
    },
    {
      id: 'zs52x6d',
      value: types.sortByMostExpensive,
      name: 'Precio más costoso',
    },
    {
      id: 'hgc70l3',
      value: types.sortByMostCheapest,
      name: 'Precio más económico',
    },
  ]
}
