import { SubmitHandler, useForm } from "react-hook-form";
import { regexs } from "../../constants/regex";
import { trpc } from "../../utils/trpc";
import { errorMap } from "../../constants/errorMap";
import { FC } from "react";
import { toast } from "react-toastify";
import styles from "./CreateAccount.module.scss";

interface ICreateAccountFields {
  name: string;
  email: string;
  password: string;
}

interface ICreateAccount {
  handleSuccess: () => void;
}

const CreateAccount: FC<ICreateAccount> = ({ handleSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAccountFields>();

  const insertUserMutation = trpc.db.insertUser.useMutation({
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
      handleSuccess();
    },
  });

  const onSubmit: SubmitHandler<ICreateAccountFields> = async (data) => {
    insertUserMutation.mutate(data);
  };

  return (
    <>
      <div className={styles.body}>
        <div>Create an Account</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Enter Your Name</label>
          <input
            {...register("name", {
              required: true,
            })}
          />
          <label>Enter Your Email</label>
          <input
            {...register("email", {
              required: true,
              pattern: RegExp(regexs.EMAIL_REGEX),
            })}
          />
          <label>Enter your Password</label>
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
          />
          {!!errors.root && <div>{errors.root.message}</div>}
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default CreateAccount;
