import { signUp } from "../database/accountFunc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
type Inputs = {
  email: string;
  password: string;
};
const TestSigninInput = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("aiueo");
    signUp(data.email, data.password, () => router.replace("/main/main"));
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
    </div>
  );
};

export default TestSigninInput;
