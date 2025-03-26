import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { regexs } from "../../constants/regex";
import { trpc } from "../../utils/trpc";
import { errorMap } from "../../constants/errorMap";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

interface ICreateAccountFields {
  name: string;
  email: string;
  password: string;
}

const CreateAccount = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAccountFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const insertUserMutation = trpc.user.insertUser.useMutation({
    onError(error) {
      const { data } = error;

      toast(errorMap[data?.code || "DEFAULT"], {
        type: "error",
      });
    },
    onSuccess() {
      toast("Successfully created new user.", {
        type: "success",
      });
      navigate(routes.LOGIN);
    },
  });

  const onSubmit: SubmitHandler<ICreateAccountFields> = async (data) => {
    insertUserMutation.mutate(data);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography align="center" component="h1">
            Create an Account
          </Typography>
          <Stack
            rowGap="1rem"
            margin="1rem"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Enter your name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: RegExp(regexs.EMAIL_REGEX),
                  message: "Please enter a valid email",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Enter your email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Enter your password"
                  type="password"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Button type="submit" variant="outlined">
              Create Account
            </Button>
            <Link href={routes.LOGIN}>Back to Login</Link>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default CreateAccount;
