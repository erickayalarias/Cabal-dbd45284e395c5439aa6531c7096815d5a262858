import { useSnackbar } from "notistack"


export const SnackBarComponent = () => {
const { enqueueSnackbar } = useSnackbar();
  return (
    enqueueSnackbar("Entry updated", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
            vertical: "top",
            horizontal: "right",
        }
    })
  )
}
