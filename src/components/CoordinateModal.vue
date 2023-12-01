<!-- src/components/CoordinateModal.vue -->
<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <span class="close" @click="fecharModal">&times;</span>
      <h2>Coordenadas</h2>
      <label for="nome">Nome:</label>
      <input type="text" id="nome" v-model="nome" />
      <label for="latitude">Latitude:</label>
      <input type="number" id="latitude" v-model="latitude" />
      <label for="longitude">Longitude:</label>
      <input type="number" id="longitude" v-model="longitude" />
      <button @click="salvarAlvo">Salvar</button>
      <button @click="excluirAlvo" v-if="alvoExistente">Excluir</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latitude: 0,
      longitude: 0,
      nome: "",
      alvoExistente: false,
    };
  },
  methods: {
    abrirModalNovoAlvo() {
      this.latitude = 0;
      this.longitude = 0;
      this.nome = "";
      this.alvoExistente = false;
      this.$refs.modal.style.display = "block";
    },
    abrirModalEdicaoExclusao(alvo) {
      this.latitude = alvo.latitude;
      this.longitude = alvo.longitude;
      this.nome = alvo.nome;
      this.alvoExistente = true;
      this.$refs.modal.style.display = "block";
    },
    fecharModal() {
      this.$refs.modal.style.display = "none";
    },
    salvarAlvo() {
      const alvo = {
        nome: this.nome,
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude),
      };
      this.$emit('salvarAlvo', alvo);
    },
    excluirAlvo() {
      this.$emit('excluirAlvo');
    },
  },
};
</script>

<style scoped>
/* Adicione estilos do modal conforme necessário */
.modal {
  display: none;
  position: fixed;
  z-index: 1000; /* Altere este valor conforme necessário */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 70%; /* Ajuste a largura conforme necessário */
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
