import React from "react";
import noAvaPhoto from '../../assets/images/no_ava.png';
import styles from "./User.module.css";
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {toggleFollowingProgress} from "../../redux/users-reduser";

let Users = (props) => {
    /* Тут логика короче просто для "показать" так что это норм для презентационного комп*/
    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= 50; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div className="pagination">
                {pages.map(p => {
                    return <span
                        className={props.currentPage === p ? styles.selectedPage : ''}
                        onClick={(e) => props.onPageChanged(p)}> {p}
                    </span>
                })}
            </div>

            {props.users.map(u =>
                <div key={u.id}>
                    <NavLink to={'/profile/' + u.id}>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : noAvaPhoto} alt=""
                                 className={styles.userPhoto}/>
                        </div>
                    </NavLink>
                    <span className={styles.name}>{u.name}</span>
                    <span>
                        <div className={styles.unic}>{u.status}
                        </div>

                        <div>
                            {u.followed
                                // я заебался - короче id в аргументе это тупо элемент массива followingInProgress. Мы followingInProgress Сделали массивом и будем помещать id того пользователя, которого мы щас фоловим анфоловим, т.е. накапливать те процессы, которые у нас идут. сначала всё загрузилось с disabled = false, так как мы еще ничего не добавляли в followingInProgress(массив c id тех у кого загрузка). Чел нажал пошла канитель - запускается колбек toggleFollowingProgress, в нём если передали isFetching = true в массив followingInProgress запишется id чела. Если false - он берёт через map смотрит если такой id есть, то груьо говоря удалит из массива followingInProgress этот id. Рендер перерендер это уже другой вопрос...
                                ? <button disabled={props.followingInProgress.some( id => id === u.id)} onClick={() => {
                                    props.toggleFollowingProgress(true, u.id);

                                    // Эти запросы мы должны слать авторизованно
                                    axios.delete(
                                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,  // Запрос
                                        {
                                            withCredentials: true,
                                            headers: {"API-KEY": '5eeada43-9109-4af8-bf29-68976dcce322'}
                                        } // Объект настройки
                                    )
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unFollow(u.id)
                                            }
                                            props.toggleFollowingProgress(false, u.id);
                                        });
                                }}>Отписаться</button>
                                /*some() позволяет проверить соответствует ли по крайней мере один элемент в массиве условию, заданному в передаваемой функции. Возвращаемое значение метода будет логическое значение true, если функция обратного вызова возвращает значение true (найден элемент который соответствует заданному условию), в противном случае вернет логическое значение false (все элементы массива не соответствуют переданному условию).*/
                                : <button disabled={props.followingInProgress.some(id=>id === u.id)}
                                    onClick={() => {
                                    props.toggleFollowingProgress(true, u.id);
                                    // Эти запросы мы должны слать авторизованно
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                            withCredentials: true,
                                            headers: {"API-KEY": '5eeada43-9109-4af8-bf29-68976dcce322'}
                                        } // Объект настройки
                                    )
                                        .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    props.follow(u.id)
                                                }
                                                props.toggleFollowingProgress(false, u.id);
                                            }
                                        );
                                    props.follow(u.id)
                                }}>Подписаться</button>
                            }
                        </div>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;