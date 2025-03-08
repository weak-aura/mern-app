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

// auth:
import {Register} from "./pages/auth/Register";
import {Verification} from "./pages/auth/Verification";
import {Login} from "./pages/auth/Login";
import {RecoverPassword} from "./pages/auth/RecoverPassword";
import {RecoverPasswordEmailVerification} from "./pages/auth/RecoverPasswordEmailVerification";
import {RecoverPasswordReset} from "./pages/auth/RecoverPasswordReset";

// posts:
import {AllPosts} from "./pages/posts/AllPosts";
import {OnePost} from "./pages/posts/OnePost";
import {CreatePost} from "./pages/posts/CreatePost";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={"/"} element={<Main/>}>
    <Route path={"/"} element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path={"/posts"} element={<AllPosts/>}/>
      <Route path={"/posts/:id"} element={<OnePost/>}/>
      <Route path={"/posts/create"} element={<CreatePost/>}/>
      <Route path={"/register"} element={<Register/>}/>
      <Route path={"/login"} element={<Login/>}/>
      <Route path={"/verification"} element={<Verification/>}/>
      <Route path={"/recover_password"} element={<RecoverPassword/>}/>
      <Route path={"/recover_password/email_verification"} element={<RecoverPasswordEmailVerification/>}/>
      <Route path={"/recover_password/reset"} element={<RecoverPasswordReset/>}/>
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
