
export const compare = (a, b) => JSON.stringify(a) === JSON.stringify(b)
export const inputs = [
    {
        name: 'root',
        isMarked: false,
        children: [
            { 
                name: 'child1',
                isMarked: true,
                children: [],
            },
            {
                name: 'child2',
                isMarked: true,
                children: [],
            },
        ],
    },
    {
        name: 'root',
        isMarked: false,
        children: [
            { 
                name: 'child1',
                isMarked: true,
                children: [
                    { 
                        name: 'grandChild',
                        isMarked: false,
                        children: [],
                    }
                ],
            },
            { 
                name: 'child2',
                isMarked: false,
                children: [],
            }
        ],
    }
]

export const answers = [
    {
        name: 'root',
        isMarked: true,
        children: [
            { 
                name: 'child1',
                isMarked: true,
                children: [],
            },
            {
                name: 'child2',
                isMarked: true,
                children: [],
            },
        ],
    },
    {
        name: 'root',
        isMarked: false,
        children: [
            { 
                name: 'child1',
                isMarked: true,
                children: [
                    { 
                        name: 'grandChild',
                        isMarked: true,
                        children: [],
                    }
                ],
            },
            { 
                name: 'child2',
                isMarked: false,
                children: [],
            }
        ],
    }
]

const test = {
    name:"root",
    "isMarked":false,
    "children":[
        {"name":"child1","isMarked":false,"children":[{"name":"child2","isMarked":false,"children":[{"name":"child3","isMarked":true,"children":[{"name":"child4","isMarked":true,"children":[]}]}]},{"name":"child5","isMarked":true,"children":[]}]},{"name":"child6","isMarked":false,"children":[]}]}<
const ans = {
    name:"root",
    isMarked:false,
    children:[
        {
            "name":"child1",
            "isMarked":true,
            "children":[{"name":"child2","isMarked":true,"children":[{"name":"child3","isMarked":true,"children":[{"name":"child4","isMarked":true,"children":[]}]}]},{"name":"child5","isMarked":true,"children":[]}]},{"name":"child6","isMarked":false,"children":[]}]}<
