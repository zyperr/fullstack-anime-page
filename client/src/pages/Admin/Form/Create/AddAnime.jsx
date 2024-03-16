import { useForm } from "react-hook-form";
import { useState,useContext } from "react";
import Submit from "../../../../components/Btn"
import {HeaderSection} from "../../../../components/HeaderSection"
import { Context } from "../../../../context/Provider";
import { useApiAnimes } from "../../../../hooks/useApiAnimes";

const AddAnime = () => {
  const [checkedGenres, setCheckedGenres] = useState([]);
  const { tap, setTap } = useContext(Context);
  const [show, setShow] = useState(false);

  const genresAnime = [
    "Shonen",
    "Shojo",
    "Seinen",
    "Mecha",
    "Fantasy",
    "Romance",
    "Adventure",
    "Comedy",
    "Drama",
    "Sci-Fi",
    "Horror",
    "Slice of Life",
    "Action",
    "Supernatural",
    "Mystery",
    "Psychological",
    "Thriller",
    "Martial Arts",
    "Ecchi",
  ];
  const { addAnime } = useApiAnimes();
  const handleCheckBoxChange = (e) => {
    const { value } = e.target;
    if (checkedGenres.includes(value)) {
      setCheckedGenres(checkedGenres.filter((item) => item !== value));
    } else {
      setCheckedGenres([...checkedGenres, value]);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    data.title  = data.title.toUpperCase();
    data.genres = checkedGenres;
    data.alternative_titles_synonyms = data.alternative_titles_synonyms.split(",") || [];
    console.log(data);
    const {res} = await addAnime(`http://127.0.0.1:8000/api/${tap}`,data);
    if(res !== 200){
      setShow(true);
      setTimeout(() => {
        setShow(false);
      },3000)
    }
    if(res === 200){
      setShow(true);
      reset()
      setTimeout(() => {
        setShow(false);
      },3000)
    }
  })
  return (
    <section className="admin__add">
      <HeaderSection fnState={setTap} initialTap={tap}/>
      <form className="admin__form" onSubmit={onSubmit}>
        <div className="form__wrapper">
          <p className="form__p">You&apos;re adding <span className={`form__span ${tap}`}>{tap}</span></p>
        </div>
        <div className="form__wrapper">
          <label htmlFor="title">title</label>
          <input type="text" {...register("title", { required: true })} id="title" />
        </div>
        <div className="form__wrapper">
          <label htmlFor="status">status</label>
          <select type="text" {...register("status", { required: true })} id="status">
            <option value="Not_yet_aired">Not yet aired</option>
            <option value="Finished">Finished</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>
        <div className="form__wrapper">
          <label htmlFor="media_type">Media Type</label>
          <select type="text" {...register("media_type", { required: true })} id="media_type">
            <option value="TV">TV</option>
            <option value="Movie">Movie</option>
            <option value="OVA">OVA</option>
          </select>
        </div>
        <div className="form__wrapper">
          <label htmlFor="num_episodes">Total Episodes</label>
          <input
            type="number"
            {...register("num_episodes")}
            id="num_episodes"
            min="0"
          />
        </div>
        <div className="form__checkbox-container">
          <h3 className="form__label">Genres</h3>
          <p className="form__p">You can select multiple  genres</p>
          <div className="checkbox-wrapper">
            {genresAnime.sort().map((item) => {
              return (
                  <label key={item} htmlFor={item} className="form__label">
                    <input
                      className="form__checkbox"
                      type="checkbox"
                      value={item}
                      checked={checkedGenres.includes(item)}
                      onChange={handleCheckBoxChange}
                    />
                    {item}
                  </label>
              );
            })}
          </div>
        </div>
        <div className="form__wrapper">
          <label htmlFor="synopsis">Synopsis</label>
          <textarea className="form__textarea" {...register("synopsis", { required: true })} id="synopsis" />
        </div>
        <div className="form__wrapper">
          <label htmlFor="alternative_titles_synonyms">
            Alternative titles
          </label>
          <input
            type="text"
            {...register("alternative_titles_synonyms",{required:false})}
            id="alternative_titles_synonyms"
          />
        </div>
        <div className="form__wrapper">
          <label htmlFor="img_url">Image url</label>
          <input type="url" {...register("img_url", { required: true })} id="img_url" />
        </div>
        <Submit text="Add" isDisabled={false} fn={onSubmit}/>
      </form>
      {show && <div className="alert alert-success">Anime added</div>}
    </section>
  );
};

export { AddAnime };
