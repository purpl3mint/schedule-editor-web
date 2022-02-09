import React from "react"
import { Sidebar } from "../../components/Sidebar"

const ContentItem = (props) => {
  return (
    <div>

      <input type="text" placeholder="Ссылка на контент"
        style={{marginBottom: 15}}
      ></input><br/>

      <span>Проигрывать онлайн:</span>
      <div style={{marginBottom: 15}}>
        <input type="radio" value="true" />
        <label>Да</label>

        <input type="radio" value="false" checked/>
        <label>Нет</label>
      </div>

      <span>Масштабирование контента:</span>
      <div style={{marginBottom: 15}}>
        <input type="radio" value="normal" checked />
        <label>Без масштабирования (normal)</label><br/>

        <input type="radio" value="crop"/>
        <label>Обрезать края (crop)</label><br/>

        <input type="radio" value="stretch"/>
        <label>Подогнать под экран (stretch)</label>
      </div>

      <label>Длительность контента</label>
      <input type="text" placeholder="Длительность контента"
        style={{marginBottom: 15}}
      ></input>

    </div>

  )
}

const BannerItem = (props) => {
  return (
    <div>
      <label>Длительность контента</label><br/>
      <input type="text" placeholder="Длительность контента"
        style={{marginBottom: 15}}
      ></input><br />

      <label>Ссылка на контент</label><br/>
      <input type="text" placeholder="UDP/HLS/HTTP/HTTPS/..."
        style={{marginBottom: 15}}
      ></input><br/>

      <label>Ссылка на контент (Резервная)</label><br/>
      <input type="text" placeholder="UDP/HLS/HTTP/HTTPS/..."
        style={{marginBottom: 15}}
      ></input><br/>

      <span>Проигрывать онлайн:</span>
      <div style={{marginBottom: 15}}>
        <input type="radio" value="true" />
        <label>Да</label>

        <input type="radio" value="false" checked/>
        <label>Нет</label>
      </div>

      <label>Цвет фона</label><br/>
      <input type="text" placeholder="#(**)******"
        style={{marginBottom: 15}}
      ></input><br/>

      <b>Параметры масштабирования</b><br />
      <label>Ширина</label><br/>
      <div>
        <input type="text" placeholder=""
          style={{marginBottom: 15}}
        ></input><br/>

        <input type="radio" value="wrap_content" />
        <label>Исходный размер</label><br />

        <input type="radio" value="match_parent" />
        <label>Растяжение</label><br/>
      </div>

      <label>Высота</label><br/>
      <div>
        <input type="text" placeholder=""
          style={{marginBottom: 15}}
        ></input><br/>
        <input type="radio" value="wrap_content" />
        <label>Исходный размер</label><br />

        <input type="radio" value="match_parent" />
        <label>Растяжение</label><br/>
      </div>

      <label>Расположение по горизонтали</label><br/>
      <div style={{marginBottom: 15}}>
        <input type="radio" value="left" />
        <label>Левый край</label>

        <input type="radio" value="right"/>
        <label>Правый край</label>
      </div>

      <label>Расположение по вертикали</label><br/>
      <div style={{marginBottom: 15}}>
        <input type="radio" value="top" />
        <label>Верхний край</label>

        <input type="radio" value="bottom"/>
        <label>Нижний край</label>
      </div>

    </div>
  )
}

/* СКЛАД ГРЯЗИ
<input id="schedule__content" type="text" placeholder="Ссылка на основной контент"
            style={{marginBottom: 15}}
          ></input>

          <span>Проигрывать онлайн:</span>
          <div style={{marginBottom: 15}}>
            <input type="radio" id="contentOnlineTrue" name="contentOnline" value="true" />
            <label for="contentOnlineTrue">Да</label>

            <input type="radio" id="contentOnlineFalse" name="contentOnline" value="false" checked/>
            <label for="contentOnlineFalse">Нет</label>
          </div>

          <span>Масштабирование контента:</span>
          <div style={{marginBottom: 15}}>
            <input type="radio" id="contentAspectRatioNormal" name="contentAspectRatio" value="normal" checked />
            <label for="contentAspectRatioNormal">Без масштабирования</label><br/>

            <input type="radio" id="contentAspectRatioCrop" name="contentAspectRatio" value="crop"/>
            <label for="contentAspectRatioCrop">Обрезать края</label><br/>

            <input type="radio" id="contentAspectRatioStretch" name="contentAspectRatio" value="stretch"/>
            <label for="contentAspectRatioStretch">Подогнать под экран</label>
          </div>

          <label for="schedule__content-duration">Длительность контента</label>
          <input id="schedule__content-duration" type="text" placeholder="Длительность основного контента"
            style={{marginBottom: 15}}
          ></input>
*/

export const NewPage = () => {

  return (
    <div>
      <Sidebar />
      <main>
        <h2>Новое расписание</h2>
        <form style={{display: "flex", flexDirection: "column", width: 400,}}>
          
          <label for="schedule__name"><h3>Название</h3></label>
          <input id="schedule__name" type="text" placeholder="Введите название"
            style={{marginBottom: 15}}
          ></input>


          <label for="schedule__content" style={{marginTop: 30}}><h3>Основной контент</h3></label>
          <ContentItem />


          <label for="schedule__ads" style={{marginTop: 30}}><h3>Дополнительный контент</h3></label>
          <label for="schedule__ads-delay">Задержка перед воспроизведением доп. контента</label>
          <input id="schedule__ads-delay" type="text" placeholder="Задержка перед запуском первого элемента"
            style={{marginBottom: 15}}
          ></input>

          <hr style={{width: 400}} />
          <h4>Новый дополнительный контент (закинуть в попап)</h4>
          <ContentItem />
          <hr style={{width: 400}} />
          <table border="1">
            <caption>Список дополнительного контента</caption>
            <tr>
              <th>№</th>
              <th>Длительность</th>
              <th>Ссылка</th>
              <th>Онлайн</th>
              <th>Масштаб</th>
              <th>Удаление</th>
            </tr>
            
            <tr>
              <td>1</td>
              <td>0</td>
              <td>https://www.youtube.com/watch?v=olNiwGjuUdk</td>
              <td>Да</td>
              <td>Normal</td>
              <td>X</td>
            </tr>
          </table>

          <label for="schedule__banners" style={{marginTop: 30}}><h3>Баннеры</h3></label>
          <label for="schedule__banners-delay">
            Задержка перед воспроизведением баннеров
          </label>
          <input id="schedule__banners-delay" type="text" placeholder="Задержка перед запуском первого элемента"
            style={{marginBottom: 15}}
          ></input>
          <span>Повтор баннеров</span>
          <div style={{marginBottom: 15}}>
            <input type="radio" value="true" />
            <label>Да</label>

            <input type="radio" value="false" checked/>
            <label>Нет</label>
          </div>
          <label for="schedule__banners-duration">Длительность воспроизведения баннеров</label>
          <input id="schedule__banners-duration" type="text" placeholder="Длительность показа баннеров"
            style={{marginBottom: 15}}
          ></input>

          <hr style={{width: 400}} />
          <h4>Новый баннер (закинуть в попап)</h4>
          <BannerItem />
          <hr style={{width: 400}} />
          <table border="1">
            <caption>Список баннеров</caption>
            <tr>
              <th>№</th>
              <th>Длительность</th>
              <th>Ссылка</th>
              <th>Онлайн</th>
              <th>Масштаб</th>
              <th>Удаление</th>
            </tr>
            
            <tr>
              <td>1</td>
              <td>0</td>
              <td>https://www.youtube.com/watch?v=olNiwGjuUdk</td>
              <td>Да</td>
              <td>Normal</td>
              <td>X</td>
            </tr>
          </table>


          <label for="schedule__ticker" style={{marginTop: 30}}><h3>Бегущая строка</h3></label>

          <label>Ссылка на контент</label><br/>
          <input id="schedule__ticker-source" type="text" placeholder="TXT"></input>

          <label>Размер шрифта</label><br/>
          <input id="schedule__ticker-size" type="number" placeholder="24"></input>

          <label>Скорость перемещения</label><br/>
          <input id="schedule__ticker-speed" type="number" placeholder="80"></input>

          <label>Цвет фона</label><br/>
          <input type="text" placeholder="#(**)******"
            style={{marginBottom: 15}}
          ></input><br/>

          <label>Цвет шрифта</label><br/>
          <input type="text" placeholder="#(**)******"
            style={{marginBottom: 15}}
          ></input><br/>

        </form>
      </main>
    </div>
  )
}