import style from './button-loader.module.scss';

const ButtonLoader = () => {
  return (
    <div className={style.wrapper}>
      <span className={style.loader}></span>
    </div>
  );
};

export default ButtonLoader;
