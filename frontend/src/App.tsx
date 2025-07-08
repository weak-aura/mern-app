import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import {Main} from "./pages/Main";
import {Layout} from "./pages/Layout";
import {Home} from "./pages/Home";
import {Error} from "./pages/Error";
import {SkeletonTheme} from "react-loading-skeleton";

// posts:
import {AllPosts} from "./pages/posts/AllPosts";
import {OnePost} from "./pages/posts/OnePost";
import {CreatePost} from "./pages/posts/CreatePost";
import {Profile} from "./pages/Profile";
import {Login} from "./pages/Authentication/Login";
import {Register} from "./pages/Authentication/Register";
import {RecoverPassword} from "./pages/Authentication/RecoverPassword";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={"/"} element={<Main/>}>
    <Route path={"/"} element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path={"/posts"} element={<AllPosts/>}/>
      <Route path={"/posts/:id"} element={<OnePost/>}/>
      <Route path={"/posts/create"} element={<CreatePost/>}/>
      <Route path={"/profile"} element={<Profile/>}/>
      <Route path={"/profile/login"} element={<Login/>}/>
      <Route path={"/profile/register"} element={<Register/>}/>
      <Route path={"/profile/recover-password"} element={<RecoverPassword/>}/>
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
