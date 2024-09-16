import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";

const useShowToast = () => {
  const toast = useToast();

  const showToast = (
    id: string,
    action: "success" | "error",
    title: string,
    message?: string
  ) => {
    toast.show({
      id,
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action={action} variant="solid">
            <ToastTitle>{title}</ToastTitle>
            {message && <ToastDescription>{message}</ToastDescription>}
          </Toast>
        );
      },
    });
  };

  return showToast;
};

export default useShowToast;
