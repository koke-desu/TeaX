import { logIn } from "../database/accountFunc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
type Inputs = {
  email: string;
  password: string;
};
const TestLoginInput = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("aiueo");
    logIn(data.email, data.password, () => router.replace("/main/main"));
  };

  //   console.log(watch("email")); // watch input value by passing the name of it

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("email")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
      <a onClick={() => router.replace("signup")}>アカウントが無い方</a>
    </div>
  );
};

export default TestLoginInput;
