<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const image = ref('')
const json = ref({
  type: "quote",
  format: "webp",
  backgroundColor: "",
  width: 512,
  height: 768,
  scale: 2,
  messages: [
    {
      entities: [],
      avatar: true,
      from: {
        id: "",
        name: "Hugo",
        photo: {
          url: "https://t.me/i/userpic/320/zerohugo.jpg"
        }
      },
      text: "果果大笨蛋",
      replyMessage: {}
    }
  ]
})

function generate(json:object) {
  const response = axios.post(`/api/generate`, JSON.stringify(json), {
    headers: {'Access-Control-Allow-Origin': 'allow-all' ,'Content-Type': 'application/json' }
  }).then(res => {
    const base64 = res.data.result.image
    return image.value = 'data:image/webp;base64,'+base64
  })
}

function submit() {
  console.log(json.value)
  generate(json.value)
}
function addText() {
  json.value.messages.push({
      entities: [],
      avatar: false,
      from: {
        id: "",
        name: "",
        photo: {
          url: ""
        }
      },
      text : "",
      replyMessage: {}
    })
}
function delText() {
  json.value.messages.pop()
}
</script>

<template>
  <v-container>
    <v-sheet width="600" class="mx-auto" justify="space-between">
      <v-form @submit.prevent>
        <v-row dense>
          <v-col cols="6">
            <v-text-field v-model="json.messages[0].from.name" label="User Name"></v-text-field>
            <v-text-field v-model="json.messages[0].from.id" label="ID"></v-text-field>
            <v-text-field v-model="json.messages[0].from.photo.url" label="Avatar"></v-text-field>
            <div v-for="(item, index) in json.messages" :key="index">
              <v-text-field v-model="item.text" label="Text"></v-text-field>
            </div>
            <v-row align="center" justify="space-between">
              <v-col cols="auto">
                <v-btn type="submit" @click="addText">Add Text</v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn type="submit" @click="delText" :disabled="json.messages.length === 1">Delete Text</v-btn>
              </v-col>
            </v-row>
            <v-btn type="submit" block class="mt-2" @click="submit">Submit</v-btn>
          </v-col>
          <v-col cols="6">
            <v-color-picker v-model="json.backgroundColor" hide-inputs show-swatches></v-color-picker>
          </v-col>
          <v-col cols="12">
            <v-card class="mx-auto" color="#eee">
              <v-img :src="image" height="200"/>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>