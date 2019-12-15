import axios, { AxiosRequestConfig } from "axios";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch, Reducer } from "redux";

// PossibleActions
const getActionsTypes = (type: string) => ({
  request: `${type}_REQUEST`,
  success: `${type}_SUCCESS`,
  failure: `${type}_FAILURE`,
  deleteData: `${type}_DELETE`
});

type ApiCallActionsTypes = ReturnType<typeof getActionsTypes>;

type ApiCallState = "idle" | "attempt" | "success" | "failure";

interface State<DataType> {
  apiCallState: ApiCallState;
  data: DataType | undefined;
}

const oldState: State<any> = {
  apiCallState: "idle",
  data: undefined
};

type MRF = (
  apiCallActions: ApiCallActionsTypes
) => <DataType>(
  intialState?: State<DataType>
) => Reducer<State<DataType>, AnyAction>;

const makeReducerFactory: MRF = apiCallActions => (initialState = oldState) => (
  state = initialState,
  action
) => {
  switch (action.type) {
    case apiCallActions.request:
      return { ...state, apiCallState: "attempt" };

    case apiCallActions.success:
      return { ...state, apiCallState: "success", posts: action.payload.data };

    case apiCallActions.failure:
      return { ...state, apiCallState: "failure", posts: undefined };

    case apiCallActions.deleteData:
      return { ...state, apiCallState: "idle", posts: undefined };

    default:
      return state;
  }
};

/** DATA FETCHER
 *
 */

const callApi = (
  config: AxiosRequestConfig,
  dispatch: Dispatch<AnyAction>,
  apiCallActions: ApiCallActionsTypes
) => {
  return async () => {
    dispatch({ type: apiCallActions.request });
    try {
      const response = await axios({ ...config });
      dispatch({
        type: apiCallActions.success,
        payload: {
          data: response.data
        }
      });
    } catch (e) {
      dispatch({ type: apiCallActions.failure });
    }
  };
};

type MUR = (
  apiCallActions: ApiCallActionsTypes
) => (config: AxiosRequestConfig) => () => Promise<void>;

const makeUseResource: MUR = apiCallActions => config => {
  const dispatch = useDispatch<Dispatch<AnyAction>>();

  return callApi(config, dispatch, apiCallActions);
};

type MUDR = (apiCallActions: ApiCallActionsTypes) => () => () => AnyAction;

const makeUseDeleteResource: MUDR = apiCallActions => () => {
  const dispatch = useDispatch<Dispatch<AnyAction>>();

  return () =>
    dispatch({
      type: apiCallActions.deleteData
    });
};

const reduxApiCallHelper = (type: string) => {
  const actionType = getActionsTypes(type);
  return {
    useResource: makeReducerFactory(actionType),
    useDeleteResource: makeUseDeleteResource(actionType),
    createReducer: makeReducerFactory(actionType)
  };
};

export default reduxApiCallHelper;
