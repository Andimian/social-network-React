import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import React from "react";

let state =  {
    posts: [
        {id: 1, message: 'Дратути', likesCount: 12},
        {id: 2, message: 'js php css html go react.', likesCount: 10}
    ],
};

it('length of posts should be incremented',  () => {
    // 1.test data
    let action = addPostActionCreator("текст для проверки теста редьюсера");

    // 2.action
    let newState = profileReducer(state, action);

    // 3.expectation (чего ожидаем)
    expect(newState.posts.length).toBe(3);
});

it('text of new message should be correct',  () => {
    // 1.test data
    let action = addPostActionCreator("текст для проверки теста редьюсера");

    // 2.action
    let newState = profileReducer(state, action);

    // 3.expectation (чего ожидаем)
    expect(newState.posts[2].message).toBe("текст для проверки теста редьюсера");
});

it('after deleting length of message should be decrement',  () => {
    // 1.test data
    let action = deletePost(1);

    // 2.action
    let newState = profileReducer(state, action);

    // 3.expectation (чего ожидаем)
    expect(newState.posts.length).toBe(1);
});

it('after deleting length should not be decrement if id is correct',  () => {
    // 1.test data
    let action = deletePost(3997);

    // 2.action
    let newState = profileReducer(state, action);

    // 3.expectation (чего ожидаем)
    expect(newState.posts.length).toBe(2);
});
