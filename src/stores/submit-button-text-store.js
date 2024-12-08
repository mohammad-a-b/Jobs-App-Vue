import { reactive } from "vue";

const buttonState = reactive({
  text: "ثــبــت",
});

export const useSubmitButtonText = () => {
  const setSubmitting = () => {
    buttonState.text = "در حال ثبت...";
  };

  const setSubmitted = () => {
    buttonState.text = "ثبت شد";
  };

  const resetText = () => {
    buttonState.text = "ثــبــت";
  };

  return { buttonState, setSubmitting, setSubmitted, resetText };
};
