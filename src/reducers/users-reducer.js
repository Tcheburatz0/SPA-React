import {UsersApi} from "../api/api";

const SET_USERS = "OS/users-reducer/SET_USERS";
const FILTRED_USERS = "OS/users-reducer/FILTRED_USERS";
const SORT_USERS = "OS/users-reducer/SORT_USERS";


const initialState = {
  users: [],
  filteredUsers: [],
  sort: "",
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        filteredUsers: action.users,
      };
    case FILTRED_USERS:
      /*Если юзер не указывал метод сортировки - возврат отфильтрованного массива. Иначе, возврат отсортированного, фильтрованного массива*/
      if (state.sort === "") {
        return {
          ...state,
          filteredUsers: state.users.filter(u => {
            if (action.filter === "") {
              return u;
            }
            return u.username.toLowerCase().includes(action.filter.toLowerCase())
          }),
        }
      }
      if (state.sort === "descending") {
        return {
          ...state,
          filteredUsers: state.users.filter(u => {
            if (action.filter === "") {
              return u;
            }
            return u.username.toLowerCase().includes(action.filter.toLowerCase())
          }).slice().sort((prev, next) => next.id - prev.id),
        }
      }
      if (state.sort === "ascending") {
        return {
          ...state,
          filteredUsers: state.users.filter(u => {
            if (action.filter === "") {
              return u;
            }
            return u.username.toLowerCase().includes(action.filter.toLowerCase())
          }).slice().sort((prev, next) => prev.id - next.id),
        }
      }
      return null;

    case SORT_USERS:
      if (state.sort === "" || state.sort === "descending") {
        return {
          ...state,
          filteredUsers: state.filteredUsers.slice().sort((prev, next) => prev.id - next.id),
          sort: "ascending"
        }
      }
      return {
        ...state,
        filteredUsers: state.filteredUsers.slice().sort((prev, next) => next.id - prev.id),
        sort: "descending"
      };
    default:
      return state;
  }
};

const setUsersSucces = users => ({type: SET_USERS, users});
export const filteredUsersAC = filter => ({type: FILTRED_USERS, filter});
export const sortUsersAC = () => ({type: SORT_USERS});

export const setUsers = () => {
  return async dispatch => {
    const response = await UsersApi.getUsers();
    if (response && response.statusText === "OK") {
      dispatch(setUsersSucces(response.data));
    }
  }
};

export default UsersReducer