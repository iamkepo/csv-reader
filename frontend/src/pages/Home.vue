<template>
  <div class="p-4">
    <FileUpload
      name="file"
      url="/api/upload"
      :customUpload="true"
      @uploader="onUpload"
      accept=".csv"
    />
    
    <h3 v-if="data.length">Preview du CSV</h3>
    <DataTable :value="data">
      <Column v-for="(col, i) in columns" :key="i" :field="col" :header="col" />
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FileUpload } from "primevue/fileupload";
import { DataTable } from "primevue/datatable";
import { Column } from "primevue/column";

const data = ref([]);
const columns = ref([]);

async function onUpload(event) {
  const formData = new FormData();
  formData.append("file", event.files[0]);
  
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const json = await res.json();

  data.value = json.rows;
  columns.value = Object.keys(json.rows[0] || {});
}
</script>