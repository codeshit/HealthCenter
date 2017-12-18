export default function createAction(type, activeType = 'DEFAULT', data = {}){
  return {
    type: type,
    data:{
      type: activeType,
      data: data
    }
  }
}