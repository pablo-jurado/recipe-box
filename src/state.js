
var appState = {
  editor: {
    active: false,
    name: "",
    description: "",
    ingredient: "",
    ingredients: []
  },
  recipes: [
    {
      active: null,
      name: 'Pasta',
      description: 'In large bowl, mix first 4 ingredients. Mix water and oil; add to flour mixture. Turn onto floured surface; knead for 2 minutes.',
      ingredients: [
        '1 teaspoon italian seasoning',
        '1⁄2 teaspoon garlic powder',
        '1⁄2 teaspoon salt',
        '1⁄8 teaspoon pepper',
        '1 1⁄2 cups pepperoni slices',
        '1 cup shredded mozzarella cheese',
        '1 cup shredded monterey jack cheese',
        '3 tablespoons grated parmesan cheese'
      ]
    },
    {
      active: null,
      name: 'Pizza',
      description: 'In large bowl, mix first 4 ingredients. Mix water and oil; add to flour mixture. Turn onto floured surface; knead for 2 minutes.',
      ingredients: [
        '1 teaspoon italian seasoning',
        '1⁄2 teaspoon garlic powder',
        '1⁄2 teaspoon salt',
        '1⁄8 teaspoon pepper'
      ]
    }
  ]
};

export default appState;
