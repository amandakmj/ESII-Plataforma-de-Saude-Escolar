import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

interface Aluno {
  nome: string;
  idade: number;
  escola: string;
  serie: string;
  alergias?: string;
  doencasCronicas?: string;
  medicamentos?: string;
  cirurgias?: string;
  planoSaude?: string;
  carteiraVacinacao?: string;
}

export async function gerarRelatorioPDF(aluno: Aluno) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = height - 50; // Posição inicial do texto

  const addText = (text: string, size = 12, color = rgb(0, 0, 0)) => {
    page.drawText(text, { x: 50, y, size, font, color });
    y -= 20; // Ajusta a posição para próxima linha
  };

  // Cabeçalho
  addText("Relatório de Saúde do Aluno", 16, rgb(0, 0, 0.8));
  addText(`Nome do Aluno: ${aluno.nome}`, 14);
  addText(`Idade: ${aluno.idade} anos`, 12);
  addText(`Escola: ${aluno.escola}`, 12);
  addText(`Série/Turma: ${aluno.serie}`, 12);

  y -= 10;
  addText("Histórico de Saúde", 14, rgb(1, 0, 0));
  addText(`Alergias: ${aluno.alergias ?? "Nenhuma"}`);
  addText(`Doenças Crônicas: ${aluno.doencasCronicas ?? "Nenhuma"}`);
  addText(`Medicamentos em Uso: ${aluno.medicamentos ?? "Nenhum"}`);
  addText(`Cirurgias/Internações: ${aluno.cirurgias ?? "Nenhuma"}`);
  addText(`Plano de Saúde: ${aluno.planoSaude ?? "Não informado"}`);

  y -= 10;
  addText("Imunização", 14, rgb(0, 0.5, 0));
  addText(`Carteira de Vacinação: ${aluno.carteiraVacinacao ?? "Não informada"}`);

  // Gerar e baixar o PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(blob, `Relatorio_Saude_${aluno.nome.replace(" ", "_")}.pdf`);
}
