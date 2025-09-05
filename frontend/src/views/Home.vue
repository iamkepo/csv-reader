<template>
  <div class="p-4">
    <h3>Upload un fichier CSV</h3>
    <FileUpload
      name="file"
      url="/api/upload"
      :customUpload="true"
      @uploader="onUpload"
      accept=".csv, .xlsx"
    />
    <Toast />
    
    <h3 v-if="data.length">Preview du CSV</h3>
    <DataTable :value="data">
      <Column v-for="(col, i) in columns" :key="i" :field="col" :header="col" />
    </DataTable>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import FileUpload from "primevue/fileupload";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import { uploadFile } from "../services/uploadFile";
  import { useToast } from "primevue/usetoast";
  import Toast from "primevue/toast";

  const data = ref([]);
  const columns = ref([]);
  const toast = useToast();

  async function onUpload(event) {
    try {
      const res = await uploadFile(event.files[0]);
      const json = res.data;

      data.value = json.rows;
      columns.value = Object.keys(json.rows[0] || {});
      toast.add({ severity: "success", summary: "Success", detail: "File uploaded successfully" });
    } catch (error) {
      toast.add({ severity: "error", summary: "Error", detail: "File upload failed" });
    }
  }
</script>