import { defineStore } from "pinia";
import router from "@/router";
export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: null,
      errors: {},
    };
  },
  // getters: {},
  actions: {
    /********************* Get Authenticated User  ********************** */

    async getUser() {
      if (localStorage.getItem("token")) {
        const res = await fetch("https://trust-broker-backend-1.onrender.com/api/api/user", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.user = data;
        }
      }
    },

    /**************** Login and Register  ***************/
    async login(formData) {
      const res = await fetch(`https://trust-broker-backend-1.onrender.com/api/users/authenticate`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.errors) {
        this.errors = data.errors;
      } else {
        console.log(this.user);
        this.errors = {};
        console.log('dataaaaa',data);
        localStorage.setItem("token",data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user)); // Store user info
        this.user = data.user;
        router.push({ name: "CustomerDashboard" });
      }
    },

    /********************* Logout User ********************** */
    async logout() {
      try {

        localStorage.clear();

        // Clear user state
        this.user = null;

        // Navigate to sign in page
        router.push({ name: "Home" });


        return true;
      } catch (error) {
        console.error("Logout failed:", error);
        this.errors = error.response?.data || { message: "Failed to logout" };
        return false;
      }
    },
  },
});
