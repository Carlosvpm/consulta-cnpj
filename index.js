import { Cnpja } from "@cnpja/sdk";
import fs from "fs";


const cnpja = new Cnpja({ apiKey: process.env.API_KEY });
async function consultaCnpj(taxId) {
  try {
    const office = await cnpja.office.read({
      taxId,
      simples: true,
      registrations: ["BR"],
    });
    console.dir(office, { depth: null });
    return office;
  } catch (e) {
    console.log("CNPJ NÃO ENCONTRADO.");
  }
}

async function getComprovantesDoc(taxId) {
  try {
    const file = await cnpja.rfb.certificate({ taxId });
    fs.writeFileSync("./cnpja_rfb.pdf", file);
    console.log("Arquivo salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao gerar o comprovante:", error);
  }
}

async function getSimplesDoc(taxId) {
  const file = await cnpja.simples.certificate({ taxId });
  fs.writeFileSync("./cnpja_simples.pdf", file);
}

const main = async () => {
  const result = await consultaCnpj("52286701000132");
  // const {
  //   company: { name, members, size },
  //   alias,
  //   status,
  //   address,
  //   founded,
  //   mainActivity,
  // } = result;
  // console.table(result);
  // await getComprovantesDoc("52286701000132");
  // await getSociosDoc();
  // await getSimplesDoc();
};

main();
