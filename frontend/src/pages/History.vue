<template>
  <div class="p-4">
    <h3>Historique des fichiers</h3>
    <DataTable :value="logs" paginator :rows="10">
      <Column field="filename" header="Nom fichier" />
      <Column field="filesize" header="Taille (octets)" />
      <Column field="duration_ms" header="Durée (ms)" />
      <Column field="processed_at" header="Envoyé le" />
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const logs = ref([]);

onMounted(async () => {
  const res = await fetch("/api/logs");
  logs.value = await res.json();
});
</script>