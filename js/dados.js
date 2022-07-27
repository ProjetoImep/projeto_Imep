// Selecionar Curso
const select = document.getElementById("interesse");
let Grad = new Array();
let Pos = new Array();
let Tecnico = new Array();
let Cursos = document.getElementById("curso");

function OrdenarPorNome(Array) {
  Array.sort(function (a, b) {
    return a.Nome > b.Nome ? 1 : -1;
  });
}

function AddCursos() {
  fetch("./js/json/cursos.json")
    .then((resp) => resp.json())
    .then(function selectCurso(data) {
      if (select.value === "grad") {
        for (let i = 0; i < data["grad"].length; i++) {
          let grad = data["grad"][i];
          Grad.push(grad);
        }

        Cursos.innerHTML = "";
        OrdenarPorNome(Grad);

        for (let i = 0; i < Grad.length; i++) {
          Cursos.innerHTML += `<option value='${Grad[i].Nome}'>${Grad[i].Nome}</option>`;
        }
      } else if(select.value === "pos") {
        for (let i = 0; i < data["pos"].length; i++) {
          let pos = data["pos"][i];
          Pos.push(pos);
        }

        Cursos.innerHTML = "";
        OrdenarPorNome(Pos);

        for (let i = 0; i < Pos.length; i++) {
          Cursos.innerHTML += `<option value='${Pos[i].Nome}'>${Pos[i].Nome}</option>`;
        }
      } else {
        for (let i = 0; i < data["tecnico"].length; i++) {
          let tecnico = data["tecnico"][i];
          Tecnico.push(tecnico);
        }

        Cursos.innerHTML = "";
        OrdenarPorNome(Tecnico);

        for (let i = 0; i < Tecnico.length; i++) {
          Cursos.innerHTML += `<option value='${Tecnico[i].Nome}'>${Tecnico[i].Nome}</option>`;
        }
      }
    });
}

select.addEventListener("change", AddCursos);

// Envio dos dados para a planilha
const btn = document.getElementById("enviar");

const addLoading = () => {
  btn.innerHTML = '<img src="../assets/Dual Ball-1.2s-28px.svg" alt=""></img>';
  btn.style.padding = "0 10px";
};

const removeLoading = () => {
  btn.innerHTML = "Enviar";
  btn.style.padding = "10px 20px";
};

const handleSubmit = (e) => {
  e.preventDefault();
  addLoading();

  const name = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const email = document.getElementById("email").value;
  const tel = document.getElementById("telInput").value;
  const ensino_medio = document.getElementById("conclusao").value;
  const interesse = document.getElementById("interesse").value;
  const curso = document.getElementById("curso").value;
  const conheceu = document.getElementById("conheceu").value;

  fetch("https://api.sheetmonkey.io/form/wqpSmGvmNLAN69BgbogpqR", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Nome: name,
      Idade: idade,
      Email: email,
      Telefone: tel,
      Concluiu: ensino_medio,
      Grau: interesse,
      Curso: curso,
      Conheceu: conheceu,
      Fonte: "IMEP",
      Data: "x-sheetmonkey-current-date",
    }),
  })
    .then(() => removeLoading())
    .then(alert("Dados salvos com sucesso!"))
    .then(
      (name = ""),
      (idade = ""),
      (email = ""),
      (tel = ""),
      (ensino_medio = "")
    );
};

document.querySelector("#dados_Aluno").addEventListener("submit", handleSubmit);
