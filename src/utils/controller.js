
const Ctrl = {
}
export function initRouteController(component){
  if(!Ctrl.route){
    Ctrl.route = {
      goto: component.goto.bind(component),
      goBack: component.goBack.bind(component)
    };
  }
}
export function getRoute(){
  return Ctrl.route;
}
export default {
  getRoute
}

