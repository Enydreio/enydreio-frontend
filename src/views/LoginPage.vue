<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <label for="email">Email Address:</label>
          <input v-model="email" type="email" id="email" required>
  
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required>
  
          <button type="submit">Sign In</button>
        </form>
        <a href="#">Forgot Password?</a>
      </div>
    </div>
  </template>
  
  <script src="../scripts/LoginPage.js"></script>
  
  <style scoped>
  @import '../styles/LoginPage.css';
  </style>
  