import { useForm, SubmitHandler } from "react-hook-form";
import { regexs } from "../../constants/regex";
import { useState } from "react";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import { trpc } from "../../utils/trpc";
import { toast } from "react-toastify";
import { errorMap } from "../../constants/errorMap";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./Login.module.scss";
import Button from "../../components/Button/Button";
import Modal from "@mui/material/Modal";

interface ILoginFormFields {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormFields>();
  const navigate = useNavigate();

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

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className={styles.container}>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formField}>
            <input
              className={styles.formInput}
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                pattern: RegExp(regexs.EMAIL_REGEX),
              })}
            />
            {errors.email?.type == "required" && <div>Must enter an email</div>}
            {errors.email?.type == "pattern" && <div>Invalid email format</div>}
          </div>
          <div className={styles.formField}>
            <input
              className={styles.formInput}
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password?.type == "required" && (
              <div>Must enter a password</div>
            )}
          </div>

          <Button type="submit">Login</Button>
        </form>
        <div>
          <Button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Account
          </Button>
        </div>
      </div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        disableEscapeKeyDown={false}
      >
        <CreateAccount handleSuccess={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default Login;
