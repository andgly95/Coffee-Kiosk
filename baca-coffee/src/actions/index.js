export const FETCH_OPTIONS = 'fetch_posts';
export const SELECT_DRINK = 'select_drink';
export const SELECT_BEAN = 'select_bean';
export const SELECT_MILK = 'select_milk';



export function selectDrink(drink) {
    return {
        type: SELECT_DRINK,
        payload: drink
    }
}

export function selectBean(bean) {
    return {
        type: SELECT_BEAN,
        payload: bean
    }
}

export function selectMilk(milk) {
    return {
        type: SELECT_MILK,
        payload: milk
    }
}

export function fetchOptions() {
    return {
        type: FETCH_OPTIONS,
        payload: {
            drinks: {
                0: {
                    name: "espresso",
                    status: 1,
                    addMilk: false,
                    image: require('../resources/d_Espresso.png'),
                    id: 0
                },
                1: {
                    name: "americano",
                    status: 1,
                    addMilk: false,
                    image: require('../resources/d_Americano.png'),
                    id: 1
                },
                2: {
                    name: "cappuccino",
                    status: 1,
                    addMilk: true,
                    image: require('../resources/d_Cappuccino.png'),
                    id: 2
                },
                3: {
                    name: "latte",
                    status: 1,
                    addMilk: true,
                    image: require('../resources/d_Latte.png'),
                    id: 3
                }
            },
            beans: {
                4: {
                    name: "Stumptown Hair Bender",
                    status: 1,
                    image: require('../resources/b_Stumptown_Hair-Bender.png'),
                    id: 4,
                    origin: 'Indonesia',
                    flavor: 'Citrus Dark Chocolate'
                },
                5: {
                    name: "Sey Ivan Molano",
                    status: 1,
                    image: require('../resources/b_Sey_Ivan-Molano-Colombia.png'),
                    id: 5,
                    origin: 'Colombia',
                    flavor: 'Tropical Fruits'
                }
            },
            milk: {
                6: {
                    name: "Whole Milk",
                    brand: "Battenkill Valley",
                    status: 1,
                    image: require('../resources/m_Battenkill_Whole_Milk.png'),
                    id: 6
                },
                7: {
                    name: "Almond Milk",
                    brand: "Barista Blend",
                    status: 1,
                    image: require('../resources/m_Almond-Milk.png'),
                    id: 7
                }

            }
        },
    }
}