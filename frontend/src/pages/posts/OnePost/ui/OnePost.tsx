import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {getOnePostAsyncThunk} from "../../../../redux/features/asyncActions/postAsyncThunk.ts";
import styles from "./OnePost.module.scss";

export const OnePost = () => {
  const {id} = useParams();
  const dispatch = appUseDispatch();
  const navigate = useNavigate();
  const {onePost, loading: postLoading} = appUseSeletor(state => state.postReducer)
  const dateTime = onePost?.createdAt ? new Date(onePost.createdAt) : null; 
  const formattedDateTime = dateTime ? dateTime.toLocaleString() : '';
  
  
  
  React.useEffect(() => {
    dispatch(getOnePostAsyncThunk(id))
  }, [])

  const handlePreviousPage = () => {
    navigate("/posts/")
  }

  return (
    <div>
      {postLoading === "pending" && (<h1>loading...</h1>)}
      <div className="bg-[#343E4D] flex flex-col h-[828px] rounded-b-xl">
        {/* Navigation Bar */}
        <nav className="bg-[#1f2328] flex justify-between items-center py-2 px-4">
          <button className={styles.button} onClick={handlePreviousPage}>
            Назад
          </button>
        </nav>

        <div className="container mx-auto px-4 py-4 flex-grow overflow-y-scroll">
          {/* Image */}
          <div className="mb-4 flex justify-center">
            <img src={onePost?.imageUrl} alt="Image" className="rounded-lg shadow-lg object-contain"/>
          </div>

          {/* Content */}
          <div className="bg-[#161b22] p-6 rounded-lg shadow-md text-white">
            <h2 className="text-2xl font-bold mb-4">
              {onePost?.title}
            </h2>
            <p className="mb-4">
              {onePost?.description}
            </p>
            <p className="mb-2">{onePost?.author.email}</p>
            <p>{formattedDateTime}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

//
// <button onClick={handlePreviousPage}
//         className={styles.button}>Назад</button>
// <img src={onePost?.imageUrl} alt="img"/>
// <h1>{onePost?.title}</h1>
// <p>{onePost?.description}</p>
// <p>{onePost?.author.email}</p>
// <p>{onePost?.createdAt}</p>