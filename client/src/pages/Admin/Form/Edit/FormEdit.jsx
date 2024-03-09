/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useApiAnimes } from "../../../../hooks/useApiAnimes";
import { useState } from "react";
export const FormEdit = ({ anime, disabled, id,name }) => {
  const { putAnime } = useApiAnimes();
  const { register, handleSubmit,setValue } = useForm();
  const [show, setShow] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    const putData = {
      ...data,
    }
    console.log(putData)
  });
  return (
    <form className="edit__form" onSubmit={onSubmit}>
      <label className="label" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        name="title"
        className="input"
        id="title"
        disabled={disabled.title}
        required={true}
        {...register("title")}
      />
      <label className="label" htmlFor="status">
        Status
      </label>
      <input
        type="text"
        name="status"
        className="input"
        id="status"
        disabled={disabled.status}
        required={true}
        {...register("status")}
      />
      <label className="label" htmlFor="media_type">
        Media type
      </label>
      <input
        type="text"
        name="media_type"
        className="input"
        id="media_type"
        disabled={disabled.media_type}
        required={true}
        {...register("media_type")}
      />
      <label className="label" htmlFor="num_episodes">
        Episodes
      </label>
      <input
        type="text"
        name="num_episodes"
        className="input"
        id="num_episodes"
        disabled={disabled.num_episodes}
        required={true}
        {...register("num_episodes")}
      />
      <label className="label" htmlFor="genres">
        Genres
      </label>
      <input
        type="text"
        name="genres"
        className="input"
        id="genres"
        disabled={disabled.genres}
        required={true}
        {...register("genres")}
      />
      <label className="label" htmlFor="synopsis">
        Synopsis
      </label>
      <textarea
        type="text"
        name="synopsis"
        className="input"
        id="synopsis"
        disabled={disabled.synopsis}
        required={true}
        {...register("synopsis")}
      />
      <button
        className="btn"
        type="button"
        onClick={() => {
          setValue(name, anime[name]);
          setShow(true);
        }}
      >
        Get Value
      </button>
      {show && (
        <input type="submit" value="Edit" className="btn" />
      )}
    </form>
  );
};
