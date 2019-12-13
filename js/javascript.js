var db = window.openDatabase("Database", "1.0", "Caverna_Funko", 2000);
db.transaction(createDB, errorDB, successDB);
document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
    db.transaction(createDB, errorDB, successDB);
}


// Trata erro de criação do Banco de Dados
function errorDB(err) {
    alert("Erro: " + err);
}


// Executa se criou o Banco de Dados com sucesso
function successDB() {}


//Cria a tabela se a mesma não existir    
function createDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Caverna_Funko (id INTEGER PRIMARY KEY, nome VARCHAR(50), quant INTEGER, preco FLOAT);');
}

function listagemview() {
    db.transaction(viewBD, errorDB, successDB);
}

function viewBD(tx) {
    tx.executeSql('SELECT * FROM caverna_funko', [], caverna_funko_mostra, errorDB);
}
// Prepara para incluir registro na tabela 
function caverna_funko_insert() {
    db.transaction(caverna_funko_insert_db, errorDB, successDB);
}

// Inclui registro na tabela 

function caverna_funko_insert_db(tx) {

    var nome = $("#itens_nome").val();
    var quant = $("#itens_quantidade").val();
    var preco = $("#itens_preco").val();
    tx.executeSql('INSERT INTO Caverna_Funko (nome, quant, preco) VALUES ("' + nome + '", "' + quant + '","' + preco + '")');
    alert("Item incluido com sucesso!!");


}

//prepara para ler os registros da tabela 
function caverna_funko_view() {
    db.transaction(caverna_funko_insert_db, errorDB, successDB);
}

//monta a matriz com os registros da tabela 
function caverna_funko_view_db(tx) {
    tx.executeSql('SELECT * FROM Caverna_Funko', [], caverna_funko_view_data, errorDB);
}
//mostra os registros da tabela 
function caverna_funko_mostra(tx, results) {
    $("#caverna_funko_listagem").empty();
    var len = results.rows.length;
    //efetua a leitura da tabela 
    for (var i = 0; i < len; i++) {
        $("#caverna_funko_listagem").append("<tr class='caverna_funko_item_listagem'>" +
            "<td><h3>" + results.rows.item(i).nome + "</h3></td>" +
            "<td><h3>" + results.rows.item(i).quant + "</h3></td>" +
            "<td><h3>" + results.rows.item(i).preco + "</h3></td>" + "</tr>");
    }
}