import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useAccountFunc } from "../database/authFunc";
type Inputs = {
  email: string;
  password: string;
};
const TestSigninInput = () => {
  const accountFunc = useAccountFunc();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    accountFunc.signUp(data.email, data.password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="test" {...register("email")} />
        <input {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
      <a onClick={() => router.replace("login")}>ログインはこちら</a>
    </div>
  );
};

export default TestSigninInput;
