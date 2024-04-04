import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css["loader-container"]}>
      {" "}
      {}
      <ThreeDots
        visible={true}
        height={80}
        width={80}
        color="orange"
        radius={9}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
      />
    </div>
  );
};

export default Loader;
