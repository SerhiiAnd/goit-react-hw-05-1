import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.div}>
      <h1 className={css.text}>Oops!</h1>
      <h2 className={css.text}>Something went wrong...</h2>
    </div>
  );
}
