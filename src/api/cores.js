import axios from "axios";
export default class CoresApi {
  async buscarTodasAsCores() {
    const { data } = await axios.get("/cor/");
    return data.results;
  }
  async adicionarCores(cor) {
    const { data } = await axios.post("/cor/", cor);
    return data.results;
  }
  async atualizarCores(cor) {
    const { data } = await axios.put(`/cor/${cor.id}/`, cor);
    return data.results;
  }
  async excluirCores(id) {
    const { data } = await axios.delete(`/cor/${id}/`);
    return data.results;
  }
}