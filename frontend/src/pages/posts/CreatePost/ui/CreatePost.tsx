import React from 'react';
import {Button} from "../../../../components/buttons/Button";
import styles from "./CreatePost.module.scss";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {createPostAsyncThunk} from "../../../../redux/features/asyncActions/postAsyncThunk.ts";
import {toast} from "react-hot-toast";
import {Spinner} from "../../../../components/Spinner";

export const CreatePost = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = React.useState(0);

  const dispatch = appUseDispatch()
  const {loading, message, error} = appUseSeletor(state => state.postReducer)
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
    setFileInputKey(fileInputKey + 1);
  };
  const handleRemoveImage = () => {
    setImage(null)
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    dispatch(createPostAsyncThunk(formData))
    setIsFormSubmitted(true)
    
  }

  React.useEffect(() => {
    if (loading === "fulfilled" && error && isFormSubmitted) {
      toast.error(error)
      setIsFormSubmitted(false)
    } else if (loading === "fulfilled" && message && isFormSubmitted) {
      toast.success(message)
      setTitle("")
      setDescription("")
      setImage(null)
      setIsFormSubmitted(false)
    }
  }, [loading])


  return (
    <form onSubmit={handleSubmit}>

      <label className={styles.label}>Название</label>
      <input type="text"
             className={styles.input}
             value={title}
             onChange={handleTitleChange}
             required/>

      <label className={styles.label}>Описание</label>
      <input type="text"
             className={styles.input}
             value={description}
             onChange={handleDescriptionChange}
             required/>

      <label className={styles.label}>Загрузка картинки</label>

      <div className={styles.input_file_body}>

        <div className={styles.file_name_body}>
          <svg className="min-w-[16px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               viewBox="0 0 612.675 612.675">
            <path
              d="M581.209 223.007 269.839 530.92c-51.592 51.024-135.247 51.024-186.839 0-51.592-51.023-51.592-133.737 0-184.761L363.248 69.04c34.402-34.009 90.15-34.009 124.553 0 34.402 34.008 34.402 89.166 0 123.174l-280.249 277.12c-17.19 17.016-45.075 17.016-62.287 0-17.19-16.993-17.19-44.571 0-61.587L394.37 161.42l-31.144-30.793-249.082 246.348c-34.402 34.009-34.402 89.166 0 123.174 34.402 34.009 90.15 34.009 124.552 0l280.249-277.12c51.592-51.023 51.592-133.737 0-184.761-51.593-51.023-135.247-51.023-186.839 0L36.285 330.784l1.072 1.071c-53.736 68.323-49.012 167.091 14.5 229.88 63.512 62.79 163.35 67.492 232.46 14.325l1.072 1.072 326.942-323.31-31.122-30.815z"
              data-original="#000000"/>
          </svg>
          <p className={styles.file_name}>{image?.name || "Файл не выбран"}</p>
        </div>

        <div className="flex justify-end gap-1">
          {image && (
            <button type="button"
                    className={styles.input_file_label}
                    onClick={handleRemoveImage}>&#x2716;</button>
          )}

          <label htmlFor="image" className={styles.input_file_label}>Выбрать файл</label>
          <input type="file" id="image" key={fileInputKey} className="hidden" onChange={handleImageChange}/>
        </div>

      </div>
      <br/>
      <Button className={`w-[85px] ${loading === "pending" ? "pointer-events-none cursor-default" : ""}`} type={"submit"}>{loading === "pending" ? (<Spinner/>) : "Создать"}</Button>
    </form>
  );
};

