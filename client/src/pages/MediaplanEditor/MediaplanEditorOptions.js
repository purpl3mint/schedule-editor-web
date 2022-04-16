import './MediaplanEditor.css'
import React, {useCallback, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useMessage } from '../../hooks/message.hook';
import { 
  mediaplanSetEditOptionsForm ,
  mediaplanEditOptions
} from "../../store/actionCreators/mediaplanActionCreator";

export const MediaplanEditorOptions = (props) => {
  const dispatch = useDispatch();
  const message = useMessage();

  const {
    name, 
    mediaplanId,
    ads_start_delay,
    banners_start_delay,
    banners_repeat,
    banners_animation_duration_msec
  } = props
  const formOptions = useSelector(state => state.mediaplanReducer.editOptionsForm);

  //Options handlers
  const changeOptionsHandler = useCallback( (e) => {
    dispatch(mediaplanSetEditOptionsForm(e.target.name, e.target.value))
  }, [dispatch])

  const saveOptionsHandler = useCallback( () => {
    dispatch(mediaplanEditOptions(formOptions, mediaplanId))
    message("Основные параметры медиаплана сохранены")
  }, [dispatch, formOptions, message, mediaplanId])

  const initializeHandler = useCallback( () => {
    dispatch(mediaplanSetEditOptionsForm("id", mediaplanId))
    dispatch(mediaplanSetEditOptionsForm("ads_start_delay", ads_start_delay))
    dispatch(mediaplanSetEditOptionsForm("banners_start_delay", banners_start_delay))
    dispatch(mediaplanSetEditOptionsForm("banners_repeat", banners_repeat))
    dispatch(mediaplanSetEditOptionsForm("banners_animation_duration_msec", banners_animation_duration_msec))
  }, [dispatch, mediaplanId, ads_start_delay, banners_start_delay, banners_repeat, banners_animation_duration_msec])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  return (
    <div className="col offset-s1 s4 options">      
      <p>Название медиаплана: <span>{name || "без названия"}</span></p>

      <div className="row">
        <div className="input-field col s6">
          <input 
            value={formOptions.ads_start_delay} 
            id="ads_start_delay" 
            name="ads_start_delay" 
            type="number" 
            min="0"
            onChange={changeOptionsHandler}
          />
          <span className="helper-text">Задержка воспроизведения доп контента</span>
        </div>
      </div>

      <div className="row">
        <div className="input-field col s6">
          <input 
            value={formOptions.banners_start_delay} 
            id="banners_start_delay" 
            name="banners_start_delay" 
            type="number" 
            min="0"
            onChange={changeOptionsHandler}
          />
          <span className="helper-text">Задержка воспроизведения баннеров</span>
        </div>
      </div>

      <div className="row">
        <div className="input-field col s6">
          <input 
            value={formOptions.banners_animation_duration_msec} 
            id="banners_animation_duration_msec" 
            name="banners_animation_duration_msec" 
            type="number" 
            min="0"
            onChange={changeOptionsHandler}
          />
          <span className="helper-text">Длительность воспроизведения анимации баннеров</span>
        </div>
      </div>

      <div className="row">
        <select 
          defaultValue={formOptions.banners_repeat} 
          className="col s6 browser-default" 
          name="banners_repeat" 
          onChange={changeOptionsHandler}
        >
          <option value="-1" disabled>Осуществлять повтор баннеров?</option>
          <option value="false">Не повторять баннеры</option>
          <option value="true">Повторять баннеры</option>
        </select>
      </div>

      <button className="btn" onClick={saveOptionsHandler}>Сохранить</button>
    </div>
  )
}