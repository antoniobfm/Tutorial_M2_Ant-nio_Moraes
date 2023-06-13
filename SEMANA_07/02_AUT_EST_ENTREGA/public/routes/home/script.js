  // Get data from /formacoes/:usuario_id and load it to ul id #formacoes
async function loadFormacoes() {
  const formacoes = await $.ajax({
    url: "http://localhost:3003/listaFormacao",
    dataType: "json",
  });

  const formacoesList = $("#formacoes");

  // Clean list first
  formacoesList.empty();

  formacoes.forEach((formacao) => {
    const li = $("<li>").html(`
      <h3>${formacao.nome}</h3>
      <p>${formacao.inicio} - ${formacao.fim}</p>
      <p>${formacao.descricao}</p>
    `);
    formacoesList.append(li);
  });
}

loadFormacoes();

async function createFormacao() {
  console.log('OLOCO')
  const nome = $("#nome").val();
  const inicio = $("#inicio").val();
  const fim = $("#fim").val();
  const descricao = $("#descricao").val();
  const usuario_id = 1;

  await $.ajax({
    url: `http://localhost:3003/insereFormacao`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: JSON.stringify({
      usuario_id: usuario_id,
      nome: nome,
      inicio: String(new Date(inicio).getTime()),
      fim: fim && String(new Date(fim).getTime()),
      descricao: descricao,
    }),
    dataType: "json",
  });

  // Reload formacoes list
  loadFormacoes();
}

$("#formacao-form").on("submit", (event) => {
  event.preventDefault();
  createFormacao();
});