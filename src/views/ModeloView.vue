<script setup>
import { ref, reactive, onMounted } from "vue";
import ModelosApi from "@/api/modelo"
import MarcasApi from "../api/marca"
import CategoriasApi from "../api/categorias"

const modelosApi = new ModelosApi();
const categoriasApi = new CategoriasApi();
const marcasApi = new MarcasApi();

const defaultmodelo = { id: null, nome: "", marca: "", categoria: ""};
const modelos = ref([]);
const marcas = ref([]);
const categorias = ref([]);
const modelo = reactive({ ...defaultmodelo });

onMounted(async () => {
  modelos.value = await modelosApi.buscarTodosOsModelo();
  marcas.value = await marcasApi.buscarTodasAsMarca();
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

function limpar() {
  Object.assign(modelo, { ...defaultmodelo });
}

async function salvar() {
  if (modelo.id) {
    await modelosApi.atualizarModelo(modelo);
  } else {
    await modelosApi.adicionarModelo(modelo);
  }
  modelos.value = await modelosApi.buscarTodosOsModelo();
  limpar();
}

function editar(modelo_para_editar) {
  Object.assign(modelo, modelo_para_editar);
}

async function excluir(id) {
  await modelosApi.excluirModelo(id);
  modelos.value = await modelosApi.buscarTodosOsModelo();
  limpar();
}
</script>

<template>
  <h1>Modelo</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="modelo.nome" placeholder="Nome" />
    <select v-model="modelo.marca" name="marcas" id="marcas">
      <option :value="marca.id" v-for="marca in marcas" :key="marca.id">
        {{ marca.nome }}     
      </option>
    </select>
    <select v-model="modelo.categoria" name="categorias" id="categorias">
      <option :value="categoria.id" v-for="categoria in  categorias" :key="categoria.id">
        {{ categoria.descricao }}
      </option>
    </select>
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="modelo in modelos" :key="modelo.id">
      <span @click="editar(modelo)">
        ({{ modelo.id }}) - {{ modelo.nome }} - {{ modelo.marca }} - {{ modelo.categoria }}
      </span>
      <button @click="excluir(modelo.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
