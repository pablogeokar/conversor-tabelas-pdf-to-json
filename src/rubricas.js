const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();
const options = {};

const rgxCod = /\d{4}$/;

const dadosJson = [];

// Inicia a extração do documento pdf
pdfExtract
  .extract(
    "./uploads/Leiautes-do-Novo-eSocial-v1.0-Beta-Anexo-I-Tabelas.pdf",
    options
  )
  .then((data) => {
    // Faz a varredura página a página
    for (const pagina in data.pages) {
      // Identifica o conteudo de cada página, célula a célula do pdf extraído
      for (let i = 0; i < data.pages[pagina].content.length - 1; i++) {
        if (rgxCod.exec(data.pages[pagina].content[i].str) !== null) {
          dadosJson.push({ cod: data.pages[pagina].content[i].str });
        }
      }
    }
    console.log(dadosJson);
  });
