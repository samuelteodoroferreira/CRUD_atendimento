
const form = document.getElementById('crud-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const crudList = document.getElementById('crud-list');

// aqui devo Conectar ao MongoDB (substituir com sua configuração)
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/seubanco";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Função para listar os registros
function listRecords() {
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("seubanco").collection("suaColecao");
        collection.find({}).toArray((err, items) => {
            if (err) throw err;
            crudList.innerHTML = '';
            items.forEach(item => {
                crudList.innerHTML += `<p>${item.name} - ${item.email} <button onclick="editRecord('${item._id}')">Editar</button> <button onclick="deleteRecord('${item._id}')">Excluir</button></p>`;
            });
        });
        client.close();
    });
}

// Função para adicionar um registro
function addRecord(event) {
    event.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("seubanco").collection("suaColecao");
        collection.insertOne({ name, email }, (err, res) => {
            if (err) throw err;
            console.log("Registro inserido");
            listRecords();
        });
        client.close();
    });
    nameInput.value = '';
    emailInput.value = '';
}

// Função para editar um registro
function editRecord(id) {
    // Implementar a lógica de edição aqui
}

// Função para excluir um registro
function deleteRecord(id) {
    // Implementar a lógica de exclusão aqui
}

// Registrar um ouvinte para o formulário
form.addEventListener('submit', addRecord);

// Listar registros na inicialização
listRecords();
