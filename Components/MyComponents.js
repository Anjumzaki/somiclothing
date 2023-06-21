import styles from '../styles/MyComponent.module.css'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faBars,
  faClose,
  faCaretUp,
  faMinus,
  faPlus,
  faCaretDown,
  faCaretLeft,
  faCaretRight
} from "@fortawesome/free-solid-svg-icons";

export function MyInput(props) {
  return (
    <div className={props.parentClassName ? props.parentClassName + " " + [styles.MyInputParentDiv] : [styles.MyInputParentDiv]}>
      <div className={props.labelContainerClassName ? props.labelContainerClassName + " " + [styles.MyInputLabelContainer] : [styles.MyInputLabelContainer]}>
        {props.label ? <h3 className={props.labelClassName ? props.labelClassName + " " + [styles.MyInputLabel] : [styles.MyInputLabel]}>{props.label}</h3> : null}
        {props.smallLabel ? <h3 className={props.smallLabelClassName ? props.smallLabelClassName + " " + [styles.MyInputSmallLabel] : [styles.MyInputSmallLabel]}>{props.smallLabel}</h3> : null}
      </div>
      {props.icon ?
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
          <input type={props.inputType} value={props.value} className={props.inputClassName ? props.inputClassName + " " + [styles.MyInputStyle] : [styles.MyInputStyle]} onChange={props.onChange} placeholder={props.placeholder} />
          <FontAwesomeIcon
            className={props.iconClassName ? props.iconClassName + " " + styles.MyInputIconStyle : styles.MyInputIconStyle}
            onClick={props.iconOnClick}
            icon={props.icon}
            size={props.iconSize} />
        </div>
        :
        <input value={props.value} className={props.inputClassName ? props.inputClassName + " " + [styles.MyInputStyle] : [styles.MyInputStyle]} onChange={props.onChange} placeholder={props.placeholder} />
      }

    </div>
  );
}


export function MyButton(props) {
  return (
    <div onClick={props.onClick} className={props.parentClassName ? props.parentClassName + " " + [styles.MyButtonParentDiv] : [styles.MyButtonParentDiv]}>
      <h1 className={props.textClass ? props.textClass + " " + [styles.MyButtonTextStyle] : [styles.MyButtonTextStyle]}>{props.text}</h1>
    </div>
  );
}

export function TextWithLabel(props) {
  return (
    <div className={props.parentClassName ? props.parentClassName + " " + [styles.textWithLabelCon] : [styles.textWithLabelCon]}>
      <h1 className={props.labelClass ? props.labelClass + " " + [styles.TWLLabel] : [styles.TWLLabel]}>{props.label}</h1>
      <h1 className={props.textClass ? props.textClass + " " + [styles.TWLText] : [styles.TWLText]}>{props.text}</h1>
    </div>
  );
}

export function Navbar(props) {
  const [navOpen, setNavOpen] = useState(false);
  const [userOptionsOpen, setUserOptionsOpen] = useState(false);
  if (typeof window !== 'undefined') {
    document.body.onmousedown = () => {
      setUserOptionsOpen(false);
    };
  }
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarTopDiv}>
        <div className={styles.navbarTopIconDiv}>
        <Link href="/">
          <a className={styles.navbarTopIconLink}>
          <h1 className={styles.logo}>Somi Clothings</h1>
          </a>
        </Link>
        </div>
        <MyInput inputClassName={styles.navbarSearchInput} icon={faSearch} iconSize={32} onChange={props.OnNavBarInputChange} onIconClick={props.onNavBarIconClick} parentClassName={styles.navbarSearchInputContainer} placeholder="Search" />

        <div className={styles.navbarTopDivIcons}>
          <Link href={"/Cart"}>
            <FontAwesomeIcon
              className={styles.navbarDivIcon}
              icon={faShoppingCart}
              size={32} />
          </Link>
          <div className={styles.navbarUserOptionsDiv}>
            <FontAwesomeIcon
              className={styles.navbarDivIcon}
              icon={faUser}
              onClick={() => setUserOptionsOpen(!userOptionsOpen)}
              size={32} />
            <div className={userOptionsOpen ? styles.navbarUserOptions + " " + styles.navbarUserOptionsShown : styles.navbarUserOptions}>
              <FontAwesomeIcon
                className={styles.navbarUserOptionIcon}
                icon={faCaretUp}
                size={32} />
              <Link href={'/Login'}><a className={styles.navbarUserOptionLink}>Login</a></Link>
              <Link href={'/Signup'}><a className={styles.navbarUserOptionLink}>Signup</a></Link>
            </div>
          </div>
          <FontAwesomeIcon
            onClick={() => setNavOpen(!navOpen)}
            className={styles.navbarOpenIcon}
            icon={navOpen ? faClose : faBars}
            size={32} />
        </div>

      </div>
      <div className={navOpen ? styles.navbarBottomDiv + " " + styles.navbarBottomDivOpen : styles.navbarBottomDiv}>
        <Link href={"/Search/Men"}><a className={styles.navbarBottomLink}>Men</a></Link>
        <Link href={"/Search/Women"}><a className={styles.navbarBottomLink}>Women</a></Link>
        <Link href={"/Search/Kids"}><a className={styles.navbarBottomLink}>Kids</a></Link>
        <Link href={"/"}><a className={styles.navbarBottomLink}>Contact Us</a></Link>
      </div>
    </div>
  );
}

export function ItemCard(props) {
  return (
    <div className={styles.ItemCardCon}>
      <Link href={props.link}>
        <a>
          <div className={styles.ItemCardImageCon}>
            {props.sale ? <h1 className={styles.ItemCardImageOptionSaleText}>Sale</h1> : null}
            <div className={styles.ItemCardImageOption}>
              <h1 className={styles.ItemCardImageOptionButton}>See More</h1>
            </div>
            <img className={styles.ItemCardImage} src={props.imageSrc} />
          </div>
        </a>
      </Link>
      <div className={styles.ItemCardInfoCon}>
        <h1 className={styles.ItemCardItemName}>{props.title}</h1>
        <div className={styles.ItemCardPriceCon}>
          <h2 className={styles.ItemCardPrice}>{props.price}RS</h2>
          {props.priceOld ? <h2 className={styles.ItemCardPriceOld}>{props.priceOld}RS</h2> : null}
        </div>
      </div>
    </div>
  );
}

export function Divider(props) {
  return (
    <div className={props.dividerClassname ? props.dividerClassname + " " + styles.divider : styles.divider}>
      <h2 className={props.dividerTextClassname ? props.dividerTextClassname + " " + styles.dividerText : styles.dividerText}>{props.title}</h2>
      <div className={props.dividerLineClassname ? props.dividerLineClassname + " " + styles.dividerLine : styles.dividerLine}></div>
    </div>
  )
}

export function CartItem(props) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [quantity, setQuantity] = useState(props.quantity);
  const [stock, setStock] = useState(0);
  const [dataState, setDataState] = useState({});
  const [gotData, setGotData] = useState(false);

  useEffect(() => {
    FindProduct();
  }, []);

  function FindProduct() {
    axios.get(`http://localhost:1000/findProduct/` + props.id).then((response) => {
      if (response.data.product) {
        setDataState(response.data.product);
        setGotData(true);
      }
    });
  }

  useEffect(() => {
    getAvailableStock();
  }, [gotData]);


  function getAvailableStock() {
    if (gotData) {
      props.onTotalGet(dataState.price * quantity);
      for (var i = 0; i < dataState.size.length; i++) {
        if (dataState && dataState.size[i].name === props.size) {
          for (var j = 0; j < dataState.size[i].color.length; j++) {
            if (dataState.size[i].color[j].name === props.color) {
              setStock(dataState.size[i].color[j].stock);
            }
          }
        }
      }
    }
  }



  return (
    <div className={styles.CartItemCon}>
      <div className={styles.CartItemProductImgCon}>
        <div className={styles.CartItemProductImgSubCon}>
          {gotData ?
            <img className={styles.CartItemProductIcon} src={dataState.imageSrc[0]} />
            : null}
          {props.cart ? null :
            <h1 className={styles.CartItemProductQuantityTextOnImage}>{quantity}</h1>}
        </div>
        {gotData ?
          <h2 className={styles.CartItemProductText}>{dataState.name}</h2> : null}
      </div>
      <div className={moreOpen ? styles.CartItemSM + " " + styles.CartItemSMOpen : styles.CartItemSM}>
        <h1 className={styles.CartItemProductText}><span className={styles.CartItemProductTextLabel}>Size:</span>{props.size}</h1>
        <h1 className={styles.CartItemProductText}><span className={styles.CartItemProductTextLabel}>Color:</span>{props.color}</h1>
      </div>
      {props.cart ?
        <div className={moreOpen ? styles.CartItemSM + " " + styles.CartItemSMOpen : styles.CartItemSM}>
          <h1 className={styles.CartItemProductText}><span className={styles.CartItemProductTextLabel}>Price:</span>{gotData ? dataState.price : 0} Rs</h1>
          <div className={styles.CartItemProductQuantityCon}>
            <span className={styles.CartItemProductTextLabel + " " + styles.CartItemProductQuantityLabel}>Quantity:</span>
            <FontAwesomeIcon
              onClick={quantity >= 2 ? () => { setQuantity(quantity - 1); props.onTotalRemove(dataState.price) } : null}
              className={styles.CartItemProductQuantityIcon}
              icon={faMinus}
              size={32} />
            <h1 className={styles.CartItemProductQuantityText}>{quantity}</h1>
            <FontAwesomeIcon
              onClick={quantity < stock ? () => { setQuantity(quantity + 1); props.onTotalAdd(dataState.price) } : () => alert("No More Stock")}
              className={styles.CartItemProductQuantityIcon}
              icon={faPlus}
              size={32} />
          </div>
        </div> : null}
      <div className={moreOpen ? styles.CartItemSM + " " + styles.CartItemSMOpen : styles.CartItemSM}>
        <h1 className={styles.CartItemProductText}><span className={styles.CartItemProductTextLabel}>Total:</span>{(gotData ? dataState.price : 0) * quantity} Rs</h1>
      </div>
      {props.cart ?
        <FontAwesomeIcon
          onClick={props.cart ? () => props.onRemove() : null}
          className={styles.CartItemRemoveIcon}
          icon={faClose}
          size={32} /> : null}
      <FontAwesomeIcon
        onClick={() => setMoreOpen(!moreOpen)}
        className={styles.CartItemOpenMoreIcon}
        icon={moreOpen ? faCaretUp : faCaretDown}
        size={32} />
    </div>
  );
}

export function ImageSlider(props) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className={styles.ImageSliderCon}>
      {props.imageSrc.map(function (d, i) {
        return (<img src={d} key={i} className={activeImage == i ? styles.ImageSliderImg + " " + styles.ImageSliderImgActive : styles.ImageSliderImg} />)
      })}
      <div className={styles.ImageSliderIconCon}>
        <div className={styles.ImageSliderIconSubCon}
          onClick={activeImage == 0 ? () => setActiveImage(props.imageSrc.length - 1) : () => setActiveImage(activeImage - 1)}>
          <FontAwesomeIcon
            className={styles.ImageSliderIcon}
            icon={faCaretLeft}
            size={32} />
        </div>
        <div className={styles.ImageSliderIconSubCon}
          onClick={activeImage == props.imageSrc.length - 1 ? () => setActiveImage(0) : () => setActiveImage(activeImage + 1)}>
          <FontAwesomeIcon
            className={styles.ImageSliderIcon}
            icon={faCaretRight}
            size={32} />
        </div>
      </div>
    </div>
  );
}

export function BackToTopButton() {
  const [show, setShow] = useState(false);
  if (typeof window !== 'undefined') {
    window.onscroll = function () { scrollFunction() };
  }
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
      setShow(true)
    else
      setShow(false)
  }
  function ScrollToTop() {
    if (typeof window !== 'undefined') {
      if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        document.body.scrollTop = document.body.scrollTop - 50;
        document.documentElement.scrollTop = document.documentElement.scrollTop - 50;
        setTimeout(function () {
          ScrollToTop();
        }, 1);
      }
    }
  }
  return (
    <FontAwesomeIcon
      onClick={() => ScrollToTop()}
      className={show ? styles.BackToTopButton + " " + styles.BackToTopButtonShown : styles.BackToTopButton}
      icon={faCaretUp}
      size={32} />
  );
}