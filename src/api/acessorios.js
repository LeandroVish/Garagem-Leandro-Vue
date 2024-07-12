import axios from "axios";
export default class AcessoriosApi {
  async buscarTodosOsAcessorios() {
    const { data } = await axios.get("/acessorios/");
    return data.results;
  }
  async adicionarAcessorios(acessorio) {
    const { data } = await axios.post("/acessorios/", acessorio);
    return data.results;
  }
  async atualizarAcessorios(acessorio) {
    const { data } = await axios.put(`/acessorios/${acessorio.id}/`, acessorio);
    return data.results;
  }
  async excluirAcessorios(id) {
    const { data } = await axios.delete(`/acessorios/${id}/`);
    return data.results;
  }
}
