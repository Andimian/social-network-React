import React from "react";
import noAvaPhoto from '../../assets/images/no_ava.png';
import styles from "./User.module.css";
import {NavLink} from "react-router-dom";


let User = ({user, followingInProgress, follow, unFollow}) => {
    return (
        <div>
            <NavLink to={'/profile/' + user.id}>
                <div>
                    <img src={user.photos.small != null ? user.photos.small : noAvaPhoto} alt=""
                         className={styles.userPhoto}/>
                </div>
            </NavLink>
            <span className={styles.name}>{user.name}</span>
            <div className={styles.unic}>{user.status}</div>
            <div>
                {user.followed
                    // короче id в аргументе это тупо элемент массива followingInProgress. Мы followingInProgress Сделали массивом и будем помещать id того пользователя, которого мы щас фоловим анфоловим, т.е. накапливать те процессы, которые у нас идут. сначала всё загрузилось с disabled = false, так как мы еще ничего не добавляли в followingInProgress(массив c id тех у кого загрузка). Чел нажал пошла канитель - запускается колбек toggleFollowingProgress, в нём если передали isFetching = true в массив followingInProgress запишется id чела. Если false - он берёт через map смотрит если такой id есть, то груьо говоря удалит из массива followingInProgress этот id. Рендер перерендер это уже другой вопрос...
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        unFollow(user.id);
                    }}>Отписаться</button>
                    /*some() позволяет проверить соответствует ли по крайней мере один элемент в массиве условию, заданному в передаваемой функции. Возвращаемое значение метода будет логическое значение true, если функция обратного вызова возвращает значение true (найден элемент который соответствует заданному условию), в противном случае вернет логическое значение false (все элементы массива не соответствуют переданному условию).*/
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id);
                              }}>Подписаться</button>
                }
            </div>
        </div>
    )
}

export default User;