<script setup lang="ts">
import { ref } from 'vue';
import { watch } from 'vue';
import { msgStore } from '@/stores/message'

const store = msgStore()
const json = store.json

const nameColor = ref('#FFA357')

watch(json.messages[0].from, (newID) => {
  const id = Number(newID.id)
  const nameColorArray = [
    '#FF8E86', // red
    '#FFA357', // orange
    '#B18FFF', // purple
    '#4DD6BF', // green
    '#45E8D1', // sea
    '#7AC9FF', // blue
    '#FF7FD5' // pink
  ]
  const nameIndex = Math.abs(id) % 7
  nameColor.value = nameColorArray[nameIndex]
})

const nameIndex = ref(1)
if (json.messages[0].from.id) nameIndex.value = Math.abs(Number(json.messages[0].from.id)) % 7

function addText() {
  json.messages.push({
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
  json.messages.pop()
}
</script>

<template>
  <v-container>
    <v-sheet width="600" class="mx-auto" justify="space-between">
      <v-form @submit.prevent>
        <v-row dense>
          <v-col cols="6">
            <v-text-field v-model="json.messages[0].from.name" label="User Name"></v-text-field>
            <v-text-field v-model="json.messages[0].from.id" label="ID">
              <template v-slot:append>
                <v-avatar :color="nameColor"></v-avatar>
              </template>
            </v-text-field>
            <v-text-field v-model="json.messages[0].from.photo.url" label="Avatar">
              <template v-slot:append>
                <v-avatar>
                  <v-img :src="json.messages[0].from.photo.url"></v-img>
                </v-avatar>
              </template>
            </v-text-field>
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
            <v-btn type="submit" block class="mt-2" @click="store.generateImg(json)">Submit</v-btn>
          </v-col>
          <v-col cols="6">
            <v-color-picker v-model="json.backgroundColor" hide-canvas show-swatches :modes="['hexa']"></v-color-picker>
          </v-col>
          <v-col cols="12">
            <v-card class="mx-auto" color="#eee">
              <v-img :src="store.image" height="200"/>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<style scoped>

</style>