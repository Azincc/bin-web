/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string;
    readonly VUE_API_ENDPOINT: string;
  }

  declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component:DefineComponent<{},{},any>
    export default component
}