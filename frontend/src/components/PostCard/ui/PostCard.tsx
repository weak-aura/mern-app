import React from 'react';
import {Button} from "../../buttons/Button";
import {Post, setIsPostIdSubmitted} from "../../../redux/features/slices/postSlice.ts";
import styles from "./PostCard.module.scss";
import {appUseDispatch, appUseSeletor} from "../../../redux/redux-hooks.ts";
import {deletePostAsyncThunk} from "../../../redux/features/asyncActions/postAsyncThunk.ts";
import {useNavigate} from "react-router-dom";
import {BsThreeDots} from "react-icons/bs";


export const PostCard = ({description, imageUrl, title, author, _id, createdAt}: Post,) => {
  const [toggle, setToggle] = React.useState(false)
  const {user} = appUseSeletor(state => state.authReducer)
  const isCurrentUserAuthor = user?._id === author._id;
  const dateTime = new Date(createdAt);
  const formattedDateTime = dateTime.toLocaleString();
  const navigate = useNavigate()


  const handleDropDown = () => {
    setToggle(!toggle)
  }
  const handleClosePopup = () => {
    setToggle(false)
  }

  const handleOpenCard = () => {
    navigate(`/posts/${_id}`);
  }


  return (
    <>
      {/* DESKTOP_MEDIA */}
      <div className={"hidden sm:block"}>
        <div
          className="flex min-w-screen border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-[330px] flex-col">
          <div className={`${toggle && "OVERLAY fixed top-0 left-0 w-full h-full bg-transparent z-10"}`}
               onClick={handleClosePopup}
          />
          <img src={imageUrl} alt="Image" className="w-full h-[140px] object-cover rounded-t-lg"/>

          <div className="TEXT-FRAME p-3 flex-1">
            <h2
              className={`text-lg font-semibold tracking-tight text-gray-900 dark:text-white ${styles.title}`}>{title}</h2>
            <p className={`${styles.description} text-gray-700 dark:text-gray-400 `}>{description}</p>
          </div>

          <p className="AUTHOR-FRAME text-xs dark:text-gray-400 mb-1 italic text-end mr-3">Автор: {author?.email}</p>
          <p className="CREATEDAT text-xs dark:text-gray-400 mb-1 italic text-end mr-3">{formattedDateTime}</p>

          <div className="BTN-FRAME px-3 pb-3 flex justify-between items-center">
            <Button onClick={handleOpenCard}>Открыть</Button>

            {isCurrentUserAuthor && (
              <div title="Выпадающий список" className={`DROPDOWN-BTN cursor-pointer ${styles.toggle}`}
                   onClick={handleDropDown}>
                <BsThreeDots className="size-6"/>
                <div title="" className={`absolute block bottom-[100%] right-[0%] ${!toggle && "hidden"}`}>
                  <Popup postId={_id}/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* MOBILE_MEDIA */}
      <div className={"block sm:hidden"}>
        
        <div className={styles.mob_card_root} onClick={handleOpenCard}>
          <img src={imageUrl} alt="image"/>
            <div className={styles.mob_info_root}>
              <h1 className={styles.mob_title}>{title}</h1>
              <p className={styles.mob_description}>{description}</p>
            </div>
            <p className={styles.mob_author}>{author.email}</p>
        </div>
        
      </div>
    </>
  )
};


export interface PopupTypes {
  postId: string
}

const Popup = ({postId}: PopupTypes) => {
  const dispatch = appUseDispatch();

  const handleDeletePost = () => {
    dispatch(deletePostAsyncThunk(postId))
    dispatch(setIsPostIdSubmitted(true))
  }

  return (
    <div
      className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
      <ul className="py-2" aria-labelledby="dropdownButton">
        <li>
          <button disabled={true} className={`${styles.popup_button} cursor-not-allowed`}>
            Изменить
          </button>
        </li>
        <li>
          <button className={styles.popup_button} onClick={handleDeletePost}>
            Удалить
          </button>
        </li>
      </ul>
    </div>
  )
};


