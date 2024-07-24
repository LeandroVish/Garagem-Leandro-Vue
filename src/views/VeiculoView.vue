<script setup>
import { ref, reactive, onMounted } from 'vue'
import VeiculosApi from '@/api/veiculo'
import CorApi from '@/api/cores'
import ModelosApi from '@/api/modelo'
import AcessoriosApi from '@/api/acessorios'

const veiculosApi = new VeiculosApi()
const coresApi = new CorApi();
const modelosApi = new ModelosApi()
const acessoriosApi = new AcessoriosApi()

const defaultVeiculos = { id: null, ano: "", preco: "", acessorio: "", modelo: "", cor: "" }
const veiculos = ref([])
const cores = ref([])
const modelos = ref([])
const acessorios = ref([])
const veiculo = reactive({ ...defaultVeiculos })

onMounted(async () => {
    veiculos.value = await veiculosApi.buscarTodosOsVeiculos()
    cores.value = await coresApi.buscarTodasAsCores()
    modelos.value = await modelosApi.buscarTodosOsModelo()
    acessorios.value = await acessoriosApi.buscarTodosOsAcessorios()
})

function limpar() {
    Object.assign(veiculo, { ...defaultVeiculos })
}

async function salvar() {
    if (veiculo.id) {
        await veiculosApi.atualizarVeiculo(veiculo);
    } else {
        await veiculosApi.adicionarVeiculo(veiculo);
    }
    veiculos.value = await veiculosApi.buscarTodosOsVeiculos()
    limpar()
}

function editar(veiculo_para_editar) {
    Object.assign(veiculo, veiculo_para_editar)
}

async function excluir(id) {
    await veiculosApi.excluirVeiculos(id)
    veiculos.value = await veiculosApi.buscarTodasOsVeiculos()
    limpar()
}
</script>

<template>
    <h1>Veículos</h1>
    <hr />
    <div class="form">
        <input type="text" v-model="veiculo.ano" placeholder="Ano" />
        <input type="text" v-model="veiculo.preco" placeholder="Preço" />
        <select v-model="veiculo.cor" name="cores" id="cores">
          <option :value="cor.id" v-for="cor in cores" :key="cor.id">
            {{ cor.nome }}
          </option>
        </select>
        <select v-model="veiculo.modelo" name="modelos" id="modelos">
          <option :value="modelo.id" v-for="modelo in modelos" :key="modelo.id">
            {{ modelo.nome }}
          </option>
        </select>
        <select v-model="veiculo.acessorio" name="acessorios" id="acessorios" multiple>
          <option :value="acessorio.id" v-for="acessorio in acessorios" :key="acessorio.id">
            {{ acessorio.descricao }}
          </option>
        </select>
        <button @click="salvar">Salvar</button>
        <button @click="limpar">Limpar</button>
    </div>
    <hr />
    <ul>
        <li v-for="veiculo in veiculos" :key="veiculo.id">
            <span @click="editar(veiculo)">
                ({{ veiculo.id }}) - {{ veiculo.ano }} - {{ veiculo.preco }} - {{ veiculo.cor }} -
                {{ veiculo.modelo }} - {{ veiculo.acessorio.join(', ') }}
            </span>
            <button class="bt-delete" @click="excluir(veiculo.id)">X</button>
        </li>
    </ul>
</template>