
const nuns_opts = document.getElementById("nuns")

for (i = 1; i <= 10; i++) {
  nuns_opts.innerHTML += `<option value="${i}">${i}</option>`
}


function gerar_tab() {
  const nun = nuns_opts.value;
  const symbol = document.getElementById("operator").value
  let operator;

  switch (symbol) {
    case "+":
      operator = (a, b) => Number(a) + Number(b)
      break;
    case "-":
      operator = (a, b) => Number(a) - Number(b)
      break;
    case "/":
      operator = (a, b) => (Number(a) / Number(b)).toFixed(2)
      break;
    case "x":
      operator = (a, b) => Number(a) * Number(b)
      break;
    default:
      return
  }

  const ulist = document.getElementById("ulist")
  ulist.innerHTML = ""

  for (i=1; i <= 10; i++) {
    ulist.innerHTML += `<li>${nun} ${symbol} ${i} = ${operator(nun, i)}</li>`
  }
}
