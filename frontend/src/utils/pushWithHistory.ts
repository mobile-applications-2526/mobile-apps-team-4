import AllRoutes from "@/types/Allroutes";
import { router } from "expo-router";

const pushWithHistory = (tabHref: AllRoutes, screenHref: AllRoutes): void => {
  router.replace(tabHref);
  
  setTimeout(() => {
    router.push(screenHref);
  }, 50);
};

export default pushWithHistory;