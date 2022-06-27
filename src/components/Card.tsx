import { PropsWithChildren } from "react";
import styles from "./Card.module.css";

export default function Card({
  name,
  image,
  price,
  color,
  hidden,
  expanded,
  description,
  onClickHandler,
}: PropsWithChildren<PlpToPdp.Poduct>) {
  const cardClassNames = getClassNames([
    styles.card,
    styles[color || "gray"],
    hidden ? " " + styles.hidden : "",
    expanded ? " " + styles.expanded : "",
  ]);
  const descClassNames = getClassNames([
    styles.description,
    styles.down,
    description ? "" : styles.hidden,
  ]);
  const addToBagClassNames = getClassNames([
    styles.addToBag,
    styles.down,
    description ? "" : styles.hidden,
  ]);
  return (
    <div className={cardClassNames}>
      <img
        onClick={onClickHandler}
        src={image}
        alt=""
        className={styles.cardImage}
      />
      <h4 onClick={onClickHandler} className={styles.title}>
        {name}
      </h4>
      <span className={styles.price}>${price}</span>
      <p className={descClassNames}>{description}</p>
      <p className={addToBagClassNames}>
        <select className={styles[color || "gray"]}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <button className={styles[color || "gray"]}>add to cart</button>
      </p>
    </div>
  );
}

const getClassNames: (classNames: Array<string>) => string = (classNames) => {
  return classNames.join(" ");
};
