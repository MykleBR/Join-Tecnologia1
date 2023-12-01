<template>
  <div>
    <h1>Desafio n° 10 - Pointer Map</h1>
    <p>Você pode realizar o registro de um novo alvo clicando no botão abaixo ou clicando em qualquer lguar do mapa.</p>
    <div id="map"></div>
    <button @click="abrirModalNovoAlvo">Incluir Novo Alvo</button>
    <p>Ao preencher um registro será atribuido ao alvo uma data de expiração de 365 dias, a contar a partir da data do registro.</p>
    <p>Você tambem pode editar e excluir um alvo registrado, clicando sobre o seu marcador disposto no mapa.</p>
    <coordinate-modal
      ref="coordinateModal"
      @salvarAlvo="salvarAlvo"
      @excluirAlvo="excluirAlvo"
    ></coordinate-modal>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CoordinateModal from '../components/CoordinateModal.vue';

export default {
  data() {
    return {
      map: null,
      alvos: [],
      alvoSelecionado: null,
    };
  },
  mounted() {
    this.inicializarMapa();
    this.carregarAlvos();
  },
  methods: {
    inicializarMapa() {
      // Crie o mapa Leaflet no elemento com id 'map'
      this.map = L.map('map').setView([0, 0], 1);

      // Adicione um tile layer OpenStreetMap ao mapa
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Adicione um evento de clique no mapa
      this.map.on('click', this.abrirModalCoordenadas);

      // Adicione um evento de clique nos marcadores
      this.map.on('popupopen', this.abrirModalEdicaoExclusao);

      // Certifique-se de que o mapa tenha a altura correta
      this.$nextTick(() => {
        this.map.invalidateSize();
      });
    },

    async carregarAlvos() {
      try {
        const response = await this.$axios.get('/api/alvos/');
        this.alvos = response.data.alvos;
        this.adicionarMarcadores();
      } catch (error) {
        console.error('Erro ao carregar alvos:', error);
      }
    },
    abrirModalCoordenadas(event) {
      const coordenadas = event.latlng;
      this.alvoSelecionado = null;
      this.$refs.coordinateModal.abrirModalNovoAlvo(coordenadas);
    },
    async abrirModalEdicaoExclusao(event) {
      const alvo = event.popup._source.alvo;
      this.alvoSelecionado = alvo;
      this.$refs.coordinateModal.abrirModalEdicaoExclusao(alvo);
    },
    adicionarMarcadores() {
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });

      this.alvos.forEach(alvo => {
        const marcador = L.marker([alvo.latitude, alvo.longitude])
          .bindPopup(alvo.nome)
          .addTo(this.map);
        marcador.alvo = alvo;
      });
    },
    abrirModalNovoAlvo() {
      this.alvoSelecionado = null;
      this.$refs.coordinateModal.abrirModalNovoAlvo();
    },
    async salvarAlvo(alvo) {
      const apiUrl = '/api/alvos/';

      try {
        if (this.alvoSelecionado) {
          const response = await this.$axios.put(`${apiUrl}${this.alvoSelecionado.id}/`, alvo);
          console.log('Alvo atualizado com sucesso:', response.data);
        } else {
          const response = await this.$axios.post(apiUrl + 'cria/', alvo);
          console.log('Alvo criado com sucesso:', response.data);
        }

        this.fecharEModalEAtualizar();
      } catch (error) {
        console.error('Erro ao salvar alvo:', error);
      }
    },
    fecharEModalEAtualizar() {
      this.$refs.coordinateModal.fecharModal();
      this.carregarAlvos(); // Atualize dinamicamente a lista de alvos e o mapa
    },
    async excluirAlvo() {
      const index = this.alvos.findIndex(a => a.id === this.alvoSelecionado.id);

      if (index !== -1) {
        const alvoId = this.alvoSelecionado.id;

        try {
          const response = await this.$axios.delete(`/api/alvos/exclui/${alvoId}/`);
          console.log('Alvo excluído com sucesso:', response.data);

          this.alvos.splice(index, 1);
          this.$refs.coordinateModal.fecharModal();
          this.adicionarMarcadores();
        } catch (error) {
          console.error('Erro ao excluir alvo:', error);
        }
      }
    },
  },
  components: {
    CoordinateModal,
  },
};
</script>

<style scoped>
#map {
  height: 500px;
  margin-bottom: 20px;
}
</style>
