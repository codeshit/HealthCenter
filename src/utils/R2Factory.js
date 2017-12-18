import { connect } from "react-redux";

export function connectActionFactory(view, actions = {}) {
  const mapStateToProps = state => {
    return {
      baseState: state
    };
  };
  return connect(mapStateToProps, actions)(view);
}
export const Type = {
  LOADED:0,
  LOADING:1,
  LOADERR:2
}
export default {
  connect: connectActionFactory
};
