import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements,} from "react-router-dom";
import {Main} from "./pages/Main";
import {Layout} from "./pages/Layout";
import {Home} from "./pages/Home";
import {Error} from "./pages/Error";

// auth:
import {Register} from "./pages/auth/Register";
import {Verification} from "./pages/auth/Verification";
import {Login} from "./pages/auth/Login";

// posts:
import {AllPosts} from "./pages/posts/AllPosts";
import {OnePost} from "./pages/posts/OnePost";
import {CreatePost} from "./pages/posts/CreatePost";
import {SkeletonTheme} from "react-loading-skeleton";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={"/"} element={<Main/>}>
    <Route path={"/"} element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path={"/posts"} element={<AllPosts/>}/>
      <Route path={"/posts/:id"} element={<OnePost/>}/>
      <Route path={"/posts/create"} element={<CreatePost/>}/>
    </Route>
    <Route>
      <Route path={"/register"} element={<Register/>}/>
      <Route path={"/login"} element={<Login/>}/>
      <Route path={"/verification"} element={<Verification/>}/>
    </Route>
    <Route path={"/*"} element={<Error/>}/>
  </Route>
))

function App() {

  return (
    <div className="container m-auto">
      <SkeletonTheme baseColor="#1F2937" highlightColor="#374151">
        <RouterProvider router={router}/>
      </SkeletonTheme>
    </div>
  )
}

export default App
