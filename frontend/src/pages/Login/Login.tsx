import { useForm, SubmitHandler } from "react-hook-form";
import { regexs } from "../../constants/regex";
import { useContext, useState } from "react";
import Modal from "../../components/Modal/Modal";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import { trpc } from "../../utils/trpc";
import { toast } from "react-toastify";
import { errorMap } from "../../constants/errorMap";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          {...register("email", {
            required: true,
            pattern: RegExp(regexs.EMAIL_REGEX),
          })}
        />
        {errors.email?.type == "required" && <div>Must enter an email</div>}
        {errors.email?.type == "pattern" && <div>Invalid email format</div>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
          })}
        />
        {errors.password?.type == "required" && (
          <div>Must enter a password</div>
        )}
        <input type="submit" />
      </form>
      <div>
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Create Account
        </button>
      </div>
      <Modal
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
      >
        <CreateAccount handleSuccess={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default Login;
