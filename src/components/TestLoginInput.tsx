import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useAccountFunc } from "../database/authFunc";
import { css } from "@emotion/css";
type Inputs = {
  email: string;
  password: string;
};
const TestLoginInput = () => {
  const accountFunc = useAccountFunc();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    accountFunc.logIn(data.email, data.password);
  };
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <input placeholder="メールアドレス" {...register("email")} className={style.input} />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="パスワード"
          className={style.input}
        />
        {errors.password && <span className={style.errorMessage}>入力してください！</span>}
        <input type="submit" className={style.submit} />
      </form>
      <div className={style.line} />
      <a onClick={() => router.replace("signup")} className={style.toggleModeButton}>
        アカウントが無い方
      </a>
    </div>
  );
};

export default TestLoginInput;

const style = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 100vw;
    padding: 32px;
    margin-top: 64px;
  `,

  form: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 100vw;
  `,

  input: css`
    padding: 8px 16px;
    border-radius: 8px;
    border: darkgray 1px solid;
    font-size: 16px;
  `,

  errorMessage: css`
    color: red;
    font-size: 12px;
  `,

  submit: css`
    padding: 8px 32px;
    background-color: #e4c76f;
    border-radius: 8px;
    border: gray 1px solid;
  `,

  line: css`
    height: 1px;
    background-color: gray;
    width: 80vw;
  `,

  toggleModeButton: css`
    padding: 16px 32px;
    background-color: #87ce41;
    border-radius: 8px;
  `,
};
