import Type from "../actions/store";
function initState() {
  return {
    user:{
      name: "王尼玛",
      age: "20",
      sex: 1
    }
  };
}

/**
 * @param {*} state U want to change the state
 * @param {*} attrs Be changed attribute
 */
function easyState(state, attrs) {
  const newState = Object.assign({}, state, { ...attrs });
  return newState;
}

const reducer = (state = initState(), action) => {
  let newState  = null;
  switch (action.type) {
    case Type.TYPE:
      const active = action.data;
      switch (active.type) {
        default:
          return easyState(state, active.data);
      }
    default:
      return state;
  }
};

export default reducer;
