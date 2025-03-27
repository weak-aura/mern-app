import React from 'react';
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {getAllPostsAsyncThunk} from "../../../../redux/features/asyncActions/postAsyncThunk.ts";
import {toast} from "react-hot-toast";
import {setIsPostIdSubmitted} from "../../../../redux/features/slices/postSlice.ts";
import {PostCard} from "../../../../components/PostCard";
import {Pagination} from "../../../../components/Pagination";
import {PostCardSkeleton} from "../../../../components/Skeletons/PostCardSkeleton";

export const AllPosts = () => {
  const dispatch = appUseDispatch();
  const {
    posts,
    loading: postLoading,
    status: postStatus,
    error: postError,
    message: postMsg,
    isPostIdSubmitted
  } = appUseSeletor(state => state.postReducer);

  React.useEffect(() => {
    if (postStatus !== "getAllPosts") {
      dispatch(getAllPostsAsyncThunk())
    }
  }, [])

  React.useEffect(() => {
    if (postLoading === "fulfilled" && postError && isPostIdSubmitted) {
      toast.error(postError)
      dispatch(setIsPostIdSubmitted(false))
    } else if (postLoading === "fulfilled" && postMsg && isPostIdSubmitted) {
      toast.success(postMsg)
      dispatch(setIsPostIdSubmitted(false))
    }
  }, [postLoading])

  // Состояний для пагинций
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(6); // Количество постов на странице

  // Вычисляем индексы постов для отображения на текущей странице
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto mb-[120px]">

      <div className="grid grid-cols-2 grid-rows-3 sm:grid-rows-2 lg:grid-cols-3 gap-4">
        {postLoading === "pending" && <PostCardSkeleton cards={6}/>}
        {postLoading === "fulfilled" && currentPosts.length === 0 && (<h1>Постов нет</h1>)}
        {postLoading === "fulfilled" && currentPosts?.map((el) => (
          <div key={el?._id}>
            <PostCard {...el} />
          </div>
        ))}
      </div>

      <Pagination handlePageChange={handlePageChange}
                  indexOfLastPost={indexOfLastPost}
                  indexOfFirstPost={indexOfFirstPost}
                  totalPages={totalPages}
                  currentPage={currentPage}
      />
    </div>
  );
};

