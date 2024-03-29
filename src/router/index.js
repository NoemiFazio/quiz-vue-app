import {createRouter, createWebHistory} from "vue-router"
import HomeView from "@/views/HomeView.vue";
// Todo: Do we want an aboutPage?
// import AboutView from "@/views/AboutView.vue";
import NotFoundView from "@/views/404View.vue";
import QuizView from "@/views/QuizView.vue";
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue";
import EmailConfirmationView from "@/views/EmailConfirmationView.vue";
import ForgotPasswordView from "@/views/ForgotPasswordView.vue"
import MeView from "@/views/MeView.vue";
import useAuthUser from "@/utils/UseAuthUser";
import ResetPasswordView from "@/views/ResetPasswordView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/home",
            redirect: "/"
        },
        {
            path: "/quiz/:id",
            name: "quiz",
            component: QuizView,
            
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
        },
        {
            path: "/email-confirmation",
            name: "emailConfirmation",
            component: EmailConfirmationView,
        },
        {
            path: "/forgotPassword",
            name: "forgotPassword",
            component: ForgotPasswordView,
        },
        {
            path: "/me",
            name: "me",
            component: MeView,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/reset-password",
            name: "resetPassword",
            component: ResetPasswordView,
        },
        {
            name: "logout",
            path: "/logout",
            beforeEnter: async () => {
              const { logout } = useAuthUser();
              await logout();
              return { name: "login" };
            },
          },
        {path: "/:catchall(.*)*", name: "not found", component: NotFoundView}
    ]
}) 

router.beforeEach((to) => {
    const { isLoggedIn } = useAuthUser();
    if (
      !isLoggedIn() &&
      to.meta.requiresAuth &&
      !Object.keys(to.query).includes("fromEmail")
    ) {
      return { name: "login" };
    }
  });

export default router