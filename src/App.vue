<script setup></script>

<template>
  <v-app>
    <v-main>
      <v-container class="pa-0" fluid>
        <nav
          class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row"
        >
          <div class="container">
            <router-link :to="{ path: '/' }" class="navbar-brand float-left"
              >Studenti CRUD</router-link
            >
            <ul class="nav navbar-nav flex-row float-right">
              <li class="nav-item">
                <router-link to="/create" class="nav-link pr-3"
                  >Dodaj studenta</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/view" class="nav-link pr-3"
                  >Pregled studenata</router-link
                >
              </li>
            </ul>
          </div>
        </nav>

        <div class="container mt-5">
          <router-view></router-view>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
