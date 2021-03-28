import { Link } from "react-router-dom";

import style from "./OfferItem.module.css";

const OfferItem = (props) => {
  return (
    <div className={style.offer}>
      <h2> {props.offerName} </h2> <img src={props.imageUrl} alt="" />
      <p> {props.description} </p>{" "}
      <p>
        {" "}
        <b> {props.price}$ </b>{" "}
      </p>{" "}
      <p className={style.author}>
        <small> Offer is made by </small>:{props.company}{" "}
      </p>{" "}
      <Link to={`offers/details/${props.id}`}> Details </Link>{" "}
    </div>
  );
};

export default OfferItem;
