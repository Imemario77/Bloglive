const CreateBlogReducer = (
  state = { blogsReducer: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "CREATE_POST_STARTED":
      return {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        blogsReducer: action.payload,
        loading: false,
        error: false,
      };
      break;
    case "CREATE_POST_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
      break;

    default:
      return state;
      break;
  }
};

export default CreateBlogReducer;
