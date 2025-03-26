import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { regexs } from "../../constants/regex";
import { trpc } from "../../utils/trpc";
import { toast } from "react-toastify";
import { errorMap } from "../../constants/errorMap";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { API_URL } from "../../constants/env";

interface ILoginFormFields {
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  console.log(API_URL);
  const signInMutation = trpc.auth.loginUser.useMutation({
    onError(error) {
      const { data } = error;
      toast(errorMap[data?.code || "DEFAULT"], {
        type: "error",
      });
    },
    onSuccess() {
      navigate(routes.HOME);
    },
  });

  const onSubmit: SubmitHandler<ILoginFormFields> = (data) => {
    signInMutation.mutate(data);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography align="center" component="h1">
          Login
        </Typography>
        <Stack
          rowGap="1rem"
          margin="1rem"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            Sign In
          </Button>
          <Link href={routes.CREATE_ACCOUNT}>Create an Account</Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
