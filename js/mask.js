function mask(maskInput) {
    const maximoInput = document.getElementById(`${maskInput}Input`).maxLength;
    let valorInput = document.getElementById(`${maskInput}Input`).value;
    let valorSemPonto = document.getElementById(`${maskInput}Input`).value.replace(/([^0-9])+/g, "");
    const mascaras = {
      tel: valorInput.replace(/[^\d]/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    };

    valorInput.length === maximoInput ? document.getElementById(`${maskInput}Input`).value = mascaras[maskInput] : document.getElementById(`${maskInput}Input`).value = valorSemPonto;
  };