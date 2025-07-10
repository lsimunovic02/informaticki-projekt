<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-card-title>Dodaj studenta</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmitForm">
              <v-text-field
                label="Ime"
                v-model="student.name"
                required
                outlined
              />
              <v-text-field
                label="Email"
                v-model="student.email"
                type="email"
                required
                outlined
              />
              <v-text-field
                label="Telefon"
                v-model="student.phone"
                required
                outlined
              />
              <v-btn type="submit" color="success" block class="mt-4">
                Dodaj
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();
const student = ref({ name: "", email: "", phone: "" });
const apiURL = "http://localhost:4000/api/create-student";

function handleSubmitForm() {
  axios
    .post(apiURL, student.value)
    .then(() => {
      toast.success("Student je uspješno dodan!");
      router.push({ name: "view" });
      student.value = { name: "", email: "", phone: "" };
    })
    .catch((error) => {
      console.error(error);
      toast.error("Greška pri dodavanju studenta. Pokušajte ponovno.");
    });
}
</script>
