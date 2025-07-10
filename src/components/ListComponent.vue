<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="d-flex justify-space-between">
            <span>Prikaži studente</span>
            <v-text-field
              v-model="searchQuery"
              label="Pretraži"
              append-icon="mdi-magnify"
              dense
              hide-details
              solo
              class="ml-4"
              style="max-width: 300px"
            />
          </v-card-title>

          <v-card-text>
            <table class="table table-hover table-bordered w-100 text-center">
              <thead class="thead-dark">
                <tr style="font-size: 1.1rem">
                  <th>Ime</th>
                  <th>Email</th>
                  <th>Telefon</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="student in paginatedStudents"
                  :key="student._id"
                  style="font-size: 1.05rem; height: 60px"
                >
                  <td>{{ student.name }}</td>
                  <td>{{ student.email }}</td>
                  <td>{{ student.phone }}</td>
                  <td>
                    <v-btn
                      color="success"
                      size="small"
                      class="me-2"
                      @click="
                        $router.push({
                          name: 'edit',
                          params: { id: student._id },
                        })
                      "
                    >
                      Uredi
                    </v-btn>

                    <v-btn
                      color="error"
                      size="small"
                      @click.prevent="deleteStudent(student._id)"
                    >
                      Izrbiši
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-card-text>

          <v-card-actions>
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              circle
              total-visible="7"
              color="primary"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Students: [],
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredStudents() {
      if (!this.searchQuery) return this.Students;
      const q = this.searchQuery.toLowerCase();
      return this.Students.filter((s) => {
        return (
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          String(s.phone).includes(q)
        );
      });
    },
    totalPages() {
      return Math.ceil(this.filteredStudents.length / this.itemsPerPage);
    },
    paginatedStudents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredStudents.slice(start, start + this.itemsPerPage);
    },
  },
  created() {
    axios
      .get("http://localhost:4000/api")
      .then((res) => {
        this.Students = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    deleteStudent(id) {
      if (!confirm("Do you really want to delete?")) return;

      axios
        .delete(`http://localhost:4000/api/delete-student/${id}`)
        .then(() => {
          this.Students = this.Students.filter((s) => s._id !== id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
