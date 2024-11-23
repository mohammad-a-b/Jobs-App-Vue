import { reactive } from "vue";

const toastData = reactive({
  message: "",
  type: "success", // ||'error'
  visible: false,
});

export const useToast = () => {
  const showToast = (message, type = "success") => {
    toastData.message = message;
    toastData.type = type;
    toastData.visible = true;
    setTimeout(() => {
      toastData.visible = false;
    }, 2000);
  };

  return { toastData, showToast };
};
