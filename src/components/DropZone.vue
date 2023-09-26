<template>
  <div>
    <label for="file-input">
      <div
        class="dropzone"
        @dragover.prevent="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
        @click="handleClick"
      >
        <p v-if="!isDragging">Drag & Drop files here or click to select</p>
        <p v-else>Drop your files here or click to select</p>
      </div>
    </label>
    <input
      id="file-input"
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileInputChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, PropType } from "vue";

export default defineComponent({
  name: "FileDropzone",
  props: {
    onFileAdded: {
      type: Function as PropType<(files: File[]) => void>,
      required: true,
    },
  },
  setup(props) {
    const isDragging = ref(false);
    const fileInputRef = ref<HTMLInputElement | null>(null);

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      isDragging.value = true;
    };

    const handleDragLeave = () => {
      isDragging.value = false;
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      isDragging.value = false;

      const files = event.dataTransfer?.files;
      if (files) {
        const fileArray = Array.from(files);
        props.onFileAdded(fileArray);
      }
    };

    const handleClick = () => {
      fileInputRef.value?.click();
    };

    const handleFileInputChange = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files) {
        const fileArray = Array.from(inputElement.files);
        props.onFileAdded(fileArray);
      }
    };
    // const handleFileInputChange = () => {
    //   if (fileInputRef.value && fileInputRef.value.files) {
    //     const fileArray = Array.from(fileInputRef.value.files);
    //     props.onFileAdded(fileArray);
    //     fileInputRef.value.value = "";
    //   }
    // };

    onMounted(() => {
      window.addEventListener("dragover", handleDragOver);
      window.addEventListener("dragleave", handleDragLeave);
      window.addEventListener("drop", handleDrop);
    });

    onUnmounted(() => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    });

    return {
      isDragging,
      handleClick,
      handleFileInputChange,
      fileInputRef,
      handleDragOver,
      handleDragLeave,
      handleDrop,
    };
  },
});
</script>

<style scoped>
.dropzone {
  height: 30vh;
  border: 2px dashed lightgrey;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-transition: background-color 100ms linear;
  -ms-transition: background-color 100ms linear;
  transition: background-color 100ms linear;
}

.dropzone p {
  font-size: 18px;
  margin: 0;
}

.dropzone.is-dragging {
  border-color: #007bff;
}
</style>
