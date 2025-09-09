// Estruturando dados em um Map
const users = new Map();

// Exemplo de estrutura: id do usuário -> informações do usuário
users.set(1, { name: "Ana", age: 20 });
users.set(2, { name: "Ana", age: 20 });
users.set(3, { name: "Carlos", age: 25 });
users.set(4, { name: "Mariana", age: 22 });

// Aqui você pode implementar as operações depois...
for(const item of users.keys()) {
    console.log(users.get(item))
    
}

users.set(1, { name: "Marcos", age: 22 });
console.log("----")
for(const item of users.keys()) {
    console.log(item, users.get(item))
    
}


console.log(users.has(1))
console.log(users.get(1))
console.log(users.values())